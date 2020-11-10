var mainpage = {};

mainpage.module = (function () {

    var getDriverInfo = function() {
        var cookies = checkauth.module.getCookies();

        var jsonData = {};
        jsonData.tabnomer = cookies.userid;
        jsonData.password = cookies.token;

        $.ajax({
            url: "info/getdriver",
            type: 'post',
            dataType: 'json',
            data: JSON.stringify(jsonData),
            contentType: "application/json; charset=utf-8",
            success: function(data) {

                if (data.status == "ok") {
                    // установим данные по водителю
                    // фио
                    $("#drivername").text(data.fio);

                    // тс
                    $("#vehicles .card-body").remove();


                    var rows = "";
                    var rowTemplate = '<div class="card-body"><h1 class="card-title pricing-card-title">__vehicle__</h1></div>';
                    var dataLength = data.vehicles.length;

                    for (var i = 0; i < dataLength; i++) {
                        rows = rows + rowTemplate.replace("__vehicle__", data.vehicles[i].model);
                    }

                    if (rows != "") {
                        $("#vehicles").append(rows);
                    }

                }

                console.log(data);


            },
            error: function(data) {

            },

        });

    }

    return {
        getDriverInfo:getDriverInfo
    }


}());