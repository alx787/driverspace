<!doctype html>
<html lang="ru">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Личный кабинет водителя АТХ">
    <meta name="author" content="alx">
    <title>Личный кабинет водителя АТХ</title>

    <link rel="canonical" href="https://getbootstrap.com/docs/4.5/examples/sign-in/">

    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" type="text/css" href="pages/bootstrap/bootstrap.min.css"/ >


    <style>
      .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }
    </style>


    <!-- Custom styles for this template -->
    <link rel="stylesheet" type="text/css" href="pages/css/signin.css" >


    <script type="text/javascript" src="pages/jq/jquery-3.5.1.min.js"></script>
    <script type="text/javascript" src="pages/bootstrap/bootstrap.min.js"></script>

    <script type="text/javascript" src="pages/js/utils.js"></script>
    <script type="text/javascript" src="pages/js/signin.js"></script>
    <script type="text/javascript" src="pages/js/checkauth.js"></script>

    <script type="text/javascript" >

      // если авторизован то сразу переходим на главную страницу
      if (checkauth.module.checkAuth()) {
          window.location.assign("/" + getContextUrl() + "/mainpage");
      }


      $(document).ready(function() {

          console.log( "document loaded" );

          // прицепим событие на кнопку вход
          $("#submitbtn").on("click", function () {
              signin.module.checkLoginPassword();
          });

      });

    </script>

  </head>
  <body class="text-center">



    <form class="form-signin">

        <div id="alertPopup" class="alert alert-danger" style="display: none; position:absolute; width: 300px" role="alert">
            Неправильное имя пользователя или пароль
        </div>


        <!--
        <img class="mb-4" src="img/logo.svg" alt="" width="72" height="72">
        -->
        <img class="mb-4" style="margin-left: 23px;" src="pages/img/logo.png" alt="">
        <h3 class="h3 mb-3 font-weight-normal">Личный кабинет водителя</h3>
        <h3 class="h5 mb-3 font-weight-normal">Авторизация</h3>

        <label for="inputUser" class="sr-only">Имя пользователя</label>
        <input type="text" id="inputUser" class="form-control" style="text-align: center" placeholder="Имя пользователя" required autofocus>

        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" class="form-control" style="text-align: center" placeholder="Пароль" required>

        <div class="checkbox mb-3">
            <label>
              <input id="remember" type="checkbox" value="remember-me"> Запомнить
            </label>
        </div>

        <button id="submitbtn" class="btn btn-lg btn-primary btn-block" type="button">Вход</button>
        <p class="mt-5 mb-3 text-muted">АО Автотранспортное хозяйство</p>
    </form>
  </body>
</html>
