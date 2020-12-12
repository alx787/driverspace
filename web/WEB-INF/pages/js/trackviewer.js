var trackviewer = {};

trackviewer.module = (function () {

    var datebeg; // string
    var dateend; // string
    var invnomer; // string

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
        datebeg = new Date();
        datebeg.setHours(0, 0, 0, 0);

        dateend = new Date();
        dateend.setHours(23, 59, 59, 999);

        invnomer = getUrlParameterByName("invnom");

        $("#beginDate").val(convertDateToPicker(datebeg));
        $("#endDate").val(convertDateToPicker(dateend));

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
                    console.log(data.description);
                } else {
                    // 4 - получаем данные
                    // 5 - обрабатываем данные, рисуем маршрут
                    trackviewerosm.module.drawLines(data.content);
                }
                console.log(data);
            },
            error: function (data) {
                // showErrorMsg("ошибка при получении данных для построения маршута");
                console.log("ошибка при получении данных для построения маршута");
            },
            complete: function () {

            },

        });


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

    return {
        initializ:initializ,
        drawroute:drawroute
    }
}());