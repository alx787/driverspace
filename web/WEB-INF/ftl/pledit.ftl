<!doctype html>
<html lang="ru">
  <head>

    <#-- теги head, общие стили и скрипты js -->
    <#include "/common/head.ftl" parse=false>


    <link rel="stylesheet" type="text/css" href="pages/datetimepicker/tempusdominus-bootstrap-4.min.css"/>
    <link rel="stylesheet" type="text/css" href="pages/css/pledit.css"/>

    <script type="text/javascript" src="pages/datetimepicker/moment.js"></script>
    <script type="text/javascript" src="pages/datetimepicker/tempusdominus-bootstrap-4.min.js"></script>
    <script type="text/javascript" src="pages/datetimepicker/ru.js"></script>


    <script type="text/javascript" src="pages/js/pledit.js"></script>
    <script type="text/javascript" src="pages/js/pledits.js"></script>


    <#-- проверка авторизации + события для кнопок навбара -->
    <#include "/common/navbar_js.ftl" parse=false>


    <script type="text/javascript" >
	    $(document).ready(function() {
	        console.log( "document loaded" );

            // дата время в шапке путевого листа
            $('#datetimepickerBegin').datetimepicker({
                locale: "ru",
                //  format: "L",
                ignoreReadonly: true
            });

            $('#datetimepickerEnd').datetimepicker({
                locale: "ru",
                //   format: "L"
                ignoreReadonly: true
            });


            // получим значения из строки url
            pledits.module.getSearchParameters();

            /////////////////////////////////////////////////////
            pledits.module.getPldata();

            // приделаем событие нажатия на окно предупреждения
            $("#alertPopup").on("click", function () {
                $(this).fadeOut("slow");
            });

        });

    </script>

</head>

<body>

<#include "/common/navbar.ftl" parse=false>



