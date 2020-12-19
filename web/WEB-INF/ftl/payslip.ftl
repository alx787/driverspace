<!doctype html>
<html lang="ru">
<head>

    <#-- теги head, общие стили и скрипты js -->
    <#include "/common/head.ftl" parse=false>


    <link rel="stylesheet" type="text/css" href="pages/datetimepicker/tempusdominus-bootstrap-4.min.css"/>
    <#--<link rel="stylesheet" type="text/css" href="pages/css/payslip.css"/>-->


    <script type="text/javascript" src="pages/datetimepicker/moment.js"></script>
    <script type="text/javascript" src="pages/datetimepicker/tempusdominus-bootstrap-4.min.js"></script>
    <script type="text/javascript" src="pages/datetimepicker/ru.js"></script>

    <script type="text/javascript" src="pages/js/payslip.js"></script>


    <#-- проверка авторизации + события для кнопок навбара -->
    <#include "/common/navbar_js.ftl" parse=false>


    <script type="text/javascript" >
        $(document).ready(function() {
            console.log( "document loaded" );

            $('#datetimepickerBegin').datetimepicker({
                locale: "ru",
                format: "MMMM yyyy",
//                    format: "L"
                viewMode: "years",
                minViewMode: "months",
                ignoreReadonly: true
            });



        });

    </script>

</head>

<body>

<#include "/common/navbar.ftl" parse=false>

<main role="main">


    <div class="container">



        <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <h3>Расчетный листок</h3>
        </div>






        <div class="row">



            <div class="col-sm-6 order-sm-2">


                <div class="form-group row">
                    <label for="beginDate" class="col-12 col-form-label">Период:</label>
                </div>


                <div class="form-group row">

                    <div class="col-9 input-group date" id="datetimepickerBegin" data-target-input="nearest">
                        <input type="text" class="form-control datetimepicker-input" id="beginDate" data-target="#datetimepickerBegin" data-toggle="datetimepicker" readonly="readonly" style="background-color: #FFFFFF;">
                        <div class="input-group-append" data-target="#datetimepickerBegin" data-toggle="datetimepicker">
                            <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                        </div>
                    </div>

                    <div class="col-3 input-group justify-content-end">
                        <button type="submit" class="btn btn-primary">Обновить</button>
                    </div>
                </div>
            </div>

            <!--
                    <div class="col-sm-6 order-sm-1">
                        <h2>Иванов Иван Иванович</h2>
                        <h5>Водитель автомобиля</h5>
                        <h5>Нижегородская а/к</h5>
                    </div>
            -->

            <div class="col-sm-6 order-sm-1">

                <div class="card-body">
                    <h2 class="card-title pricing-card-title">Иванов Иван Иванович</h2>
                    <ul class="list-unstyled mt-3 mb-4">
                        <li>Водитель автомобиля</li>
                        <li>Нижегородская а/к</li>
                    </ul>

                </div>
            </div>


        </div>


        <div class="row">


            <div class="col-12">

                <h4 class="d-flex justify-content-between align-items-center">
                    <span class="text-muted">Начисления</span>
                    <span class="badge badge-secondary badge-pill"></span>
                </h4>

                <ul class="list-group mb-3">
                    <li class="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                            <h6 class="my-0">Оклад</h6>
                            <small class="text-muted">Brief description</small>
                        </div>
                        <span class="text-muted">10000.00</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                            <h6 class="my-0">Районный коэффициент</h6>
                            <small class="text-muted">Brief description</small>
                        </div>
                        <span class="text-muted">1500.00</span>
                    </li>

                    <li class="list-group-item d-flex justify-content-between">
                        <span>Итого</span>
                        <strong>$20</strong>
                    </li>
                </ul>


                <h4 class="d-flex justify-content-between align-items-center">
                    <span class="text-muted">Удержания</span>
                    <span class="badge badge-secondary badge-pill"></span>
                </h4>

                <ul class="list-group mb-3">
                    <li class="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                            <h6 class="my-0">НДФЛ</h6>
                            <small class="text-muted">Brief description</small>
                        </div>
                        <span class="text-muted">100.00</span>
                    </li>

                    <li class="list-group-item d-flex justify-content-between">
                        <span>Итого</span>
                        <strong>$20</strong>
                    </li>
                </ul>

            </div>


        </div>







    </div><!-- container -->


</main>

<#-- футер -->
<#include "/common/footer.ftl" parse=false>

</body>



</html>
