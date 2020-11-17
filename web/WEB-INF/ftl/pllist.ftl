<!doctype html>
<html lang="ru">
  <head>

    <#-- теги head, общие стили и скрипты js -->
    <#include "/common/head.ftl" parse=false>


    <script type="text/javascript" src="pages/js/bootstrap/moment.js"></script>
    <script type="text/javascript" src="pages/js/bootstrap/tempusdominus-bootstrap-4.min.js"></script>
    <script type="text/javascript" src="pages/js/bootstrap/ru.js"></script>

    <script type="text/javascript" src="pages/js/site/pllist.js"></script>


    <link rel="stylesheet" type="text/css" href="pages/css/bootstrap/tempusdominus-bootstrap-4.min.css"/>

    <link rel="stylesheet" type="text/css" href="pages/css/site/pllist.css"/>


    <#-- проверка авторизации + события для кнопок навбара -->
    <#include "/common/navbar_js.ftl" parse=false>


    <script type="text/javascript" >
	    $(document).ready(function() {

            // дата начала периода
			$('#datetimepickerBegin').datetimepicker({
                    locale: "ru",
                    format: "L"
                });

            // дата окончания периода
			$('#datetimepickerEnd').datetimepicker({
                    locale: "ru",
                    format: "L"
                });

            // дата окончания периода
            $("#pllistrefresh").on("click", function () {
                pllist.module.refreshBtnHandler();
            });

			// установим значения периода
            pllist.module.getPllistPeriod();


            // пагинатор верхний
            $("#pager-top a.page-link").on("click", function (e) {
                e.preventDefault();

                var currentLinkText = $(this).text();
                var pagerLinkObj = $("#pager-top a.page-link");

                pllist.module.pageClickHandler(currentLinkText, pagerLinkObj);
            });

            // пагинатор нижний
            $("#pager-bottom a.page-link").on("click", function (e) {
                e.preventDefault();

                var currentLinkText = $(this).text();
                var pagerLinkObj = $("#pager-bottom a.page-link");

                pllist.module.pageClickHandler(currentLinkText, pagerLinkObj);
            });


            // обновить таблицу
            pllist.module.getPllist();

	    });
	 
    </script>

  </head>

<body>

  <#include "/common/navbar.ftl" parse=false>

  <div id="pagenumber">${page}</div>


<main role="main">


<div class="container">



        <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          <h3>Путевые листы</h3>
        </div>





<form>
    <div class="form-group row">
        <label for="beginDate" class="col-sm-2 col-form-label">Начало периода:</label>

		<div class="col-sm-3 input-group date" id="datetimepickerBegin" data-target-input="nearest">
            <input type="text" class="form-control datetimepicker-input" id="beginDate" data-target="#datetimepickerBegin" data-toggle="datetimepicker" value="${datebeg}">
            <div class="input-group-append" data-target="#datetimepickerBegin" data-toggle="datetimepicker">
                <div class="input-group-text"><i class="fa fa-calendar"></i></div>
            </div>
        </div>

        <label for="endDate" class="col-sm-2 col-form-label">Окончание периода:</label>

        <div class="col-sm-3 input-group date" id="datetimepickerEnd" data-target-input="nearest">
            <input type="text" class="form-control datetimepicker-input" id="endDate" data-target="#datetimepickerEnd" data-toggle="datetimepicker" value="${dateend}">
            <div class="input-group-append" data-target="#datetimepickerEnd" data-toggle="datetimepicker">
                <div class="input-group-text"><i class="fa fa-calendar"></i></div>
            </div>
        </div>


		<div class="checkbox col-sm-2">
    		<label>
                <#assign oopen=onlyopen>
                <#if oopen == "1">
      			<input id="onlyopen" type="checkbox" value="opened" checked> только открытые</input>
                <#else>
                <input id="onlyopen" type="checkbox" value="opened"> только открытые</input>
                </#if>
    		</label>
		</div>           

    </div>

    <div class="form-group row justify-content-center">
        <button id="pllistrefresh" type="button" class="btn btn-primary" sty>Обновить за период</button>
    </div>



</form>





<nav aria-label="Page navigation example">
  <ul id="pager-top" class="pagination justify-content-center">

    <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
        <span class="sr-only">Previous</span>
      </a>
    </li>

    <li class="page-item active"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>

    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
        <span class="sr-only">Next</span>
      </a>
    </li>

  </ul>
</nav>


 <div class="row">


 <table id="pltable" class="table table-hover">
  <thead>
    <tr>
      <th scope="col" style="width: 120px;">№ / Дата</th>
      <th scope="col" style="width: 560px;">Контрагент</th>
      <th scope="col">Маршрут</th>
    </tr>
  </thead>
  <tbody>


    <#--<tr>-->
        <#--<td><span>744400</span><span style="display: none">иденитификатор</span> от<br/>10.09.2020</td>-->
      <#--<td>ККС Мазут</td>-->
      <#--<td>д.Б.Сколотни Слободской р-н</td>-->
    <#--</tr>-->
    <#--<tr>-->
      <#--<td>744401 от <br/>11.09.2020</td>-->
      <#--<td>ЗАО "Кристалл"</td>-->
      <#--<td>Киров - Кирс - Киров</td>-->
    <#--</tr>-->
    <#--<tr>-->
      <#--<td>744402 от <br/>12.09.2020</td>-->
      <#--<td>Филиал КировЭнерго ....</td>-->
      <#--<td>по маршруту (ТЭЦ-4)</td>-->
    <#--</tr>-->

    <#--<tr>-->
      <#--<td>744400 от<br/>10.09.2020</td>-->
      <#--<td>ККС Мазут</td>-->
      <#--<td>д.Б.Сколотни Слободской р-н</td>-->
    <#--</tr>-->
    <#--<tr>-->
      <#--<td>744401 от <br/>11.09.2020</td>-->
      <#--<td>ЗАО "Кристалл"</td>-->
      <#--<td>Киров - Кирс - Киров</td>-->
    <#--</tr>-->
    <#--<tr>-->
      <#--<td>744402 от <br/>12.09.2020</td>-->
      <#--<td>Филиал КировЭнерго ....</td>-->
      <#--<td>по маршруту (ТЭЦ-4)</td>-->
    <#--</tr>-->


  </tbody>
</table>

 </div>




<nav aria-label="Page navigation example">
  <ul id="pager-bottom" class="pagination justify-content-center">
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
        <span class="sr-only">Previous</span>
      </a>
    </li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
        <span class="sr-only">Next</span>
      </a>
    </li>
  </ul>
</nav>




</div><!-- container -->


    </main>

  <#include "/common/footer.ftl" parse=false>
  </body>



</html>
