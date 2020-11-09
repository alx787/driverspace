var signin = {};

signin.module = (function () {

    var echo = function() {
        console.log("привет");
    };


// Сохраняет пару имя/значение в виде cookie, кодируя значение с помощью
// encodeURIComponent(), чтобы экранировать точки с запятой, запятые и пробелы.
// Если в параметре daysToLive передается число, атрибут max-age
// устанавливается так, что срок хранения cookie истекает через
// указанное число дней. Если передать значение 0, cookie будет удален
    var setCookie = function setCookie(name, value, daysToLive)
    {
        var cookie = name + "=" + encodeURIComponent(value);

        if (typeof daysToLive === "number") {
            if (daysToLive >= 0) {
                cookie += "; max-age=" + (daysToLive*60*60*24);
            }
        } else {
            throw new Error('Параметр daysToLive должен быть числом.');
        }

        document.cookie = cookie;
    }

// Возвращает cookies документа в виде объекта с парами имя/значение.
// Предполагается, что значения cookie кодируются с помощью
// функции encodeURIComponent()
    var getCookies = function () {
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


    // схема авторизации при входе
    // 1. при нажатии на кнопку ВХОД получить логин и пароль
    // 2. отправляем логин-пароль на сервер для проверки есть ли такой пользователь (на сервере если все норм то возвращается юзерид-токен)
    // 3. если авторизация не проходит то выдаем сообщение об ошибке
    // 4. если авторизация проходит то сохраняем юзерид-токен в куках (если стоит галка "запомнить" то срок у куков ставим несколько дней

    // схема авторизации при открытии любой страницы
    // 1. проверяем есть ли нужные куки
    // 2. если куки есть то проверяем их на сервере (если они действителны то оставляем на сервере)
    // 3. если кук нет или они не проходят проверку то удаляем куки если они есть и отправляем на страницу регистрации


    var getContextUrl = function () {
        var pathArr = window.location.pathname.split("/");

        if (pathArr.length > 1) {
            return pathArr[1];
        }

        return "";
    }

    var hideAlertPopup = function (message) {
        $("#alertPopup").fadeOut("fast");
    }


    var showAlertPopup = function (message) {
        $("#alertPopup").text(message);
        $("#alertPopup").fadeIn("slow", function () {
            // setTimeout(hideAlertPopup(), 8000);
        });
    }


    var checkLoginPassword = function () {

        var login = $("#inputUser").val();
        var password = $("#inputPassword").val();

        login = login.trim();
        password = password.trim();

        if ((login == "") || (password == "")) {
            showAlertPopup("не заполнено имя пользователя или пароль");
        }

        var jsonData = {};
        jsonData.tabnomer = login;
        jsonData.password = password;

        $.ajax({
            url: "users/auth",
            type: 'post',
            dataType: 'json',
            data: JSON.stringify(jsonData),
            contentType: "application/json; charset=utf-8",
            success: function(data) {

                console.log(data);

                if (data.status == "error") {

                    // затираем куки
                    setCookie("userid", data.userid, 0);
                    setCookie("token", data.token, 3);
                    showAlertPopup(data.message);
                }

                if (data.status == "ok") {
                    // устанавливаем куки
                    if($("#remember").is(':checked')) {
                        setCookie("userid", data.userid, 30);
                        setCookie("token", data.token, 30);
                    } else {
                        setCookie("userid", data.userid, 0);
                        setCookie("token", data.token, 0);
                    }
                }

            },
            error: function(data) {
                // затираем куки
                setCookie("userid", data.userid, 0);
                setCookie("token", data.token, 3);
                showAlertPopup("Ошибка при обращении к серверу");
            },

        });


    }


    return {
        echo:echo,
        checkLoginPassword:checkLoginPassword
    }

}());