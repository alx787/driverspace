var mainpage = {};

mainpage.module = (function () {

    var datebeg = new Date();
    var dateend = new Date();


    // форматирование даты из типа Date в вид ГГГГ.ММ.ДД
    // date - дата типа Date
    // delimeter - разделитель
    // direction - направление ymd - ГГГГ.ММ.ДД, dmy - ДД.ММ.ГГГГ
    var formatDate = function(date, delimeter, direction) {

        var dd = date.getDate();

        if (dd < 10) dd = '0' + dd;

        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        // var yy = date.getFullYear() % 100;
        var yy = date.getFullYear();
        // if (yy < 10) yy = '0' + yy;

        // return dd + '.' + mm + '.' + yy;
        if (direction == "ymd") {
            return yy + delimeter + mm + delimeter + dd;
        }

        return dd + delimeter + mm + delimeter + yy;
    }

    // получаем инфо по водителю и сразу устанавливаем все на странице
    var getDriverInfo = function() {
        var cookies = checkauth.module.getCookies();

        var jsonData = {};
        jsonData.userid = cookies.userid;
        jsonData.token = cookies.token;
        jsonData.datebeg = formatDate(datebeg, "-", "ymd");
        jsonData.dateend = formatDate(dateend, "-", "ymd");

        $.ajax({
            url: "info/getdriver",
            type: 'post',
            dataType: 'json',
            data: JSON.stringify(jsonData),
            contentType: "application/json; charset=utf-8",
            success: function(data) {

                if (data.status == "ok") {
                    ////////////////////////////////////////////////
                    // установим данные по водителю
                    // установим фио
                    $("#drivername").text(data.fio);
                    // скроем спинер
                    $("#drivernamespinner").css("display", "none");
                    // отобразим фио
                    $("#drivername").removeClass("displaynone");



                    ////////////////////////////////////////////////
                    // тс
                    $("#vehicles .card-body").remove();

                    var rows = "";

                    var rowTemplate = '<div class="card-body"><span style="display: none">__invnom__</span><h1 class="card-title pricing-card-title">__vehicle__</h1></div>';
                    rowTemplate = rowTemplate + '<ul class="list-unstyled mb-4">';
                    rowTemplate = rowTemplate + '<li>__regnom__</li>';
                    rowTemplate = rowTemplate + '</ul>';

                    var dataLength = data.vehicles.length;

                    for (var i = 0; i < dataLength; i++) {
                        rows = rows + rowTemplate.replace("__invnom__", data.vehicles[i].invnomer).replace("__vehicle__", data.vehicles[i].model).replace("__regnom__", data.vehicles[i].regnomer);
                    }

                    if (rows != "") {
                        $("#vehicles").append(rows);
                    }

                    ////////////////////////////////////////////////
                    // путевые листы - установим количество
                    rows = "";
                    rowTemplate = '<h5 class="card-title pricing-card-title">__plinfo__</h5>';

                    for (var i = 0; i < data.plcnt.length; i++) {
                        rows = rows + rowTemplate.replace("__plinfo__", data.plcnt[i].regnomer + " - " + data.plcnt[i].plinfo);
                    }

                    if (rows.trim() == "") {
                        rows = rows + rowTemplate.replace("__plinfo__", "0 / 0");
                    }


                    $("#plcnt").append(rows);

                    // скроем спиннер
                    $("#plcntspinner").css("display", "none");
                    // отобразим количество и кнопку перехода
                    $("#plcnt").removeClass("displaynone");
                    $("#gotoPllistBtn").removeClass("displaynone");

                    ////////////////////////////////////////////////
                    // заполнение разделов с расходом топлива и пробегами и превышениями скорости
                    fillTrackAndFuelRateAndSpeeding(data.vehicles);

                }

                console.log(data);

            },
            error: function(data) {

            },
        });
    }


    // отрисовка пробегов и расхода топлива в цикле по всем машинам закрепленных за водителем
    var fillTrackAndFuelRateAndSpeeding = function (invnomerArr) {
        if (invnomerArr == null) {
            return false;
        }

        if (invnomerArr.length == 0) {
            return false;
        }

        for (var i = 0; i < invnomerArr.length; i++) {
            // пробеги расходы топлива
            getProbeg(invnomerArr[i].invnomer);
            // превышения
            getSpeeding(invnomerArr[i].invnomer);
        }
    }


    // получить данные о пробегах
    var getProbeg = function (invnomer) {
        var cookies = checkauth.module.getCookies();

        var jsonData = {};
        jsonData.userid = cookies.userid;
        jsonData.token = cookies.token;
        jsonData.invnomer = invnomer;
        jsonData.datebeg = formatDate(datebeg, "-", "ymd");
        jsonData.dateend = formatDate(dateend, "-", "ymd");

        $.ajax({
            url: "wln/gettrack",
            type: 'post',
            dataType: 'json',
            data: JSON.stringify(jsonData),
            contentType: "application/json; charset=utf-8",
            success: function(data) {

                if (data.status.toUpperCase() == "OK") {
                    ////////////////////////////////////////////////
                    // установим значение в пробегах
                    //
                    var rowTemplate = '<h5 class="card-title pricing-card-title">' + data.content.regnom + ' - ' + data.content.probeg + ' км</h5>';
                    $("#plprobeg").append(rowTemplate);

                    // // скроем спиннер
                    // $("#plprobegspinner").css("display", "none");
                    // // отобразим количество и кнопку перехода
                    // $("#plprobeg").removeClass("displaynone");
                    // $("#gotoPlprobegBtn").removeClass("displaynone");

                    ////////////////////////////////////////////////
                    // установим значение в расходах топлива
                    //
                    rowTemplate = '<h5 class="card-title pricing-card-title">' + data.content.regnom + ' - ' + data.content.fuelrate + ' л</h5>';
                    $("#plfuelrate").append(rowTemplate);

                    // // скроем спиннер
                    // $("#plfuelratespinner").css("display", "none");
                    // // отобразим количество и кнопку перехода
                    // $("#plfuelrate").removeClass("displaynone");
                    // $("#gotoPlfuelrateBtn").removeClass("displaynone");

                } else {
                    var rowTemplate = '<h5 class="card-title pricing-card-title">-</h5>';
                    $("#plprobeg").append(rowTemplate);

                    rowTemplate = '<h5 class="card-title pricing-card-title">-</h5>';
                    $("#plfuelrate").append(rowTemplate);

                }

                // скроем спиннер пробегов
                $("#plprobegspinner").css("display", "none");
                // отобразим количество и кнопку перехода
                $("#plprobeg").removeClass("displaynone");
                $("#gotoPlprobegBtn").removeClass("displaynone");


                // скроем спиннер расхода топлива
                $("#plfuelratespinner").css("display", "none");
                // отобразим количество и кнопку перехода
                $("#plfuelrate").removeClass("displaynone");
                $("#gotoPlfuelrateBtn").removeClass("displaynone");

                console.log(data);

            },
            error: function(data) {

            },
        });

    }

    // получить данные о превышениях скорости
    var getSpeeding = function (invnomer) {
        var cookies = checkauth.module.getCookies();

        var jsonData = {};
        jsonData.userid = cookies.userid;
        jsonData.token = cookies.token;
        jsonData.invnomer = invnomer;
        jsonData.datebeg = formatDate(datebeg, "-", "ymd");
        jsonData.dateend = formatDate(dateend, "-", "ymd");

        $.ajax({
            url: "wln/getspeeding",
            type: 'post',
            dataType: 'json',
            data: JSON.stringify(jsonData),
            contentType: "application/json; charset=utf-8",
            success: function(data) {

                if (data.status.toUpperCase() == "OK") {
                    ////////////////////////////////////////////////
                    // установим значение в пробегах
                    //
                    var rowTemplate = "";
                    if (data.content == null || data.content.length == 0) {
                        rowTemplate = '<h5 class="card-title pricing-card-title">-</h5>';
                    } else {
                        rowTemplate = '<h5 class="card-title pricing-card-title">' + data.regnom + ' - ' + data.content.length + '</h5>';
                    }
                } else {
                    rowTemplate = '<h5 class="card-title pricing-card-title">-</h5>';
                }

                $("#plspeeding").append(rowTemplate);


                // скроем спиннер пробегов
                $("#plspeedingspinner").css("display", "none");
                // отобразим количество и кнопку перехода
                $("#plspeeding").removeClass("displaynone");
                $("#gotoPlspeedingBtn").removeClass("displaynone");


                 console.log(data);

            },
            error: function(data) {

            },
        });

    }



        // устанавливаем даты по умолчанию
    var getDateInfo = function() {

        // глубина периода
        var period = 10;

        var localDatebeg = new Date();
        var localDateend = new Date();

        localDatebeg.setDate(localDatebeg.getDate() - period);

        // для отладки, потом убрать
        // localDatebeg = new Date(2020, 5 - 1, 1);
        // localDateend = new Date(2020, 5 - 1, 10);

        datebeg = localDatebeg;
        dateend = localDateend;


        $("#datebeg").text(formatDate(localDatebeg, ".", "dmy"));
        $("#dateend").text(formatDate(localDateend, ".", "dmy"));

    }


    // перенаправляем на главную страницу
    var gotoPllist = function() {
        window.location.assign("/" + getContextUrl() + "/pllist");
    }

    // перенаправляем на страницу с пробегами
    var gotoPlprobeg = function() {
        // нужно проверить количество закрепленных машин, чтобы была возможность выбрать если нужно
        var vehiclescnt = $("#vehicles .card-body").length;

        if (vehiclescnt == 1) {
            window.location.assign("/" + getContextUrl() + "/trackviewer?invnom=" + $($("#vehicles .card-body")[0]).find("span").text());
        }

        if (vehiclescnt > 1) {
            window.location.assign("/" + getContextUrl() + "/tsselect?mode=track");
        }
    }

    // перенаправляем на страницу с расходами топлива
    var gotoPlfuelrate = function() {
        // нужно проверить количество закрепленных машин, чтобы была возможность выбрать если нужно
        var vehiclescnt = $("#vehicles .card-body").length;

        if (vehiclescnt == 1) {
            window.location.assign("/" + getContextUrl() + "/fuelrateviewer?invnom=" + $($("#vehicles .card-body")[0]).find("span").text());
        }

        if (vehiclescnt > 1) {
            window.location.assign("/" + getContextUrl() + "/tsselect?mode=fuelrate");
        }
    }


    // перенаправляем на страницу с превышениями скорости
    var gotoPlspeeding = function () {
        // нужно проверить количество закрепленных машин, чтобы была возможность выбрать если нужно
        var vehiclescnt = $("#vehicles .card-body").length;

        if (vehiclescnt == 1) {
            window.location.assign("/" + getContextUrl() + "/speedingviewer?invnom=" + $($("#vehicles .card-body")[0]).find("span").text());
        }

        if (vehiclescnt > 1) {
            window.location.assign("/" + getContextUrl() + "/tsselect?mode=speeding");
        }

    }

    var getDatebeg = function() {
        return datebeg;
    }

    var getDateend = function() {
        return dateend;
    }

    var disableButtons = function() {
        $("#gotoPllistBtn").prop("disabled", true);
        $("#gotoPlprobegBtn").prop("disabled", true);
        $("#gotoPlfuelrateBtn").prop("disabled", true);
        $("#gotoPlspeedingBtn").prop("disabled", true);
    }

    var enableButtons = function() {
        $("#gotoPllistBtn").prop("disabled", false);
        $("#gotoPlprobegBtn").prop("disabled", false);
        $("#gotoPlfuelrateBtn").prop("disabled", false);
        $("#gotoPlspeedingBtn").prop("disabled", false);
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
        getDriverInfo:getDriverInfo,
        getDateInfo:getDateInfo,
        gotoPllist:gotoPllist,
        gotoPlprobeg:gotoPlprobeg,
        gotoPlfuelrate:gotoPlfuelrate,
        gotoPlspeeding:gotoPlspeeding,
        getDatebeg:getDatebeg,
        getDateend:getDateend,
        disableButtons:disableButtons,
        enableButtons:enableButtons,
        addSpinnerToButton:addSpinnerToButton,
        removeSpinnerFromButton:removeSpinnerFromButton

    }


}());