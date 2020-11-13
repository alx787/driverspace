var mainpage = {};

mainpage.module = (function () {

    var datebeg = new Date();
    var dateend = new Date();


    // форматирование даты из типа Date в вид ГГГГ.ММ.ДД
    // date - дата типа Date
    // delimeter - разделитель
    var formatDate = function(date, delimeter) {

        var dd = date.getDate();

        if (dd < 10) dd = '0' + dd;

        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        // var yy = date.getFullYear() % 100;
        var yy = date.getFullYear();
        // if (yy < 10) yy = '0' + yy;

        // return dd + '.' + mm + '.' + yy;
        return yy + delimeter + mm + delimeter + dd;
    }

    // получаем инфо по водителю и сразу устанавливаем все на странице
    var getDriverInfo = function() {
        var cookies = checkauth.module.getCookies();

        var jsonData = {};
        jsonData.userid = cookies.userid;
        jsonData.token = cookies.token;
        jsonData.datebeg = formatDate(datebeg, "-");
        jsonData.dateend = formatDate(dateend, "-");

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

                    // путевые листы
                    $("#plcnt").text(data.plcnt);


                }

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

        datebeg = localDatebeg;
        dateend = localDateend;

        $("#datebeg").text(formatDate(localDatebeg, "."));
        $("#dateend").text(formatDate(localDateend, "."));
    }


    // перенаправляем на главную страницу
    var gotoPllist = function() {
        window.location.assign("/" + getContextUrl() + "/pllist");
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
        gotoPllist:gotoPllist,
        getDatebeg:getDatebeg,
        getDateend:getDateend
    }


}());