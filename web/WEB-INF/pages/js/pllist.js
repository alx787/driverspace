var pllist = {};

pllist.module = (function () {

    var currentPage = 1;
    var totalPages = 0;
    var blockButtons = false; // флаг блокировки нажатий на кнопки

    var setCurrentPage = function(newCurrentPage) {
        currentPage = newCurrentPage;
    }

    var setTotalPages = function(newTotalPages) {
        totalPages = newTotalPages;
    }

    var getCurrentPage = function() {
        return currentPage;
    }

    var getTotalPages = function() {
        return totalPages;
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

        if (document.getElementById("beginDate").value.trim() == "") {
            $('#beginDate').val(formatDate(localDatebeg, ".", "dmy"));
        }

        if (document.getElementById("endDate").value.trim() == "") {
            $('#endDate').val(formatDate(localDateend, ".", "dmy"));
        }

        var pagenum = $("#pagenumber").text();
        if (pagenum.trim() != "") {

            currentPage = parseInt(pagenum);

            if (isNaN(currentPage)) {
                currentPage = 1;
            }
        }

        // var vehicle = $("#vehicleid").text();
        // if (vehicle.trim() != "") {
        //     $("#vehicle").val(vehicle);
        // }

    }

    // обработчик нажатия кнопки обновить
    var refreshBtnHandler = function() {
        currentPage = 1;
        totalPages = 0;
        getPllist();
    }

    // отрисовка строки таблицы
    var renderRow = function(number, uid, date, regnomer, klient, route, closed) {
        var rowTemplate = '<tr __closed__>'
                            + '<td><span class="plnumber">__number__</span><span class="pluid">__uid__</span> от<br/>__date__<br/><span style="font-size: 10px;">__regnomer__</span></td>'
                            + '<td>__klient__</td>'
                            + '<td>__route__</td>'
                        + '</tr>';

        var closedStyle = 'class="plclosed"';

        var rowStr = rowTemplate;

        rowStr = rowStr.replace("__number__", number);
        rowStr = rowStr.replace("__uid__", uid);
        rowStr = rowStr.replace("__date__", convertRestToDate(date, ".", "dmy"));
        rowStr = rowStr.replace("__regnomer__", regnomer);
        rowStr = rowStr.replace("__klient__", klient);
        rowStr = rowStr.replace("__route__", route);

        if (closed == "true") {
            rowStr = rowStr.replace("__closed__", closedStyle);
        } else {
            rowStr = rowStr.replace("__closed__", "");
        }

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



        // тут надо получить значение ид для тс
        // оно хранится в двух местах
        // 1 - в начале тела документа - там оно передается со страницы редактирования через контроллер прописывается в шаблон
        // 2 - в теге select
        // если в теге select значение null или "-", то берем из начала документа
        // var vehicle = $("#vehicleid").text();
        // if (vehicle.trim() != "") {
        //     $("#vehicle").val(vehicle);
        // }

        // если в начале документа непустое значение то берем его
        // иначе берем из селекта
        if ($("#vehicleid").text().trim() != "") {
            jsonData.invnomer = $("#vehicleid").text();
        } else {
            jsonData.invnomer = $("#vehicle").val();
        };


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
                    currentPage = 1;
                    // количество страниц
                    totalPages = 0;


                    /////////////////////////////////////////////////
                    // заполним селектор с вариантами фильтрации по ТС
                    if ($("#vehicle option").length == 1) {
                        var tsArr = data.content.infovehiclelist;
                        for (var i = 0; i < tsArr.length; i++) {
                            $('#vehicle').append($('<option>').val(tsArr[i].invnomer).text(tsArr[i].regnomer));
                        }
                    }

                    // устанавливаем текущее значение
                    // если в начале документа непустое значение то берем его
                    // иначе берем из селекта
                    if ($("#vehicleid").text().trim() != "") {
                        $("#vehicle").val($("#vehicleid").text());
                    };

                    // и затираем его
                    $("#vehicleid").text("");
                    //
                    /////////////////////////////////////////////////


                    // таблица объект
                    var tableObj = $("#pltable");

                    // очистим таблицу
                    $("#pltable tbody tr").remove();

                    // заполним таблицу
                    var plmas = data.content.lists;

                    if (plmas == null) {
                        removeSpinnerFromButton($("#pllistrefresh"));
                        setBlockButtons(false);
                        notifications.module.showNotification("Путевые листы", "Ничего не найдено", 3);
                        return false;
                    }

                    // переменные модуля
                    // текущая страница
                    currentPage = data.content.currentpage;
                    // количество страниц
                    totalPages = data.content.totalpages;

                    // настраиваем пагинатор
                    setupPaginators();

                    if (plmas.length == 0) {
                        removeSpinnerFromButton($("#pllistrefresh"));
                        setBlockButtons(false);
                        notifications.module.showNotification("Путевые листы", "Ничего не найдено", 5);
                        return false;
                    }

                    // отрисовываем строки
                    var oneRow = "";
                    for (var i = 0; i < plmas.length; i++) {
                        oneRow = renderRow(plmas[i].number, plmas[i].uid, plmas[i].date, plmas[i].regnomer, plmas[i].klient, plmas[i].route, plmas[i].closed);
                        tableObj.append(oneRow);
                    }

                    // назначим события на нажатие каждой строки
                    var tableRowsObj = $("#pltable tbody tr");
                    var tableSize = tableRowsObj.length;


                    for (var i = 0; i < tableSize; i++) {
                        tableRowsObj.eq(i).on("click", function () {

                            if (getBlockButtons()) {
                                return false;
                            }


                            // console.log(this);
                            // console.log($(this));
                            // console.log($(this).text());

                            // чтобы восстановить состояние списка после возврата из путевки
                            // передаем в параметрах дату начала и дату окончания периода, только открытые и номер текущей страницы
                            // pledit?numpl=ххх&datebeg=xx.xx.xxxx&dateend=xx.xx.xxxx&onlyopen=1&page=x
                            var onlyopen = 0;
                            if ($('#onlyopen').is(':checked')) {
                                onlyopen = 1;
                            }

                            var url = "/" + getContextUrl() + "/pledit?datebeg=" + $("#beginDate").val()
                                + "&dateend=" + $("#endDate").val()
                                + "&onlyopen=" + onlyopen
                                + "&page=" + currentPage
                                + "&vehicle=" + $("#vehicle").val();

                            window.location.assign(url + "&numpl=" + $(this).find("span.plnumber").text());

                        })
                    }


                }

                console.log(data);


                notifications.module.showNotification("Путевые листы", "Найдено " + data.content.totalrecs, 3);

            },
            error: function(data) {
                notifications.module.showNotification("Путевые листы (ошибка)", data.message, 0);

            },
            complete: function() {
                removeSpinnerFromButton($("#pllistrefresh"));
                setBlockButtons(false);

            },
        });

    }

    // пагинаторы
    var setupPaginators = function() {
        fillPaginator($("#pager-top li.page-item"), $("#pager-top a.page-link"));
        fillPaginator($("#pager-bottom li.page-item"), $("#pager-bottom a.page-link"));
    }


    // заполнение пагинаторов
    var fillPaginator = function(pageItems, pageLinks) {
        // всего в пагинаторе 5 кнопок
        // 0 - назад
        // 1
        // 2
        // 3
        // 4 - вперед

        // ссылки
        //$("#pager-top a.page-link")
        // элементы списка
        //$("#pager-top li.page-item")

        // var pageItems = $("#pager-top li.page-item");
        // var pageLinks = $("#pager-top a.page-link");


        // ставим видимость
        if (totalPages == 0 || totalPages == 1) {
            pageItems.eq(0).css("display", "none");
            pageItems.eq(1).css("display", "none");
            pageItems.eq(2).css("display", "none");
            pageItems.eq(3).css("display", "none");
            pageItems.eq(4).css("display", "none");
        }

        if (totalPages == 2) {
            pageItems.eq(0).css("display", "block");
            pageItems.eq(1).css("display", "block");
            pageItems.eq(2).css("display", "block");
            pageItems.eq(3).css("display", "none");
            pageItems.eq(4).css("display", "block");
        }

        if (totalPages >= 3) {
            pageItems.eq(0).css("display", "block");
            pageItems.eq(1).css("display", "block");
            pageItems.eq(2).css("display", "block");
            pageItems.eq(3).css("display", "block");
            pageItems.eq(4).css("display", "block");
        }

        // сначала убираем везде активность
        if (pageItems.eq(1).hasClass("active")) {
            pageItems.eq(1).removeClass("active");
        }

        if (pageItems.eq(2).hasClass("active")) {
            pageItems.eq(2).removeClass("active");
        }

        if (pageItems.eq(3).hasClass("active")) {
            pageItems.eq(3).removeClass("active");
        }

        // определяем активную страницу и расставляем номера
        if (currentPage == 1) {
            pageItems.eq(1).addClass("active");

            pageLinks.eq(1).text("1");
            pageLinks.eq(2).text("2");
            pageLinks.eq(3).text("3");

        // } else if (currentPage == 2 && totalPages == 2) {
        } else if (currentPage == 2) {
            pageItems.eq(2).addClass("active");

            pageLinks.eq(1).text("1");
            pageLinks.eq(2).text("2");
            pageLinks.eq(3).text("3");

        } else if (currentPage > 2 && currentPage == totalPages) {
            pageItems.eq(3).addClass("active");

            pageLinks.eq(1).text(currentPage - 2);
            pageLinks.eq(2).text(currentPage - 1);
            pageLinks.eq(3).text(currentPage);

        } else {
            pageItems.eq(2).addClass("active");

            pageLinks.eq(1).text(currentPage - 1);
            pageLinks.eq(2).text(currentPage);
            pageLinks.eq(3).text(currentPage + 1);
        }

    }

    // процедура - обрабатывает нажатия на кнопки пагинатора
    // currentLinkText - текст нажатой кнопки
    // pagerLinkObj - объект пагинатора
    var pageClickHandler = function (currentLinkText, pagerLinkObj) {
        // назад
        if (currentLinkText == pagerLinkObj.eq(0).text()) {
            goPrevPage();
        }

        // предыдущая страница
        if (currentLinkText == pagerLinkObj.eq(1).text()) {
            goToPage(parseInt(pagerLinkObj.eq(1).text()));
        }

        // текущая страница
        if (currentLinkText == pagerLinkObj.eq(2).text()) {
            goToPage(parseInt(pagerLinkObj.eq(2).text()));
        }

        // следующая страница
        if (currentLinkText == pagerLinkObj.eq(3).text()) {
            goToPage(parseInt(pagerLinkObj.eq(3).text()));
        }

        // вперед
        if (currentLinkText == pagerLinkObj.eq(4).text()) {
            goNextPage();
        }

    }

    var goToPage = function (pageNum) {
        if (pageNum >= 1 && pageNum <= totalPages) {
            currentPage = pageNum;
            getPllist();
        }
    }

    var goPrevPage = function () {
        goToPage(currentPage - 1);
    }

    var goNextPage = function () {
        goToPage(currentPage + 1);
    }

    var setBlockButtons = function(newSet) {
        blockButtons = newSet;
    }

    var getBlockButtons = function(newSet) {
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
        getPllistPeriod:getPllistPeriod,
        getPllist:getPllist,
        refreshBtnHandler:refreshBtnHandler,
        pageClickHandler:pageClickHandler,
        setBlockButtons:setBlockButtons,
        addSpinnerToButton:addSpinnerToButton,
        getBlockButtons:getBlockButtons
        // setCurrentPage:setCurrentPage,
        // setTotalPages:setTotalPages,
        // getCurrentPage:getCurrentPage,
        // getTotalPages:getTotalPages,
    };

}());