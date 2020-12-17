<!doctype html>
<html lang="ru">
  <head>

  <#-- теги head, общие стили и скрипты js -->
    <#include "/common/head.ftl" parse=false>

      <link rel="stylesheet" type="text/css" href="pages/css/tsselect.css"/>

      <script type="text/javascript" src="pages/js/tsselect.js"></script>


  <#-- проверка авторизации + события для кнопок навбара -->
    <#include "/common/navbar_js.ftl" parse=false>


      <script type="text/javascript" >
          $(document).ready(function() {

              tsselect.module.fillVehicles();

          });

      </script>

  </head>

<body>

<#include "/common/navbar.ftl" parse=false>

<main role="main">

    <div id="mode" style="display: none">${mode}</div>

    <div id="invnom-template" style="display: none">
        <div class="form-group row align-items-center h-100 text-center row-decor">
            <div class="col-1 themed-grid-col div-height"><span style="display: none">__invnom__</div>
            <div class="col-5 themed-grid-col">__model__</div>
            <div class="col-5 themed-grid-col">__regnomer__</div>
            <div class="col-1 themed-grid-col div-height"></div>
        </div>
    </div>



    <div class="container">

        <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <#if mode == "track">
            <h3>Показать пробег. Выберите машину</h3>
            <#elseif mode == "fuelrate">
            <h3>Показать расход топлива. Выберите машину</h3>
            <#else >
            <h3>Показать превышения скорости. Выберите машину</h3>
            </#if>
        </div>


        <#--<div class="form-group row align-items-center h-100 text-center row-decor">-->
            <#--<div class="col-1 themed-grid-col div-height"></div>-->
            <#--<div class="col-5 themed-grid-col">ГАЗ-33081</div>-->
            <#--<div class="col-5 themed-grid-col">С513СР 43 RUS</div>-->
            <#--<div class="col-1 themed-grid-col div-height"></div>-->
        <#--</div>-->

        <#--<div class="form-group row align-items-center h-100 text-center row-decor">-->
            <#--<div class="col-1 themed-grid-col div-height"></div>-->
            <#--<div class="col-5 themed-grid-col">ГАЗ-33081</div>-->
            <#--<div class="col-5 themed-grid-col">С513СР 43 RUS</div>-->
            <#--<div class="col-1 themed-grid-col div-height"></div>-->
        <#--</div>-->


    </div><!-- container -->

</main>

  <#include "/common/footer.ftl" parse=false>
</body>

</html>