<!doctype html>
<html lang="ru">
<head>

<#-- теги head, общие стили и скрипты js -->
    <#include "/common/head.ftl" parse=false>


    <script type="text/javascript" src="pages/datetimepicker/moment.js"></script>
    <script type="text/javascript" src="pages/datetimepicker/tempusdominus-bootstrap-4.min.js"></script>
    <script type="text/javascript" src="pages/datetimepicker/ru.js"></script>


    <script src="http://www.openlayers.org/api/OpenLayers.js"></script>


    <script type="text/javascript" src="pages/js/trackviewer.js"></script>
    <script type="text/javascript" src="pages/js/trackviewerosm.js"></script>


    <link rel="stylesheet" type="text/css" href="pages/datetimepicker/tempusdominus-bootstrap-4.min.css"/>

    <#-- проверка авторизации + события для кнопок навбара -->
    <#include "/common/navbar_js.ftl" parse=false>


    <script type="text/javascript" >
        $(document).ready(function() {
            console.log( "document loaded" );

            $('#datetimepickerBegin').datetimepicker({
                locale: "ru",
                format: 'DD.MM.YYYY-HH:mm',
                ignoreReadonly: true
            });

            $('#datetimepickerEnd').datetimepicker({
                locale: "ru",
                format: 'DD.MM.YYYY-HH:mm',
                ignoreReadonly: true
            });

            $("#refreshmars").on("click", function (e) {
                e.preventDefault();
                trackviewer.module.drawroute();
            });

            // инициализация
            trackviewer.module.initializ();


        });

    </script>

</head>

<body onload="trackviewerosm.module.initMap()">


  <#include "/common/navbar.ftl" parse=false>


<main role="main">


    <div class="container">

        <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <h3>Показать пробег</h3>
        </div>

        <form>
            <div class="form-group row">
                <label for="beginDate" class="col-md-1 col-form-label">Период:</label>

                <div class="col-md-3 input-group date" id="datetimepickerBegin" data-target-input="nearest">
                    <input type="text" class="form-control datetimepicker-input" id="beginDate" data-target="#datetimepickerBegin" data-toggle="datetimepicker" readonly="readonly" style="background-color: #FFFFFF;">
                    <div class="input-group-append" data-target="#datetimepickerBegin" data-toggle="datetimepicker">
                        <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                    </div>
                </div>

                <label for="endDate" class="col-md-1 col-form-label">по:</label>

                <div class="col-md-3 input-group date" id="datetimepickerEnd" data-target-input="nearest">
                    <input type="text" class="form-control datetimepicker-input" id="endDate" data-target="#datetimepickerEnd" data-toggle="datetimepicker" readonly="readonly" style="background-color: #FFFFFF;">
                    <div class="input-group-append" data-target="#datetimepickerEnd" data-toggle="datetimepicker">
                        <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                    </div>
                </div>


                <label for="vehicle" class="col-md-1 col-form-label">T/C:</label>

                <div class="col-md-3 input-group date">
                    <select class="form-control" id="vehicle">

                    </select>
                </div>



            </div>

            <div class="form-group row justify-content-end">
                <div style="padding-left: 15px; padding-right: 15px">
                    <button id="refreshmars" type="submit" class="btn btn-primary">Обновить</button>
                </div>
            </div>

        </form>


    </div><!-- container -->


    <div id="OSMap" class="container-fluid" style="height: 500px">
        <#--Тут будет карта с треком, в левом верхнем углу разместить див с пробегом и расходом топлива за период, и период тоже можно и госномер машины тоже можно-->
    </div>




</main>

  <#include "/common/footer.ftl" parse=false>
</body>



</html>
