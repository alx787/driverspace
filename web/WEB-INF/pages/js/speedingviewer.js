var speedingviewer = {};

speedingviewer.module = (function () {

    var datebeg; // string
    var dateend; // string
    var invnomer; // string

    var blockButtons = false; // флаг блокировки нажатий на кнопки

    // var echo = function() {
    //     console.log("привет speedingviewer");
    // };

    // получить из даты строку в формате dd.mm.yyyy-hh:mm
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


    //  yyyy-mm-dd hh:mm:ss --> dd.mm.yyyy-hh:mm
    var convertRestToPicker = function(dateRest) {
        var dateTimeArr = dateRest.split(" ");
        var dateArr = dateTimeArr[0].split("-");
        var timeArr = dateTimeArr[1].split(":");

        return dateArr[2] + "." + dateArr[1] + "." + dateArr[0] + "-" + timeArr[0] + ":" + timeArr[1];
    }

    //  yyyy.mm.dd - hh:mm:ss --> dd.mm.yyyy-hh:mm
    var convertWlnRestToPicker = function(dateRest) {
        var dateTimeArr = dateRest.split(" ");
        var dateArr = dateTimeArr[0].split(".");
        var timeArr = dateTimeArr[2].split(":");

        return dateArr[2] + "." + dateArr[1] + "." + dateArr[0] + "-" + timeArr[0] + ":" + timeArr[1];
    }


    // получить из строки в формате dd.mm.yyyy-hh:mm дату
    var convertPickerToDate = function(datestr) {
        var dateTimeArr = datestr.split("-");
        var dateArr = dateTimeArr[0].trim().split(".");
        var timeArr = dateTimeArr[1].trim().split(":");

        return new Date(parseInt(dateArr[2],10), parseInt(dateArr[1],10) - 1, parseInt(dateArr[0],10), parseInt(timeArr[0],10), parseInt(timeArr[1],10), 0, 0);

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
        // глубина периода
        var period = 10;

        datebeg = getUrlParameterByName("datebeg");
        dateend = getUrlParameterByName("dateend");
        invnomer = getUrlParameterByName("invnom");

        var today_datebeg = new Date();
        var today_dateend = new Date();


        // сначала дата окончания, только потом дату начала выыисляем если надо конечно
        if (dateend == null || dateend == "") {
            today_dateend.setHours(23, 59, 59, 999);
            dateend = convertDateToPicker(today_dateend)
        }

        if (datebeg == null || datebeg == "") {

            today_datebeg.setDate(today_dateend.getDate() - period);
            today_datebeg.setHours(0, 0, 0, 0);

            datebeg = convertDateToPicker(today_datebeg)
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

                            // сразу же пробуем заполнить таблицу
                            fillSpeeding();

                        }
                    }
                }
                console.log(data);

            },
            error: function(data) {

            },
        });
    }

    var addHoursToDate = function (dateVal, hours) {
        return new Date(dateVal.getTime() + hours * 60 * 60 * 1000);
    }

    var fillSpeeding = function() {

        var cookies = checkauth.module.getCookies();

        var jsonData = {};
        jsonData.userid = cookies.userid;
        jsonData.token = cookies.token;

        jsonData.invnomer = $("#vehicle").val();
        jsonData.datebeg = $("#beginDate").val() + ":00";
        jsonData.dateend = $("#endDate").val() + ":00";


        $.ajax({
            url: "wln/getspeeding",
            type: 'post',
            dataType: 'json',
            data: JSON.stringify(jsonData),
            contentType: "application/json; charset=utf-8",
            success: function(data) {

                if (data.status.toUpperCase() == "OK") {
                    ////////////////////////////////////////////////
                    // заполняем поездки
                    if (data.content != null) {
                        if (data.content.length > 0) {
                            var rowTemplate = '<tr>'
                                + '<td><div>__begintime__</div><span style="display: none">__beginx__:__beginy__</span></td>'
                                + '<td>__speedmax__</td>'
                                + '<td>__speedlimit__</td>'
                                + '</tr>';
                            // будем передавать не координаты а период
                            // <span style="display: none">__beginx__:__beginy__</span>

                            var tableBodyObj = $("#speedingtable tbody");
                            tableBodyObj.empty();

                            for (var i = 0; i < data.content.length; i++) {
                                // var row = rowTemplate.replace("__begintime__", convertRestToPicker(data.content[i].begintime));
                                var row = rowTemplate.replace("__begintime__", data.content[i].begintime);
                                row = row.replace("__speedmax__", data.content[i].speedmax.replace(" km/h", ""));
                                row = row.replace("__speedlimit__", data.content[i].speedlimit.replace(" km/h", ""));

                                // координаты превышения
                                row = row.replace("__beginx__", data.content[i].beginx);
                                row = row.replace("__beginy__", data.content[i].beginy);


                                tableBodyObj.append(row);

                            }

                            // события нажатия
                            $("#speedingtable tbody tr").each(function (indx) {

                                $(this).on("click", function (e) {
                                    var coords = $(this).find("span");
                                    if (coords.length != 1) {
                                        return false;
                                    }
                                    var coordsArr = coords.text().split(":");

                                    // показания скоростей
                                    var speedVals = $(this).find("td");


                                    // нужно вычислить период за час до и час после превышения
                                    var hours = 1; // период интервала
                                    var speedingdate = $(this).find("div").text() + "%0D%0A cкорость: " + speedVals[1].innerText.replace(" km/h", "") + "%0D%0A ограничение: " + speedVals[2].innerText.replace(" km/h", "");
                                    var datebeg_s;
                                    var dateend_s;
                                    var varDate = convertPickerToDate(convertWlnRestToPicker(speedingdate));

                                    datebeg_s = convertDateToPicker(addHoursToDate(varDate, (-1) * hours));
                                    dateend_s = convertDateToPicker(addHoursToDate(varDate, hours));


                                    if (coordsArr.length == 2) {
                                        window.location.assign("/" + getContextUrl() + "/trackviewer?invnom=" + $("#vehicle").val()
                                                                                            + "&datebeg=" + datebeg_s
                                                                                            + "&dateend=" + dateend_s
                                                                                            + "&speedingx=" + coordsArr[0]
                                                                                            + "&speedingy=" + coordsArr[1]
                                                                                            + "&speedinginfo=" + speedingdate
                                                                );
                                    }

                                })


                            })
                            notifications.module.showNotification("Нарушения", "Найдено " + data.content.length, 3);

                        } else {
                            notifications.module.showNotification("Нарушения (ошибка)", "Нет данных о движении", 3);
                        }
                    } else {
                        notifications.module.showNotification("Нарушения (ошибка)", "Нет данных мониторинга", 0);

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
                } else  {
                    notifications.module.showNotification("Нарушения (ошибка)", data.description, 1);
                    notifications.module.showNotification("Нарушения (ошибка)", "Не найдены данные о нарушениях", 3);

                }
                console.log(data);
            },
            error: function(data) {
                console.log("ошибка при получении данных о нарушениях");
                notifications.module.showNotification("Нарушения (ошибка)", "Ошибка при получении данных о нарушениях", 0);

            },
            complete: function(data) {
                setBlockButtons(false);
                removeSpinnerFromButton($("#refreshmars"));

            },
        });

        console.log("==============");
    };

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
        // echo:echo,
        initializ:initializ,
        fillSpeeding:fillSpeeding,
        setBlockButtons:setBlockButtons,
        getBlockButtons:getBlockButtons,
        addSpinnerToButton:addSpinnerToButton,
        removeSpinnerFromButton:removeSpinnerFromButton
    }
}());