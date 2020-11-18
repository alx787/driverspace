var pledits = {};

pledits.module = (function () {

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
                //         "refuel": "",
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

                    $("#speedometerBegin").val(data.content.speedometerbegin);
                    $("#speedometerEnd").val(data.content.speedometerend);
                    $("#refuelCnt").val(data.content.refuel);

                    // заполняем строки путевого листа
                    var plparts = data.content.parts;
                    if (plparts != null)
                        // если в путевке только одна строка то заполняем то что есть в документе
                        if (plparts.length >= 1) {
                            $("#beginDate1").val(convertRestToDate(plparts[0].datebegin, ".", "dmy"));
                            $("#endDate1").val(convertRestToDate(plparts[0].dateend, ".", "dmy"));
                            $("#relaxTime1").val(plparts[0].breaklen);
                        }
                        // если строк больше то заполняем оставшееся в цикле
                        if (plparts.length > 1) {
                            var ii = "";
                            for (var i = 1; i < plparts.length; i++) {
                                pledit.module.addRow();

                                ii = (i + 1).toString();

                                $("#beginDate" + ii).val(convertRestToDate(plparts[i].datebegin, ".", "dmy"));
                                $("#endDate" + ii).val(convertRestToDate(plparts[i].dateend, ".", "dmy"));
                                $("#relaxTime" + ii).val(plparts[i].breaklen);
                            }

                        }

                }

                console.log(data);


            },
            error: function(data) {

            },
        });

    }


    return {
        showMessage:showMessage,
        getPldata:getPldata

};



}());