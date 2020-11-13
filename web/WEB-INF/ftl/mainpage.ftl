<!doctype html>
<html lang="ru">
  <head>

    <#-- теги head, общие стили и скрипты js -->
    <#include "/common/head.ftl" parse=false>


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


    <#-- проверка авторизации + события для кнопок навбара -->
    <#include "/common/navbar_js.ftl" parse=false>


    <script type="text/javascript" >

      $(document).ready(function() {

        // заполним инфо
        mainpage.module.getDateInfo();
        mainpage.module.getDriverInfo();

        // события кнопок
        $("#gotoPllistBtn").on("click", function () {
          mainpage.module.gotoPllist();
        })

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

    <#-- разметка навбара -->
    <#include "/common/navbar.ftl" parse=false>

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
          <h3>Информация за период с <span id="datebeg">01.09.2020</span> по <span id="dateend">10.09.2020</span></h3>
        </div>


        <div class="card-deck mb-3 text-center">

          <div class="card mb-4 shadow-sm">
            <div class="card-header">
              <h4 class="my-0 font-weight-normal">Путевые листы</h4>
            </div>
            <div class="card-body">
              <h1 id="plcnt" class="card-title pricing-card-title">2</h1>
              <button id="gotoPllistBtn" type="button" class="btn btn-lg btn-block btn-outline-primary">Просмотр</button>
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

    <#-- разметка футера -->
    <#include "/common/navbar.ftl" parse=false>

  </body>
</html>
