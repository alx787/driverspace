var fuelrateviewer = {};

fuelrateviewer.module = (function () {

    var datebeg; // string
    var dateend; // string
    var invnomer; // string

    var blockButtons = false; // флаг блокировки нажатий на кнопки


    // получить из даты строку в формате dd.mm.yyyy hh:mm
    var convertDateToPicker = function(dateval) {

        var tday = dateval.getDate().toString();
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

                if (data.status.toUpperCase() == "OK") {
                    ////////////////////////////////////////////////
                    // установим значение в пробегах
                    //
                    if (data.vehicles != null) {
                        if (data.vehicles.length > 0) {
                            for (var i = 0; i < data.vehicles.length; i++) {
                                $('#vehicle').append($('<option>').val(data.vehicles[i].invnomer).text(data.vehicles[i].regnomer));
                            }

                            $('#vehicle').val(invnomer);

                            fillTracks();

                        }
                    }
                }
                console.log(data);
            },
            error: function(data) {

            },
        });

    }


    // первичная инициализация при открытии
    var fillTracks = function () {
        var cookies = checkauth.module.getCookies();

        var jsonData = {};
        jsonData.userid = cookies.userid;
        jsonData.token = cookies.token;

        jsonData.invnomer = $("#vehicle").val();
        jsonData.datebeg = $("#beginDate").val();
        jsonData.dateend = $("#endDate").val();


        $.ajax({
            url: "wln/gettrack",
            type: 'post',
            dataType: 'json',
            data: JSON.stringify(jsonData),
            contentType: "application/json; charset=utf-8",
            success: function(data) {

                if (data.status.toUpperCase() == "OK") {
                    ////////////////////////////////////////////////
                    // заполняем поездки
                    if (data.content.detail != null) {
                        if (data.content.detail.length > 0) {
                            var rowTemplate = '<tr>'
                                                   + '<td>с: <span>__datebeg__</span> по: <span>__dateend__</span></td>'
                                                   + '<td>__placebeg__ - __placeend__</td>'
                                                   + '<td>__fuelrate__</td>'
                                                + '</tr>';
                            // будем передавать не координаты а период
                            // <span style="display: none">__trackbegx__:__trackbegy__:__trackendx__:__trackendy__</span>

                            var tableBodyObj = $("#tracktable tbody");
                            tableBodyObj.empty();

                            for (var i = 0; i < data.content.detail.length; i++) {
                                var row = rowTemplate.replace("__datebeg__", data.content.detail[i].datebeg);
                                row = row.replace("__dateend__", data.content.detail[i].dateend);
                                row = row.replace("__placebeg__", data.content.detail[i].placebeg);
                                row = row.replace("__placeend__", data.content.detail[i].placeend);
                                row = row.replace("__fuelrate__", data.content.detail[i].fuelrate);

                                // координаты начала и окончания поездки
                                row = row.replace("__trackbegx__", data.content.detail[i].trackbegx);
                                row = row.replace("__trackbegy__", data.content.detail[i].trackbegy);
                                row = row.replace("__trackendx__", data.content.detail[i].trackendx);
                                row = row.replace("__trackendy__", data.content.detail[i].trackendy);

                                tableBodyObj.append(row);
                            }

                            // события нажатия
                            $("#tracktable tbody tr").each(function (indx) {

                                // if (getBlockButtons()) {
                                //     return false;
                                // }

                                $(this).on("click", function (e) {
                                    var coords = $(this).find("span");
                                    if (coords.length == 2) {
                                        window.location.assign("/" + getContextUrl() + "/trackviewer?invnom=" + $("#vehicle").val() + "&datebeg=" + $(coords[0]).text() + "&dateend=" + $(coords[1]).text());
                                    }
                                })
                            })

                            notifications.module.showNotification("Расход топлива", "Найдено " + data.content.detail.length, 3);

                        } else {
                            notifications.module.showNotification("Расход топлива", "Нет данных о движении", 3);
                        }
                    } else {
                        notifications.module.showNotification("Расход топлива (ошибка)", "Нет данных мониторинга", 0);
                    }

                    ////////////////////////////////////////////////
                    // установим значение в пробегах
                    //
                    // if (data.vehicles != null) {
                    //     if (data.vehicles.length > 0) {
                    //         for (var i = 0; i < data.vehicles.length; i++) {
                    //             $('#vehicle').append($('<option>').val(data.vehicles[i].invnomer).text(data.vehicles[i].regnomer));
                    //         }
                    //
                    //         $('#vehicle').val(invnomer);
                    //
                    //     }
                    // }
                } else {
                    notifications.module.showNotification("Расход топлива (ошибка)", data.description, 1);
                    notifications.module.showNotification("Расход топлива (ошибка)", "Не найдены данные о расходе топлива", 3);

                }
                console.log(data);
            },
            error: function(data) {
                console.log("ошибка при получении данных для построения маршута");
                notifications.module.showNotification("Расход топлива (ошибка)", "Ошибка при получении данных о передвижении", 0);

            },
            complete: function() {
                setBlockButtons(false);
                removeSpinnerFromButton($("#refreshmars"));

            },

        });

    }




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
        fillTracks:fillTracks,
        setBlockButtons:setBlockButtons,
        getBlockButtons:getBlockButtons,
        addSpinnerToButton:addSpinnerToButton,
        removeSpinnerFromButton:removeSpinnerFromButton
    }
}());