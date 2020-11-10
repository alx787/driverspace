
var checkauth = {};

checkauth.module = (function () {

    // var getContextUrl = function() {
    //     var pathArr = window.location.pathname.split("/");
    //
    //     if (pathArr.length > 1) {
    //         return pathArr[1];
    //     }
    //
    //     return "";
    // }


// Сохраняет пару имя/значение в виде cookie, кодируя значение с помощью
// encodeURIComponent(), чтобы экранировать точки с запятой, запятые и пробелы.
// Если в параметре daysToLive передается число, атрибут max-age
// устанавливается так, что срок хранения cookie истекает через
// указанное число дней. Если передать значение 0, cookie будет будет действовать только
// на время сеанса открытого окна браузера
// если передать -1 то куки будет удален
    var setCookie = function setCookie(name, value, daysToLive)
    {
        // по умолчанию только на время открытой страницы
        var cookie = name + "=" + encodeURIComponent(value);

        if (typeof daysToLive === "number") {
            // установим количество дней
            if (daysToLive > 0) {
                cookie += "; max-age=" + (daysToLive*60*60*24);
            }

            // или удалим
            if (daysToLive < 0) {
                cookie += "; max-age=0";
            }

        } else {
            throw new Error('Параметр daysToLive должен быть числом.');
        }

        document.cookie = cookie;
    }

    var getCookies = function() {
        // Возвращаемый объект
        var cookies = {};

        // Получить все cookies в одной строке
        var all = document.cookie;

        // Если получена пустая строка, вернуть пустой объект
        if (all === "")
            return cookies;

        // Разбить на пары имя/значение
        var list = all.split("; ");
        for(var i = 0; i < list.length; i++)
        {
            // Для каждого cookie
            var cookie = list[i];

            // Отыскать первый знак =
            var p = cookie.indexOf("=");

            // Получить имя cookie
            var name = cookie.substring(0,p);

            // Получить значение cookie
            var value = cookie.substring(p+1);

            // Декодировать значение
            value = decodeURIComponent(value);

            // Сохранить имя и значение в объекте
            cookies[name] = value;
        }

        return cookies;
    }

    var checkAuth = function() {

        var cookies = getCookies();

        if (cookies.userid == undefined || cookies.token == undefined) {
            return false
        }

        var jsonData = {};
        jsonData.tabnomer = cookies.userid;
        jsonData.password = cookies.token;

        var result = function () {

            var tmp_res = false;

            $.ajax({
                async: false,
                url: "users/check",
                type: 'post',
                dataType: 'json',
                data: JSON.stringify(jsonData),
                contentType: "application/json; charset=utf-8",
                success: function(data) {

                    console.log(data);

                    if (data.status == "ok") {
                        tmp_res = true;
                    }

                },
                error: function(data) {

                },

            });
            return tmp_res;
        }();

        return result;
    }

    var unAuth = function() {
        setCookie("userid", "", -1);
        setCookie("token", "", -1);
    }


    return {
        checkAuth:checkAuth,
        unAuth:unAuth,
        getCookies:getCookies
    }

}());




