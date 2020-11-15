var pllist = {};

pllist.module = (function () {

    var page = 1;

    var setPage = function(newPage) {
        page = newPage;
    }



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


    var convertDateToRest = function (datestr, delimeter, direction) {
        var list = datestr.split(delimeter);
        if (list.length != 3) {
            return "";
        }

        if (direction == "ymd") {
            return list[0] + "-" + list[1] + "-" + list[2];
        }

        return list[2] + "-" + list[1] + "-" + list[0];

    }


    // устанавливаем даты по умолчанию
    var getPllistPeriod = function() {

        // глубина периода
        var period = 10;

        var localDatebeg = new Date();
        var localDateend = new Date();

        localDatebeg.setDate(localDatebeg.getDate() - period);

        datebeg = localDatebeg;
        dateend = localDateend;

        $('#beginDate').val(formatDate(localDatebeg, ".", "dmy"))
        $('#endDate').val(formatDate(localDateend, ".", "dmy"))

    }

    var renderRow = function() {
        // var rowTemplate =
    }

    // устанавливаем даты по умолчанию
    var getPllist = function() {
        // обновление списка путевых листов

        // userid
        var cookies = checkauth.module.getCookies();

        var jsonData = {};
        jsonData.userid = cookies.userid;
        jsonData.token = cookies.token;
        jsonData.datebeg = convertDateToRest($("#beginDate").val(), ".", "dmy");
        jsonData.dateend = convertDateToRest($("#endDate").val(), ".", "dmy");

        if ($('#onlyopen').is(':checked'))
            jsonData.onlyopen = 1;
        else
            jsonData.onlyopen = 0;

        jsonData.page = page;


        $.ajax({
            url: "pl/getlist",
            type: 'post',
            dataType: 'json',
            data: JSON.stringify(jsonData),
            contentType: "application/json; charset=utf-8",
            success: function(data) {

                if (data.status == "ok") {
                    $("#pltable tbody tr").remove();

                    // установим данные по водителю
                    // фио


                }

                console.log(data);


            },
            error: function(data) {

            },
        });

    }


    return {
        getPllistPeriod:getPllistPeriod,
        getPllist:getPllist,
        setPage:setPage
    };

}());