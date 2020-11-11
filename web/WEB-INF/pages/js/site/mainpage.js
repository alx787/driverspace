var mainpage = {};

mainpage.module = (function () {

    var datebeg = new Date();
    var dateend = new Date();

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
                    rowTemplate = rowTemplate + '<ul class="list-unstyled mb-4">';
                    rowTemplate = rowTemplate + '<li>__regnom__</li>';
                    rowTemplate = rowTemplate + '</ul>';

                    var dataLength = data.vehicles.length;

                    for (var i = 0; i < dataLength; i++) {
                        rows = rows + rowTemplate.replace("__vehicle__", data.vehicles[i].model).replace("__regnom__", data.vehicles[i].regnomer);
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

    var getDateInfo = function() {
        var localDatebeg = new Date();
        var localDateend = new Date();

        localDatebeg.setDate(localDatebeg.getDate() - 10);

        datebeg = localDatebeg;
        dateend = localDateend;

        $("#datebeg").text(formatDate(localDatebeg, "."));
        $("#dateend").text(formatDate(localDateend, "."));
    }

    var getDatebeg = function() {
        return datebeg;
    }

    var getDateend = function() {
        return dateend;
    }

    return {
        getDriverInfo:getDriverInfo,
        getDateInfo:getDateInfo,
        getDatebeg:getDatebeg,
        getDateend:getDateend
    }


}());