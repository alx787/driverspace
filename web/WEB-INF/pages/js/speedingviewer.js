var speedingviewer = {};

speedingviewer.module = (function () {

    var datebeg; // string
    var dateend; // string
    var invnomer; // string

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


    // получить из строки в формате dd.mm.yyyy-hh:mm дату
    var convertPickerToDate = function(datestr) {
        var dateTimeArr = datestr.split("-");
        var dateArr = dateTimeArr[0].split(".");
        var timeArr = dateTimeArr[1].split(":");

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
                                var row = rowTemplate.replace("__begintime__", convertRestToPicker(data.content[i].begintime));
                                row = row.replace("__speedmax__", data.content[i].speedmax);
                                row = row.replace("__speedlimit__", data.content[i].speedlimit);

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

                                    // нужно вычислить период за час до и час после превышения
                                    var hours = 1; // период интервала
                                    var speedingdate = $(this).find("div").text();
                                    var datebeg_s;
                                    var dateend_s;

                                    var varDate = convertPickerToDate(speedingdate);

                                    datebeg_s = convertDateToPicker(addHoursToDate(varDate, -1));
                                    dateend_s = convertDateToPicker(addHoursToDate(varDate, 1));


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

                        }
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
                }
                console.log(data);
            },
            error: function(data) {

            },
        });

        console.log("==============");
    };

    return {
        // echo:echo,
        initializ:initializ,
        fillSpeeding:fillSpeeding
    }
}());