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

        if (typeof daysToLive === "number")
            cookie += "; max-age=" + (daysToLive*60*60*24);
        else
            throw new Error('Параметр daysToLive должен быть числом.');

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


    var checkLoginPassword = function () {

        // var login = $("#inputUser").val();
        // var password = $("#inputPassword").val();
        //
        // login = login.trim();
        // password = password.trim();


    }


    return {
        echo:echo
    }

}());