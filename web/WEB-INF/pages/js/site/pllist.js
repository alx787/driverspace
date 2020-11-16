var pllist = {};

pllist.module = (function () {

    var currentPage = 1;
    var totalPages = 0;

    var setCurrentPage = function(newCurrentPage) {
        currentPage = newCurrentPage;
    }

    var setTotalPages = function(newTotalPages) {
        totalPages = newTotalPages;
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

    var convertRestToDate = function (datestr, delimeter, direction) {
        var list = datestr.split("-");
        if (list.length != 3) {
            return "";
        }

        if (direction == "ymd") {
            return list[0] + delimeter + list[1] + delimeter + list[2];
        }

        return list[2] + delimeter + list[1] + delimeter + list[0];

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

        $('#beginDate').val(formatDate(localDatebeg, ".", "dmy"));
        $('#endDate').val(formatDate(localDateend, ".", "dmy"));

    }

    var renderRow = function(number, uid, date, klient, route) {
        var rowTemplate = '<tr>'
                            + '<td><span>__number__</span><span style="display: none">__uid__</span> от<br/>__date__</td>'
                            + '<td>__klient__</td>'
                            + '<td>__route__</td>'
                        + '</tr>';

        var rowStr = rowTemplate;

        rowStr = rowStr.replace("__number__", number);
        rowStr = rowStr.replace("__uid__", uid);
        rowStr = rowStr.replace("__date__", convertRestToDate(date, ".", "dmy"));
        rowStr = rowStr.replace("__klient__", klient);
        rowStr = rowStr.replace("__route__", route);

        return rowStr;
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

        jsonData.page = currentPage;


        $.ajax({
            url: "pl/getlist",
            type: 'post',
            dataType: 'json',
            data: JSON.stringify(jsonData),
            contentType: "application/json; charset=utf-8",
            success: function(data) {

                if (data.status == "ok") {

                    // переменные модуля
                    // текущая страница
                    currentPage = data.content.currentpage;
                    // количество страниц
                    totalPages = data.content.totalpages;

                    // таблица объект
                    var tableObj = $("#pltable");

                    // очистим таблицу
                    $("#pltable tbody tr").remove();

                    // заполним таблицу
                    var plmas = data.content.lists;

                    if (plmas == null) {
                        return false;
                    }

                    if (plmas.length == 0) {
                        return false;
                    }

                    var oneRow = "";
                    for (var i = 0; i < plmas.length; i++) {
                        oneRow = renderRow(plmas[i].number, plmas[i].uid, plmas[i].date, plmas[i].klient, plmas[i].route);
                        tableObj.append(oneRow);
                    }

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
        setCurrentPage:setCurrentPage,
        setTotalPages:setTotalPages
    };

}());