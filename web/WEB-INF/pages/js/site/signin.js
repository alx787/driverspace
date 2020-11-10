var signin = {};

signin.module = (function () {

    // var echo = function() {
    //     console.log("привет");
    // };


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
                    setCookie("userid", data.userid, -1);
                    setCookie("token", data.token, -1);
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
                    // перенаправляем на главную страницу
                    window.location.assign("/" + getContextUrl() + "/mainpage");
                }

            },
            error: function(data) {
                // затираем куки
                setCookie("userid", data.userid, -1);
                setCookie("token", data.token, -1);
                showAlertPopup("Ошибка при обращении к серверу");
            },

        });


    }


    return {
        // echo:echo,
        checkLoginPassword:checkLoginPassword
    }

}());