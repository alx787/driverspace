<!doctype html>
<html lang="ru">
  <head>

    <#-- теги head, общие стили и скрипты js -->
    <#include "/common/head.ftl" parse=false>


    <link rel="stylesheet" type="text/css" href="pages/css/bootstrap/tempusdominus-bootstrap-4.min.css"/>

    <script type="text/javascript" src="pages/js/bootstrap/moment.js"></script>
    <script type="text/javascript" src="pages/js/bootstrap/tempusdominus-bootstrap-4.min.js"></script>
    <script type="text/javascript" src="pages/js/bootstrap/ru.js"></script>

    <script type="text/javascript" src="pages/js/site/pledit.js"></script>




      <#-- проверка авторизации + события для кнопок навбара -->
      <#include "/common/navbar_js.ftl" parse=false>


    <script type="text/javascript" >
	    $(document).ready(function() {
	        console.log( "document loaded" );

  			$('#datetimepickerBegin1').datetimepicker({
            locale: "ru",
         //  format: "L"
        });

  			$('#datetimepickerEnd1').datetimepicker({
            locale: "ru",
         //   format: "L"
        });

        // уберем видимость кнопки Удалить у первой записи
        $($("div.col-sm-2.float-right")[0]).css("display", "none");
	    });
	 


    </script>

</head>

<body>

<#include "/common/navbar.ftl" parse=false>



<main role="main">


<div class="container">



        <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          <h3>Путевой лист №XXXXX от 01.01.2020</h3>
        </div>





<form>



    <div class="form-group row">
      <label class="col-sm-2 col-form-label" for="driverName">Водитель:</label>
      <div class="col-sm-10 input-group" data-target-input="nearest">
        <input type="text" class="form-control" id="driverName" placeholder="" value="Иванов Иван Иванович" readonly>
      </div>
    </div>

    <div class="form-group row">
      <label class="col-sm-2 col-form-label" for="tsName">Транспортное средство:</label>
      <div class="col-sm-10 input-group" data-target-input="nearest">
        <input type="text" class="form-control" id="tsName" placeholder="" value="">
      </div>
    </div>

    <div class="form-group row">
      <label class="col-sm-2 col-form-label" for="route">Маршрут:</label>
      <div class="col-sm-10 input-group" data-target-input="nearest">
        <input type="text" class="form-control" id="route" placeholder="" value="">
      </div>
    </div>







    <!-- строка с записью путевого листа -->
    <div class="card" style="margin-bottom: 20px">

      <!-- тут хранится номер строки -->
      <div class="recnumber" style="display: none">1</div>


      <div class="card-header">
        <div class="row">
          <div class="col-sm-10 h5">Строка путевого листа</div>
          <div class="col-sm-2 float-right">
            <button type="button" class="btn btn-primary" onclick="pledit.module.deleteRowShowModal(this)">Удалить</button>  
          </div>

        </div>
      

      </div>
      <div class="card-body">


        <div class="form-group row">
            <label for="beginDate1" class="col-sm-2 col-form-label">Время выезда:</label>

        		<div class="col-sm-4 input-group date" id="datetimepickerBegin1" data-target-input="nearest">
                <input type="text" class="form-control datetimepicker-input" id="beginDate1" data-target="#datetimepickerBegin1" data-toggle="datetimepicker">
                <div class="input-group-append" data-target="#datetimepickerBegin1" data-toggle="datetimepicker">
                    <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                </div>
            </div>

            <label for="endDate1" class="col-sm-2 col-form-label">Время возврата:</label>

            <div class="col-sm-4 input-group date" id="datetimepickerEnd1" data-target-input="nearest">
                <input type="text" class="form-control datetimepicker-input" id="endDate1" data-target="#datetimepickerEnd1" data-toggle="datetimepicker">
                <div class="input-group-append" data-target="#datetimepickerEnd1" data-toggle="datetimepicker">
                    <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                </div>
            </div>

        </div>


        <div class="form-group row">

            <div class="col-sm-6">
                <label for="relaxTime1">Обед (время затраченное на отдых)</label>
                <input type="text" class="form-control" id="relaxTime1" placeholder="" value="">
            </div>

        </div>

      </div>
    </div>


    <!-- кнопка добавления новой записи -->
    <div class="form-group row justify-content-center">
        <button type="button" class="btn btn-primary" onclick="pledit.module.addRowShowModal()">Добавить строку</button>
    </div>

    <!--
    <div class="form-group row justify-content-center">
      <button id="tweet" class="btn btn-default pull-right hidden-xs" data-toggle="modal" data-target="#tweet-modal">Tweet</button>
    </div>
    -->

    <div class="form-group row">

        <label for="odometerBegin" class="col-sm-2 col-form-label">Спидометр выезда:</label>
        <div class="col-sm-4 input-group" data-target-input="nearest">
          <input type="text" class="form-control" id="odometerBegin">
        </div>

        <label for="odometerEnd" class="col-sm-2 col-form-label">Спидометр возврата:</label>
        <div class="col-sm-4 input-group" data-target-input="nearest">
          <input type="text" class="form-control" id="odometerEnd">
        </div>

    </div>

    <div class="form-group row">
        <div class="col-sm-6">
            <label for="refuelCnt">Заправка (литры)</label>
            <input type="text" class="form-control" id="refuelCnt" placeholder="" value="">
        </div>

    </div>


    <div class="form-group row justify-content-center">
        <button type="submit" class="btn btn-primary">Сохранить</button>
    </div>



</form>








</div><!-- container -->




    <!-- modals -->
    <div class="modal fade" id="tweet-modal" tabindex="-1" role="dialog">
      <input id="modalMode" type="hidden" value="xxx" />
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div id="modalMessage" class="modal-header">
            <h4 class="modal-title">xxx</h4>
          </div>
          <div class="modal-title"></div>
          <div class="modal-footer">
            <!--
            <span class="char-count pull-left" data-max="140">140</span>
            -->
            <button id="modalButton" type="button" class="btn btn-primary">
              xxx
            </button>
            <button type="button" class="btn btn-default" data-dismiss="modal">
              Отмена
            </button>
          </div>
        </div>
      </div>
    </div>





    </main>

    <#-- проверка авторизации + события для кнопок навбара -->
    <#include "/common/footer.ftl" parse=false>

  </body>



</html>
