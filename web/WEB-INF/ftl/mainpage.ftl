<!doctype html>
<html lang="ru">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors">
    <meta name="generator" content="Jekyll v4.0.1">
    <title>Jumbotron Template · Bootstrap</title>

    <link rel="canonical" href="https://getbootstrap.com/docs/4.5/examples/jumbotron/">

    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" type="text/css" href="pages/css/bootstrap/bootstrap.min.css"/ >
    <link rel="stylesheet" type="text/css" href="pages/css/site/fonts.css"/ >
    <link rel="stylesheet" type="text/css" href="pages/css/site/style.css"/ >

    <script type="text/javascript" src="pages/js/jq/jquery-3.5.1.min.js"></script>
    <script type="text/javascript" src="pages/js/bootstrap/bootstrap.min.js"></script>
    <script type="text/javascript" src="pages/js/popper/umd/popper.min.js"></script>
    <script type="text/javascript" src="pages/js/icons/all.js"></script>

    <script type="text/javascript" src="pages/js/site/utils.js"></script>
    <script type="text/javascript" src="pages/js/site/checkauth.js"></script>
    <script type="text/javascript" src="pages/js/site/mainpage.js"></script>

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
    <link rel="stylesheet" type="text/css" href="pages/css/site/jumbotron.css">


    <script type="text/javascript" >

      // если не авторизован то сразу переходим на страницу авторизации
      if (!checkauth.module.checkAuth()) {
        window.location.assign("/" + getContextUrl() + "/index");
      }

      $(document).ready(function() {

        console.log("document loaded");


        // заполним инфо
        mainpage.module.getDriverInfo();



        // прицепим событие на кнопки

        // выход
        $("#navexit").on("click", function () {
          console.log("navexit");
          checkauth.module.unAuth();
          window.location.assign("/" + getContextUrl() + "/index");
        });


      });

    </script>



  </head>

  <body>

    <nav class="navbar navbar-expand-md navbar-light bg-light fixed-top">
      <div class="container-fluid">
        <a href="#" class="navbar-brad"><img src="pages/img/logo.png" style="height: 40px"></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <a href="#" class="nav-link">Информация</a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">Путевые листы</a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">Нарушения скоростного режима</a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">Штрафы</a>
            </li>
            <li class="nav-item">
              <a id="navexit" href="#" class="nav-link">Выход</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>


    <main role="main">

      <div class="container">

        <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          <h3>Личный кабинет водителя</h3>
        </div>


        <div class="card-deck mb-3 text-center">

          <div class="card mb-4 shadow-sm">
            <div class="card-header">
              <h4 class="my-0 font-weight-normal">Водитель</h4>
            </div>
            <div class="card-body">
              <h1 id="drivername" class="card-title pricing-card-title">Иванов Иван Иванович</h1>
            </div>
          </div>

          <div id="vehicles" class="card mb-4 shadow-sm">
            <div class="card-header">
              <h4 class="my-0 font-weight-normal">Транспортное средство</h4>
            </div>

            <div class="card-body">
              <h1 class="card-title pricing-card-title">сангйонг</h1>
            </div>


          </div>

        </div>


        <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          <h3>Информация за период с 01.09.2020 по 10.09.2020</h3>
        </div>


        <div class="card-deck mb-3 text-center">

          <div class="card mb-4 shadow-sm">
            <div class="card-header">
              <h4 class="my-0 font-weight-normal">Открытые путевые листы</h4>
            </div>
            <div class="card-body">
              <h1 class="card-title pricing-card-title">2</h1>
              <button type="button" class="btn btn-lg btn-block btn-outline-primary">Просмотр</button>
            </div>
          </div>

          <div class="card mb-4 shadow-sm">
            <div class="card-header">
              <h4 class="my-0 font-weight-normal">Закрытые путевые листы</h4>
            </div>
            <div class="card-body">
              <h1 class="card-title pricing-card-title">2</h1>
              <button type="button" class="btn btn-lg btn-block btn-outline-primary">Просмотр</button>
            </div>
          </div>

          <div class="card mb-4 shadow-sm">
            <div class="card-header">
              <h4 class="my-0 font-weight-normal">Пробег</h4>
            </div>
            <div class="card-body">
              <h1 class="card-title pricing-card-title">150 км</h1>
              <button type="button" class="btn btn-lg btn-block btn-outline-primary">Просмотр</button>
            </div>
          </div>

        </div>

        <div class="card-deck mb-3 text-center">

          <div class="card mb-4 shadow-sm">
            <div class="card-header">
              <h4 class="my-0 font-weight-normal">Расход топлива по нормам</h4>
            </div>
            <div class="card-body">
              <h1 class="card-title pricing-card-title">850 л</h1>
              <button type="button" class="btn btn-lg btn-block btn-outline-primary">Просмотр</button>
            </div>
          </div>

          <div class="card mb-4 shadow-sm">
            <div class="card-header">
              <h4 class="my-0 font-weight-normal">Нарушения скоростного режима</h4>
            </div>
            <div class="card-body">
              <h1 class="card-title pricing-card-title">15</h1>
              <button type="button" class="btn btn-lg btn-block btn-outline-primary">Просмотр</button>
            </div>
          </div>

        </div>


      </div> <!-- /container -->

    </main>

    <footer class="container">
      <p>АО Автотранспортное хозяйство</p>
    </footer>
  </body>
</html>
