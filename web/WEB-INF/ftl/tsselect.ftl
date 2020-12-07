<!doctype html>
<html lang="ru">
  <head>

  <#-- теги head, общие стили и скрипты js -->
    <#include "/common/head.ftl" parse=false>

      <link rel="stylesheet" type="text/css" href="pages/css/tsselect.css"/>


  <#-- проверка авторизации + события для кнопок навбара -->
    <#include "/common/navbar_js.ftl" parse=false>


      <script type="text/javascript" >
          $(document).ready(function() {



          });

      </script>

  </head>

<body>

<#include "/common/navbar.ftl" parse=false>

<main role="main">


    <div class="container">

        <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <h3>Показать пробег. Выберите машину</h3>
        </div>


        <div class="form-group row align-items-center h-100 text-center row-decor">
            <div class="col-3 themed-grid-col">ГАЗ-33081</div>
            <div class="col-3 themed-grid-col">С513СР 43 RUS</div>
            <div class="col-3 themed-grid-col div-height"></div>
            <div class="col-3 themed-grid-col">150 км</div>
        </div>

        <div class="form-group row align-items-center h-100 text-center row-decor">
            <div class="col-3 themed-grid-col">ГАЗ-33081</div>
            <div class="col-3 themed-grid-col">С513СР 43 RUS</div>
            <div class="col-3 themed-grid-col div-height"></div>
            <div class="col-3 themed-grid-col">150 км</div>
        </div>

        <div class="form-group row align-items-center h-100 text-center">
            <div class="col-3 themed-grid-col">ГАЗ-33081</div>
            <div class="col-3 themed-grid-col">С513СР 43 RUS</div>
            <div class="col-3 themed-grid-col" style="height: 50px"></div>
            <div class="col-3 themed-grid-col">150 км</div>
        </div>

        <div class="form-group row align-items-center h-100 text-center">
            <div class="col-3 themed-grid-col">ГАЗ-33081</div>
            <div class="col-3 themed-grid-col">С513СР 43 RUS</div>
            <div class="col-3 themed-grid-col" style="height: 50px"></div>
            <div class="col-3 themed-grid-col">150 км</div>
        </div>

        <div class="form-group row align-items-center h-100 text-center">
            <div class="col-3 themed-grid-col">ГАЗ-33081</div>
            <div class="col-3 themed-grid-col">С513СР 43 RUS</div>
            <div class="col-3 themed-grid-col" style="height: 50px"></div>
            <div class="col-3 themed-grid-col">150 км</div>
        </div>

    </div><!-- container -->

</main>

  <#include "/common/footer.ftl" parse=false>
</body>

</html>