var trackviewer = {};

trackviewer.module = (function () {

    var datebeg; // string
    var dateend; // string
    var invnomer; // string

    var speedingx; // string
    var speedingy; // string
    var speedinginfo;

    var blockButtons = false; // флаг блокировки нажатий на кнопки


    // var echo = function() {
    //     console.log("привет trackviewer");
    // };

    // получить из даты строку в формате dd.mm.yyyy hh:mm
    var convertDateToPicker = function(dateval) {

        var tday = dateval.getDay().toString();
        if (tday.length == 1) {
            tday = "0" + tday;
        }

        var tmonth = (dateval.getMonth() + 1).toString();
        if (tmonth.length == 1) {
            tmonth = "0" + tmonth;
        }

        var tyear = dateval.getFullYear().toString();

        var thour = dateval.getHours().toString();
        if (thour.length == 1) {
            thour = "0" + thour;
        }

        var tmin = dateval.getMinutes().toString();
        if (tmin.length == 1) {
            tmin = "0" + tmin;
        }

        return tday + "." + tmonth + "." + tyear + "-" + thour + ":" + tmin;
    }

    // получить имя параметра из строки url
    var getUrlParameterByName = function(name) {
        url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    // первичная инициализация при открытии
    var initializ = function () {
        // 1. установить даты - период текущий день

        datebeg = getUrlParameterByName("datebeg");
        dateend = getUrlParameterByName("dateend");
        invnomer = getUrlParameterByName("invnom");

        // если показываем превышение то будут переданы координаты точки превышения
        speedingx = getUrlParameterByName("speedingx");
        speedingy = getUrlParameterByName("speedingy");
        speedinginfo = getUrlParameterByName("speedinginfo");


        if (datebeg == null || datebeg == "") {
            var today_datebeg = new Date();
            today_datebeg.setHours(0, 0, 0, 0);
            datebeg = convertDateToPicker(today_datebeg)
        }

        if (dateend == null || dateend == "") {
            var today_dateend = new Date();
            today_dateend.setHours(23, 59, 59, 999);
            dateend = convertDateToPicker(today_dateend)
        }


        $("#beginDate").val(datebeg);
        $("#endDate").val(dateend);


        // 2. заполнить селектор тс, установить выбранную тс
        // выполним ajax запрос
        var cookies = checkauth.module.getCookies();

        var jsonData = {};
        jsonData.userid = cookies.userid;
        jsonData.token = cookies.token;

        $.ajax({
            url: "info/getvehicles",
            type: 'post',
            dataType: 'json',
            data: JSON.stringify(jsonData),
            contentType: "application/json; charset=utf-8",
            success: function(data) {

                if (data.status == "ok") {
                    ////////////////////////////////////////////////
                    // установим значение в пробегах
                    //
                    if (data.vehicles != null) {
                        if (data.vehicles.length > 0) {
                            for (var i = 0; i < data.vehicles.length; i++) {
                                $('#vehicle').append($('<option>').val(data.vehicles[i].invnomer).text(data.vehicles[i].regnomer));
                            }

                            $('#vehicle').val(invnomer);

                            // сразу же пробуем нарисовать трек
                            drawroute();

                        }
                    }
                }
                console.log(data);

            },
            error: function(data) {

            },
        });

    }
    
    var drawroute = function () {
        // план
        // 1 - получить значения инв ном, дата нач и дата кон
        // 2 - проверяем нет ли пустых, составляем валидные
        // 3 - отправляем рест запрос
        // 4 - получаем данные
        // 5 - обрабатываем данные, рисуем маршрут


        // 1 - получить значения инв ном, дата нач и дата кон
        // var invnom = $("#invnom").val();
        // var datebeg = formatDate($('#dtpicker1').datetimepicker('getValue'));
        // var dateend = formatDate($('#dtpicker2').datetimepicker('getValue'));

        var v_invnom = $("#vehicle").val();
        var v_datebeg = $("#beginDate").val();
        var v_dateend = $("#endDate").val();


        // 2 - проверяем нет ли пустых, составляем валидные
        if ($.trim(v_invnom) == "") {
            // showErrorMsg("не заполнен инвентарный номер");
            console.log("не заполнен инвентарный номер");
            return false;
        }

        if ($.trim(v_datebeg) == "") {
            // showErrorMsg("не заполнена дата начала");
            console.log("не заполнена дата начала");
            return false;
        }

        if ($.trim(v_dateend) == "") {
            // showErrorMsg("не заполнена дата окончания");
            console.log("не заполнена дата окончания");
            return false;
        }

        // добавим секунды к датам
        v_datebeg = v_datebeg + ":00";
        v_dateend = v_dateend + ":00";

        // очистка слоев
        map.layers[1].removeAllFeatures();
        map.layers[2].removeAllFeatures();
        map.layers[3].removeAllFeatures();

        // 3 - отправляем рест запрос


        var cookies = checkauth.module.getCookies();

        var jsonData = {};
        jsonData.userid = cookies.userid;
        jsonData.token = cookies.token;
        jsonData.invnomer = v_invnom;
        jsonData.datebeg = v_datebeg;
        jsonData.dateend = v_dateend;

        $.ajax({
            url: "wln/getmars",
            type: 'post',
            // enctype: 'multipart/form-data',
            //processData: false,  // Important!
            dataType: 'json',
            data: JSON.stringify(jsonData),
            cache: false,
            // async: true,
            // async: asyncFlag,
            contentType: "application/json; charset=utf-8",
            //contentType: false,
            success: function (data) {
                if (data.status == "error") {
                    // showErrorMsg(data.description);
                    console.log(data.message);
                    notifications.module.showNotification("Маршрут (ошибка)", "Нет данных мониторинга", 0);

                } else {
                    // 4 - получаем данные
                    // 5 - обрабатываем данные, рисуем маршрут
                    trackviewerosm.module.drawLines(data.content);

                    if (speedinginfo != null && speedinginfo != "all") {
                        trackviewerosm.module.addSpeedingObjectsToMap(speedingx, speedingy, "p_sp0", "p_sp0", speedinginfo);
                    }

                    if (data.content.length == 0) {
                        notifications.module.showNotification("Маршрут", "Нет данных о движении т/с", 3);

                    }
                }
                console.log(data);
            },
            error: function (data) {
                // showErrorMsg("ошибка при получении данных для построения маршута");
                console.log("ошибка при получении данных для построения маршута");
                notifications.module.showNotification("Маршрут (ошибка)", "Ошибка при получении данных для построения маршута", 0);

            },
            complete: function () {
                setBlockButtons(false);
                removeSpinnerFromButton($("#refreshmars"));

            },

        })


        // // получим данные о пробеге
        // restUrl = "rest/track/gettrack/" + v_invnom + "/" + v_datebeg + "/" + v_dateend;
        //
        // $.ajax({
        //
        //     url: restUrl,
        //     type: 'post',
        //     enctype: 'multipart/form-data',
        //     //processData: false,  // Important!
        //     dataType: 'json',
        //     //data: formDataTicket,
        //     cache: false,
        //     async: true,
        //     // async: asyncFlag,
        //     contentType: "application/json; charset=utf-8",
        //     //contentType: false,
        //     success: function (data) {
        //         if (data.status == "error") {
        //             // showErrorMsg("Пробег не вычислен. " + data.description);
        //             console.log("Пробег не вычислен. " + data.description);
        //         } else {
        //             $("#probeg").val(data.content.probeg + " / " + data.content.fuelrate);
        //         }
        //
        //         //fillTracksList(data.content.detail);
        //
        //         console.log(data);
        //     },
        //     error: function (data) {
        //         // showErrorMsg("ошибка при получении данных по пробегу");
        //         console.log("ошибка при получении данных по пробегу");
        //     },
        //     complete: function () {
        //
        //     },
        //
        // });

    }


    var setBlockButtons = function(newSet) {
        blockButtons = newSet;
    }

    var getBlockButtons = function() {
        return blockButtons;
    }

    var addSpinnerToButton = function(bthObj) {
        var spinnerTemplate = "<span class=\"spinner-border spinner-border-sm\" role=\"status\" aria-hidden=\"true\" style=\"margin: 5px;\"></span>";
        var btntext = $(bthObj).text();
        $(bthObj).text("");
        $(bthObj).append(spinnerTemplate + btntext);
    }

    var removeSpinnerFromButton = function(bthObj) {
        $(bthObj).find("span").remove();
    }

    return {
        initializ:initializ,
        drawroute:drawroute,
        setBlockButtons:setBlockButtons,
        getBlockButtons:getBlockButtons,
        addSpinnerToButton:addSpinnerToButton,
        removeSpinnerFromButton:removeSpinnerFromButton
    }
}());