var tsselect = {};

tsselect.module = (function () {

    // var echo = function() {
    //     console.log("привет");
    // };


    // заполним строки документа
    var fillVehicles = function() {
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
                            var templateRow = $("#invnom-template").html();
                            var rowStr = "";

                            for (var i = 0; i < data.vehicles.length; i++) {
                                rowStr = templateRow;
                                rowStr = rowStr.replace("__invnom__", data.vehicles[i].invnomer);
                                rowStr = rowStr.replace("__model__", data.vehicles[i].model);
                                rowStr = rowStr.replace("__regnomer__", data.vehicles[i].regnomer);

                                $($(".container")[0]).append(rowStr);

                            }

                            // назначим событие
                            var rowsObj = $(".row.row-decor");
                            for (var i = 0; i < rowsObj.length; i++ ) {
                                $(rowsObj[i]).on("click", function () {
                                    // console.log(this);
                                    // console.log($(this).find("span").text());
                                    if ($("#mode").text() == "track") {
                                        window.location.assign("/" + getContextUrl() + "/trackviewer?invnom=" + $(this).find("span").text());
                                    } else if ($("#mode").text() == "speeding") {
                                        window.location.assign("/" + getContextUrl() + "/speedingviewer?invnom=" + $(this).find("span").text());
                                    } else {
                                        window.location.assign("/" + getContextUrl() + "/fuelrateviewer?invnom=" + $(this).find("span").text());
                                    }

                                })
                            }

                        }

                    }

                }


                console.log(data);

            },
            error: function(data) {

            },
        });


    };


    return {
        fillVehicles:fillVehicles
    }


}());