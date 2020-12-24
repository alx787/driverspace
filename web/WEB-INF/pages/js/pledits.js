var pledits = {};

pledits.module = (function () {

    // тут будут хранится переменные из вызывающей страницы
    // все строки
    var datebeg = "";
    var dateend = "";
    var onlyopen = "";
    var page = "";
    var numpl = "";
    var vehicle = "";

    var closed = false; // признак того что пл закрыт


    var showMessage = function() {
        console.log("=========== проверка ===========");
        return false;
    };


    var convertRestToDate = function (datestr, delimeter, direction) {
        // проверим добавлено ли время в конце
        var datetime = datestr.split(" ");
        if (datetime.length == 0 || datetime.length > 2) {
            return "";
        }

        var timestr = "";
        if (datetime.length == 2) {
            timestr = " " + datetime[1];
        }

        var list = datetime[0].split("-");
        if (list.length != 3) {
            return "";
        }

        if (direction == "ymd") {
            return list[0] + delimeter + list[1] + delimeter + list[2] + timestr;
        }

        return list[2] + delimeter + list[1] + delimeter + list[0] + timestr;

    }


    var convertDateToRest = function (datestr, delimeter, direction) {
        // проверим добавлено ли время в конце
        var datetime = datestr.split(" ");

        if (datetime.length == 0 || datetime.length > 2) {
            return "";
        }

        var timestr = "";
        if (datetime.length == 2) {
            timestr = " " + datetime[1];
        }

        var list = datetime[0].split(delimeter);
        if (list.length != 3) {
            return "";
        }

        if (direction == "ymd") {
            return list[2] + "-" + list[1] + "-" + list[0] + timestr;
        }

        return list[0] + "-" + list[1] + "-" + list[2] + timestr;
    }


    var getPldata = function() {

        var cookies = checkauth.module.getCookies();

        var jsonData = {};
        jsonData.userid = cookies.userid;
        jsonData.token = cookies.token;
        jsonData.numpl = $("#plnum").text();

        $.ajax({
            url: "pl/getone",
            type: 'post',
            dataType: 'json',
            data: JSON.stringify(jsonData),
            contentType: "application/json; charset=utf-8",
            success: function(data) {



                // {
                //     "status": "ok",
                //     "message": "",
                //     "fio": "Костылев В. В",
                //     "content": {
                //         "rownum": "0",
                //         "uid": "2681447e-6720-11e9-872b-005056c00008",
                //         "number": 411685,
                //         "date": "2019-04-10",
                //         "route": "",
                //         "klient": "",
                //         "vehicle": "МТЗ-82 6034КО  43 RUS",
                //         "datebegin": "2019-04-10 08:00",
                //         "dateend": "2019-04-18 17:00",
                //         "breaklen": "48",
                //         "speedometerbegin": "890",
                //         "speedometerend": "890",

                //         "fueltype": "",
                //         "fuelcard": "",
                //         "refuelcnt": "",
                //         "refueloutside": "",
                //         "refuelissued": "",

                //         "fueltype2": "",
                //         "fuelcard2": "",
                //         "refuelcnt2": "",
                //         "refuelissued2": "",


                //         "closed": "true",
                //         "parts": [
                //         {
                //             "datebegin": "2019-04-10 08:00",
                //             "dateend": "2019-04-10 08:59",
                //             "breaklen": ""
                //         },
                //         {
                //             "datebegin": "2019-04-10 08:00",
                //             "dateend": "2019-04-18 17:00",
                //             "breaklen": ""
                //         },
                //     ]
                // }
                // }


                if (data.status == "ok") {
                    // заполняем путевку
                    $("#pldate").text(convertRestToDate(data.content.date, ".", "dmy"));
                    $("#driverName").val(data.fio);
                    $("#tsName").val(data.content.vehicle);
                    $("#route").val(data.content.route);

                    $("#beginDate").val(convertRestToDate(data.content.datebegin, ".", "dmy"));
                    $("#endDate").val(convertRestToDate(data.content.dateend, ".", "dmy"));
                    $("#relaxTime").val(data.content.breaklen);


                    $("#speedometerBegin").val(data.content.speedometerbegin);
                    $("#speedometerEnd").val(data.content.speedometerend);

                    // основное топливо
                    $("#fuelType").val(data.content.fueltype);

                    $("#fuelCard").val(data.content.fuelcard);
                    $("#refuelCnt").val(data.content.refuelcnt);
                    $("#refuelOutside").val(data.content.refueloutside);
                    $("#refuelIssued").val(data.content.refuelissued);

                    // дополнительное топливо
                    $("#fuelType2").val(data.content.fueltype2);

                    $("#fuelCard2").val(data.content.fuelcard2);
                    $("#refuelCnt2").val(data.content.refuelcnt2);
                    $("#refuelIssued2").val(data.content.refuelissued2);



                    // отключим кнопки отправки у закрытых пл
                    if (data.content.closed == "true") {
                        closed = true;
                        disableButtons();
                        // $("#plclosed").text("закрыт");
                        // $("#exitwithsave").attr("disabled", true);
                        // $("#exitwithsavesend").attr("disabled", true);
                    }

                    // заполняем строки путевого листа
                    var plparts = data.content.parts;
                    if (plparts != null)
                        var ii = "";
                        for (var i = 0; i < plparts.length; i++) {
                            pledit.module.addRow();

                            ii = (i + 1).toString();

                            $("#rowBeginDate" + ii).val(convertRestToDate(plparts[i].datebegin, ".", "dmy"));
                            $("#rowEndDate" + ii).val(convertRestToDate(plparts[i].dateend, ".", "dmy"));
                            $("#rowRelaxTime" + ii).val(plparts[i].breaklen);
                        }
                }

                console.log(data);
            },
            error: function(data) {
                notifications.module.showNotification("Путевой лист (ошибка)", "Ошибка при получении", 0);

            },
        });

    }


    // отключить кнопки отправки и редактирования у закрытого пл
    var disableButtons = function () {

        // надпись в заголовке пл
        $("#plclosed").text("закрыт");

        // кнопки сохранения
        $("#exitwithsave").attr("disabled", true);
        $("#exitwithsavesend").attr("disabled", true);

        // кнопка добавить строку пл
        $("#addRowToPl").attr("disabled", true);


        // кнопки "удалить" в строках пл
        $(".card:not(\".hidden-card\") .card-header .row button").each(function() {
            $(this).attr("disabled", true);
        })

        // закрыть все поля ввода
        $("input").prop("readonly", true);
        $("select").prop("disabled", true);

    }

    var getSearchParameters = function() {
        var searchUrl = window.location.search;
        if (searchUrl.length == 0) {
            return false;
        }

        searchUrl = searchUrl.substring(1, searchUrl.length);
        var paramsArray = searchUrl.split("&");
        for(var i = 0; i < paramsArray.length; i++) {

            // Для каждого cookie
            var param = paramsArray[i];

            // Отыскать первый знак =
            var p = param.indexOf("=");

            // Получить имя параметра
            var name = param.substring(0, p);

            // Получить значение параметра
            var value = param.substring(p + 1);

            // присвоим значения параметрам
            // ?datebeg=04.03.2020&dateend=20.11.2020&onlyopen=0&page=2&numpl=674257
            if (name == "datebeg") {
                datebeg = value;
            }
            if (name == "dateend") {
                dateend = value;
            }
            if (name == "onlyopen") {
                onlyopen = value;
            }
            if (name == "page") {
                page = value;
            }
            if (name == "numpl") {
                numpl = value;
            }
            if (name == "vehicle") {
                vehicle = value;
            }
        }

    };

    var gotoPllistPage = function() {
        window.location.assign("/" + getContextUrl()
            + "/pllist?datebeg=" + datebeg
            + "&dateend=" + dateend
            + "&onlyopen=" + onlyopen
            + "&vehicle=" + vehicle
            + "&page=" + page
            + "&numpl=" + numpl);
    }


    // сохранить пл
    // sendToDispacher - передать пл диспетчеру true|false
    var savePl = function(sendToDispacher) {

        // включим спиннер загрузки
        // showModalAjaxSpin();

        // userid
        var cookies = checkauth.module.getCookies();

        ///////////////////////////////////////
        // данные для отправки на сервер
        ///////////////////////////////////////
        var jsonData = {};
        jsonData.userid = cookies.userid;
        jsonData.token = cookies.token;

        if (sendToDispacher) {
            jsonData.withClose = "1";

            // заблокировать кнопки
            disableButtons();
        } else {
            jsonData.withClose = "0";
        }

        ///////////////////////////////////////
        // пл
        ///////////////////////////////////////
        var waybill = {};

        waybill.rownum = "";
        waybill.uid = "";
        waybill.number = $("#plnum").text();
        waybill.date = "";
        waybill.route = "";
        waybill.klient = "";
        waybill.vehicle = "";
        waybill.datebegin = convertDateToRest($("#beginDate").val(), ".", "ymd");
        waybill.dateend = convertDateToRest($("#endDate").val(), ".", "ymd");
        waybill.breaklen = $("#relaxTime").val();
        waybill.speedometerbegin = $("#speedometerBegin").val();
        waybill.speedometerend = $("#speedometerEnd").val();

        waybill.fueltype = $("#fuelType").val();
        waybill.fuelcard = $("#fuelCard").val();
        waybill.refuelcnt = $("#refuelCnt").val();
        waybill.refueloutside = $("#refuelOutside").val();
        waybill.refuelissued = $("#refuelIssued").val();

        waybill.fueltype2 = $("#fuelType2").val();
        waybill.fuelcard2 = $("#fuelCard2").val();
        waybill.refuelcnt2 = $("#refuelCnt2").val();
        waybill.refuelissued2 = $("#refuelIssued2").val();

        waybill.closed = 1;

        if ($("#plclosed").text().trim() == "") {
            waybill.closed = 0;
        };

        ///////////////////////////////////////
        // части многодневного пл
        ///////////////////////////////////////
        var partsarr = [];
        // partone = {};

        // получим все строки и обойдем их
        var plLineArr = $(".recnumber");
        var arrsize = plLineArr.length;
        
        // начинаем с 1 потому что первым (нулевым) идет шаблон строки
        for (var i = 1; i < arrsize; i++) {
            var recnum = $(".recnumber")[i].innerText;

            ///////////////////////////////////////
            // одна часть пл
            ///////////////////////////////////////
            var partone = {};

            partone.datebegin = convertDateToRest($("#rowBeginDate" + recnum).val(), ".", "ymd");
            partone.dateend = convertDateToRest($("#rowEndDate" + recnum).val(), ".", "ymd");
            partone.breaklen = $("#rowRelaxTime" + recnum).val();

            partsarr.push(partone);
        }


        waybill.parts = partsarr;

        ///////////////////////////////////////
        // собираем все
        ///////////////////////////////////////
        jsonData.wayBill = waybill;

        // console.log(jsonData);

        // когда все собрали формируем запрос на сервер
        $.ajax({
            url: "pl/setpl",
            type: 'post',
            dataType: 'json',
            data: JSON.stringify(jsonData),
            contentType: "application/json; charset=utf-8",
            success: function(data) {

                if (data.status == "ok") {
                    // все норм
                    gotoPllistPage();

                } else {
                    // hideModalAjaxSpin();
                    // showAlertPopup(data.message);
                    notifications.module.showNotification("Путевой лист (ошибка)", data.message, 0);
                }

                console.log(data);

            },
            error: function(data) {
                // hideModalAjaxSpin();
                // showAlertPopup("ошибка при отправке данных");
                notifications.module.showNotification("Путевой лист (ошибка)", "Ошибка при сохранении", 0);
            },
        });


        // gotoPllistPage();


    }


    // события нажатий на кнопки
    var exitWithoutSave = function() {

        // если пл закрыт то просто выходим
        if (getClosed()) {
            gotoPllistPage();
        }


        var modalModeObj = $("#modalMode");
        var modalButtonObj = $("#modalButton");

        modalModeObj.val("exitwithoutsave");
        $("#modalMessage").html('<h4 class="modal-title">Выйти без сохранения ?</h4>');

        modalButtonObj.text("Выйти");

        modalButtonObj.off("click");
        modalButtonObj.on("click", function() {
            gotoPllistPage();
        });

        $("#tweet-modal").modal();
    }


    var exitWithSave = function() {

        var modalButtonObj = $("#modalButton");

        $("#modalMode").val("exitwithsave");
        $("#modalMessage").html('<h4 class="modal-title">Сохранить и выйти ?</h4>');

        modalButtonObj.text("ОК");

        modalButtonObj.off("click");
        modalButtonObj.on("click", function() {
            $("#tweet-modal").modal("hide");
            savePl(false);
        });

        $("#tweet-modal").modal();
    }


    var exitWithSaveSend = function() {
        var modalButtonObj = $("#modalButton");

        $("#modalMode").val("exitwithsave");
        $("#modalMessage").html('<h4 class="modal-title">Отправить диспетчеру и выйти ?</h4>');

        modalButtonObj.text("ОК");

        modalButtonObj.off("click");
        modalButtonObj.on("click", function() {
            $("#tweet-modal").modal("hide");
            savePl(true);
        });

        $("#tweet-modal").modal();
    }

    // показать предупреждение
    var showAlertPopup = function (message) {
        $("#alertPopup").text(message);
        $("#alertPopup").fadeIn("slow", function () {
            // setTimeout(hideAlertPopup(), 8000);
        });
    }


    // отобразить модальное окно во время ожидания
    var showModalAjaxSpin = function () {
        $("#loader-spin").modal({
            backdrop: "static", //remove ability to close modal with click
            keyboard: false, //remove option to close with keyboard
            show: true //Display loader!
        });
        // setTimeout(function() {
        //     $("#loadMe").modal("hide");
        // }, 3500);
    }

    // отобразить модальное окно во время ожидания
    var hideModalAjaxSpin = function () {
        $("#loader-spin").modal("hide");
    }


    // var disableButtons = function() {
    //     $("#addRowToPl").prop("disabled", true);
    //     $("#exitwithoutsave").prop("disabled", true);
    //     $("#exitwithsave").prop("disabled", true);
    //     $("#exitwithsavesend").prop("disabled", true);
    //
    // }

    var getClosed = function() {
        return closed;
    }



    return {
        showMessage:showMessage,
        getPldata:getPldata,
        getSearchParameters:getSearchParameters,
        exitWithoutSave:exitWithoutSave,
        exitWithSave:exitWithSave,
        exitWithSaveSend:exitWithSaveSend,
        showAlertPopup:showAlertPopup,
        showModalAjaxSpin:showModalAjaxSpin,
        hideModalAjaxSpin:hideModalAjaxSpin,
        getClosed:getClosed

    };



}());