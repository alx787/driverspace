<!doctype html>
<html lang="ru">
  <head>

    <#-- теги head, общие стили и скрипты js -->
    <#include "/common/head.ftl" parse=false>

    <link rel="stylesheet" type="text/css" href="pages/css/mainpage.css"/>

    <script type="text/javascript" src="pages/js/mainpage.js"></script>



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
        // просмотр пл
        $("#gotoPllistBtn").on("click", function () {
          mainpage.module.gotoPllist();
        })

        // просмотр пробегов
        $("#gotoPlprobegBtn").on("click", function () {
          mainpage.module.gotoPlprobeg();
        })

        // просмотр поездок с расходом топлива
        $("#gotoPlfuelrateBtn").on("click", function () {
            mainpage.module.gotoPlfuelrate();
        })

        // просмотр превышений скорости
        $("#gotoPlspeedingBtn").on("click", function () {
          mainpage.module.gotoPlspeeding();
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

    <#--<div id="invnoms" style="display: none"></div>-->

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
              <div id="drivernamespinner" class="spinner-border m-5"></div>
              <h1 id="drivername" class="card-title pricing-card-title displaynone">Иванов Иван Иванович</h1>
            </div>
          </div>

          <div id="vehicles" class="card mb-4 shadow-sm">
            <div class="card-header">
              <h4 class="my-0 font-weight-normal">Транспортное средство</h4>
            </div>

            <div class="card-body">
              <div class="spinner-border m-5"></div>
              <#--<h1 class="card-title pricing-card-title">сангйонг</h1>-->
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
              <div id="plcntspinner" class="spinner-border m-5"></div>
              <div id="plcnt" class="displaynone"></div>
              <button id="gotoPllistBtn" type="button" class="btn btn-lg btn-block btn-outline-primary displaynone">Просмотр</button>
            </div>
          </div>

          <div class="card mb-4 shadow-sm">
            <div class="card-header">
              <h4 class="my-0 font-weight-normal">Пробег</h4>
            </div>
            <div class="card-body">
              <div id="plprobegspinner" class="spinner-border m-5"></div>
                <div id="plprobeg" class="displaynone">
                    <#--<h5 class="card-title pricing-card-title displaynone">150 км</h5>-->
                    <#--<h5 class="card-title pricing-card-title displaynone">150 км</h5>-->
                </div>
              <button id="gotoPlprobegBtn" type="button" class="btn btn-lg btn-block btn-outline-primary displaynone">Просмотр</button>
            </div>
          </div>

        </div>

        <div class="card-deck mb-3 text-center">

          <div class="card mb-4 shadow-sm">
            <div class="card-header">
              <h4 class="my-0 font-weight-normal">Расход топлива по нормам</h4>
            </div>
            <div class="card-body">
              <div id="plfuelratespinner" class="spinner-border m-5"></div>
              <div id="plfuelrate" class="displaynone">
                <#--<h5 class="card-title pricing-card-title displaynone">850 л</h5>-->
                <#--<h5 class="card-title pricing-card-title displaynone">850 л</h5>-->
              </div>

              <button id="gotoPlfuelrateBtn" type="button" class="btn btn-lg btn-block btn-outline-primary displaynone">Просмотр</button>
            </div>
          </div>

          <div class="card mb-4 shadow-sm">
            <div class="card-header">
              <h4 class="my-0 font-weight-normal">Нарушения скоростного режима</h4>
            </div>
            <div class="card-body">
              <div id="plspeedingspinner" class="spinner-border m-5"></div>
              <div id="plspeeding" class="displaynone">
                <#--<h5 class="card-title pricing-card-title displaynone">850 л</h5>-->
                <#--<h5 class="card-title pricing-card-title displaynone">850 л</h5>-->
              </div>

              <button id="gotoPlspeedingBtn" type="button" class="btn btn-lg btn-block btn-outline-primary displaynone">Просмотр</button>
            </div>
          </div>

        </div>


      </div> <!-- /container -->

    </main>

    <#-- разметка футера -->
    <#include "/common/footer.ftl" parse=false>

  </body>
</html>
