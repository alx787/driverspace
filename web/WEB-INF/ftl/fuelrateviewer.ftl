<!doctype html>
<html lang="ru">
<head>

<#-- теги head, общие стили и скрипты js -->
    <#include "/common/head.ftl" parse=false>


    <script type="text/javascript" src="pages/datetimepicker/moment.js"></script>
    <script type="text/javascript" src="pages/datetimepicker/tempusdominus-bootstrap-4.min.js"></script>
    <script type="text/javascript" src="pages/datetimepicker/ru.js"></script>


    <script type="text/javascript" src="pages/js/fuelrateviewer.js"></script>

    <link rel="stylesheet" type="text/css" href="pages/datetimepicker/tempusdominus-bootstrap-4.min.css"/>
    <link rel="stylesheet" type="text/css" href="pages/css/fuelrateviewer.css"/>

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

                if (fuelrateviewer.module.getBlockButtons()) {
                    return false;
                }

                fuelrateviewer.module.setBlockButtons(true);
                fuelrateviewer.module.addSpinnerToButton(this);

                fuelrateviewer.module.fillTracks();
            });

            // инициализация
            fuelrateviewer.module.initializ();

            // запуск fillTracks() будет внутри initializ();
            // fuelrateviewer.module.fillTracks();


        });

    </script>

</head>

<body">


  <#include "/common/navbar.ftl" parse=false>


<main role="main">

    <#include "/common/notifications.ftl" parse=false>

    <div class="container">

        <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <h3>Расходы топлива</h3>
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


    <div>

        <table id="tracktable" class="table table-hover">
            <thead>
            <tr>
                <th scope="col">Период</th>
                <th scope="col">Место</th>
                <th scope="col">Расход</th>
            </tr>
            </thead>
            <tbody>
                <#--<tr>-->
                    <#--<td>10.12.2020-09:44:36<br/>10.12.2020-11:00:03</td>-->
                    <#--<td>Первомайский, Кировская обл.<br/>Первомайский, Кировская обл.</td>-->
                    <#--<td>2.07 l</td>-->
                <#--</tr>-->

                <#--нужно будет продумать переход по нажатию на поездку, -->
                <#--чтобы отобразить поездку на карте на странице trackviewer-->

            </tbody>
        </table>
    </div>




</main>

  <#include "/common/footer.ftl" parse=false>
</body>



</html>
