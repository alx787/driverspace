<!doctype html>
<html lang="ru">
<head>

<#-- теги head, общие стили и скрипты js -->
    <#include "/common/head.ftl" parse=false>


    <script type="text/javascript" src="pages/datetimepicker/moment.js"></script>
    <script type="text/javascript" src="pages/datetimepicker/tempusdominus-bootstrap-4.min.js"></script>
    <script type="text/javascript" src="pages/datetimepicker/ru.js"></script>

    <script type="text/javascript" src="pages/js/pllist.js"></script>


    <link rel="stylesheet" type="text/css" href="pages/datetimepicker/tempusdominus-bootstrap-4.min.css"/>

    <#-- проверка авторизации + события для кнопок навбара -->
    <#include "/common/navbar_js.ftl" parse=false>


    <script type="text/javascript" >
        $(document).ready(function() {
            console.log( "document loaded" );

            $('#datetimepickerBegin').datetimepicker({
                locale: "ru",
                format: "L"
            });

            $('#datetimepickerEnd').datetimepicker({
                locale: "ru",
                format: "L"
            });


        });

    </script>

</head>

<body>


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
                    <input type="text" class="form-control datetimepicker-input" id="beginDate" data-target="#datetimepickerBegin" data-toggle="datetimepicker">
                    <div class="input-group-append" data-target="#datetimepickerBegin" data-toggle="datetimepicker">
                        <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                    </div>
                </div>

                <label for="endDate" class="col-md-1 col-form-label">по:</label>

                <div class="col-md-3 input-group date" id="datetimepickerEnd" data-target-input="nearest">
                    <input type="text" class="form-control datetimepicker-input" id="endDate" data-target="#datetimepickerEnd" data-toggle="datetimepicker">
                    <div class="input-group-append" data-target="#datetimepickerEnd" data-toggle="datetimepicker">
                        <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                    </div>
                </div>


                <label for="vehicle" class="col-md-1 col-form-label">T/C:</label>

                <div class="col-md-3 input-group date">
                    <select class="form-control" id="vehicle">
                        <option value="-"></option>
                    </select>
                </div>



            </div>

            <div class="form-group row justify-content-center">
                <button type="submit" class="btn btn-primary">Обновить</button>
            </div>

        </form>


    </div><!-- container -->


    <div class="container-fluid">
        Тут будет карта с треком, в левом верхнем углу разместить див с пробегом и расходом топлива за период, и период тоже можно и госномер машины тоже можно
    </div>




</main>

  <#include "/common/footer.ftl" parse=false>
</body>



</html>