<main role="main">


    <div class="container">

        <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          <h3>Путевой лист № <span id="plnum">${numpl}</span> от <span id="pldate">XX.XX.XXXX</span></h3>
          <h3 id="plclosed"></h3>
        </div>

    <form>



    <!-- ===================================================== -->
    <!-- данные шапки документа -->
    <div class="form-group row">
      <label class="col-sm-2 col-form-label" for="driverName">Водитель:</label>
      <div class="col-sm-10 input-group" data-target-input="nearest">
        <input type="text" class="form-control" id="driverName" placeholder="" value="" readonly>
      </div>
    </div>

    <div class="form-group row">
      <label class="col-sm-2 col-form-label" for="tsName">Транспортное средство:</label>
      <div class="col-sm-10 input-group" data-target-input="nearest">
        <input type="text" class="form-control" id="tsName" placeholder="" value="" readonly>
      </div>
    </div>

    <div class="form-group row">
      <label class="col-sm-2 col-form-label" for="route">Маршрут:</label>
      <div class="col-sm-10 input-group" data-target-input="nearest">
        <input type="text" class="form-control" id="route" placeholder="" value="" readonly>
      </div>
    </div>


    <div class="form-group row">
        <label for="beginDate" class="col-sm-2 col-form-label">Время выезда:</label>

        <div class="col-sm-4 input-group date" id="datetimepickerBegin" data-target-input="nearest">
            <input type="text" class="form-control datetimepicker-input" id="beginDate" data-target="#datetimepickerBegin" data-toggle="datetimepicker" value="${datebeg}" readonly="readonly" style="background-color: #FFFFFF;">
            <div class="input-group-append" data-target="#datetimepickerBegin" data-toggle="datetimepicker">
                <div class="input-group-text"><i class="fa fa-calendar"></i></div>
            </div>
        </div>

        <label for="endDate" class="col-sm-2 col-form-label">Время возврата:</label>

        <div class="col-sm-4 input-group date" id="datetimepickerEnd" data-target-input="nearest">
            <input type="text" class="form-control datetimepicker-input" id="endDate" data-target="#datetimepickerEnd" data-toggle="datetimepicker" value="${dateend}" readonly="readonly" style="background-color: #FFFFFF;">
            <div class="input-group-append" data-target="#datetimepickerEnd" data-toggle="datetimepicker">
                <div class="input-group-text"><i class="fa fa-calendar"></i></div>
            </div>
        </div>
    </div>


    <div class="form-group row">
        <div class="col-sm-6">
            <label for="relaxTime">Обед (время затраченное на отдых)</label>
            <input type="text" class="form-control" id="relaxTime" placeholder="" value="">
        </div>
    </div>


    <div class="form-group row">

        <label for="speedometerBegin" class="col-sm-2 col-form-label">Спидометр выезда:</label>
        <div class="col-sm-4 input-group" data-target-input="nearest">
            <input type="text" class="form-control" id="speedometerBegin">
        </div>

        <label for="speedometerEnd" class="col-sm-2 col-form-label">Спидометр возврата:</label>
        <div class="col-sm-4 input-group" data-target-input="nearest">
            <input type="text" class="form-control" id="speedometerEnd">
        </div>

    </div>

    <div class="form-group row">
        <div class="col-sm-6">

            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Топливо (основное)</h5>

                    <div class="form-group row">
                        <label class="col-md-3" for="fuelType">Топливо:</label>
                        <div class="col-md-9">
                            <select class="form-control" id="fuelType">
                                <option></option>
                                <option>А76</option>
                                <option>А80</option>
                                <option>АИ92</option>
                                <option>АИ95</option>
                                <option>АИ98</option>
                                <option>ДТ</option>
                                <option>ГАЗ</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="fuelCard" class="col-md-3 col-form-label">Т/К:</label>
                        <div class="col-md-9 input-group" data-target-input="nearest">
                            <input type="text" class="form-control" id="fuelCard">
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="refuelCnt" class="col-md-3 col-form-label">По чекам (л):</label>
                        <div class="col-md-3 input-group" data-target-input="nearest">
                            <input type="text" class="form-control" id="refuelCnt">
                        </div>

                        <label for="refuelOutside" class="col-md-3 col-form-label">Сторон (л):</label>
                        <div class="col-md-3 input-group" data-target-input="nearest">
                            <input type="text" class="form-control" id="refuelOutside">
                        </div>

                    </div>

                    <div class="form-group row">
                        <label for="refuelIssued" class="col-md-3 col-form-label">Выдано (л):</label>
                        <div class="col-md-3 input-group" data-target-input="nearest">
                            <input type="text" class="form-control" id="refuelIssued">
                        </div>
                    </div>

                </div>
            </div>

        </div>

        <div class="col-sm-6">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Топливо (дополнительно)</h5>

                    <div class="form-group row">
                        <label class="col-md-3" for="fuelType2">Топливо:</label>
                        <div class="col-md-9">
                            <select class="form-control" id="fuelType2">
                                <option></option>
                                <option>А76</option>
                                <option>А80</option>
                                <option>АИ92</option>
                                <option>АИ95</option>
                                <option>АИ98</option>
                                <option>ДТ</option>
                                <option>ГАЗ</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="fuelCard2" class="col-md-3 col-form-label">Т/К:</label>
                        <div class="col-md-9 input-group" data-target-input="nearest">
                            <input type="text" class="form-control" id="fuelCard2">
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="refuelCnt2" class="col-md-3 col-form-label">По чекам (л):</label>
                        <div class="col-md-3 input-group" data-target-input="nearest">
                            <input type="text" class="form-control" id="refuelCnt2">
                        </div>

                        <label for="refuelIssued2" class="col-md-3 col-form-label">Выдано (л):</label>
                        <div class="col-md-3 input-group" data-target-input="nearest">
                            <input type="text" class="form-control" id="refuelIssued2">
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>

    <!-- ===================================================== -->
    <!-- строка с записью путевого листа НАЧАЛО -->
    <div class="card hidden-card" style="margin-bottom: 20px">

        <!-- тут хранится номер строки -->
        <div class="recnumber" style="display: none">__rownum__</div>

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
                <label for="rowBeginDate_" class="col-sm-2 col-form-label">Время выезда:</label>

                <div class="col-sm-4 input-group date" id="rowDatePickerBegin_" data-target-input="nearest">
                    <input type="text" class="form-control datetimepicker-input" id="rowBeginDate_" data-target="#rowDatePickerBegin_" data-toggle="datetimepicker" readonly="readonly" style="background-color: #FFFFFF;">
                    <div class="input-group-append" data-target="#rowDatePickerBegin_" data-toggle="datetimepicker">
                        <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                    </div>
                </div>

                <label for="rowEndDate_" class="col-sm-2 col-form-label">Время возврата:</label>

                <div class="col-sm-4 input-group date" id="rowDatePickerEnd_" data-target-input="nearest">
                    <input type="text" class="form-control datetimepicker-input" id="rowEndDate_" data-target="#rowDatePickerEnd_" data-toggle="datetimepicker" readonly="readonly" style="background-color: #FFFFFF;">
                    <div class="input-group-append" data-target="#rowDatePickerEnd_" data-toggle="datetimepicker">
                        <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                    </div>
                </div>

            </div>


            <div class="form-group row">

                <div class="col-sm-6">
                    <label for="rowRelaxTime_">Обед (время затраченное на отдых)</label>
                    <input type="text" class="form-control" id="rowRelaxTime_" placeholder="" value="">
                </div>

            </div>

        </div>
    </div>
    <!-- строка с записью путевого листа КОНЕЦ -->
    <!-- ===================================================== -->


    <!-- ===================================================== -->
    <!-- здесь точка отсчета, отсюда будут добавляться строки путевого листа -->







    <!-- кнопка добавления новой записи -->
    <div class="form-group row justify-content-center">
        <button id="addRowToPl" type="button" class="btn btn-primary" onclick="pledit.module.addRowShowModal()">Добавить строку путевого листа</button>
    </div>

    <!--
    <div class="form-group row justify-content-center">
      <button id="tweet" class="btn btn-default pull-right hidden-xs" data-toggle="modal" data-target="#tweet-modal">Tweet</button>
    </div>
    -->




    <div class="form-group row justify-content-center group-marg">

        <div class="col-sm-6 col-md-3 button-marg">
            <button type="button" class="btn btn-secondary" onclick="pledits.module.exitWithoutSave()">Выход</button>
        </div>

        <div class="col-sm-6 col-md-3 button-marg">
            <button id="exitwithsave" type="button" class="btn btn-primary" onclick="pledits.module.exitWithSave()">Сохранить</button>
        </div>

        <div class="col-sm-6 col-md-3 button-marg">
            <button id="exitwithsavesend" type="button" class="btn btn-danger" onclick="pledits.module.exitWithSaveSend()">Отправить диспетчеру</button>
        </div>


    </div>



</form>


</div><!-- container -->


    <div id="alertPopup" class="alert alert-danger" role="alert">
        Текст предупреждения или ошибки
    </div>

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


    <!-- Modal -->
    <div class="modal fade" id="loader-spin" tabindex="-1" role="dialog" aria-labelledby="loadMeLabel">
        <div class="modal-dialog modal-sm" role="document">
            <div class="modal-content">
                <div class="modal-body text-center">
                    <div class="loader"></div>
                </div>
            </div>
        </div>
    </div>




    </main>

    <#-- футер -->
    <#include "/common/footer.ftl" parse=false>

  </body>



</html>
