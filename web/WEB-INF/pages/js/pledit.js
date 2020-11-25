var pledit = {};

pledit.module = (function () {

	var recCnt = 1; // счетчик записей путевого листа - всегда увеличивается

    // получить новый номер записи путевого листа
    var getNewRecNumber = function() {
    	recCnt++;
    	return recCnt;
    };


    var showMessage = function() {
        console.log("=========== проверка ===========");
        return false;
    };


//    var addRowSetEvent = function() {
    	// прицепить событие добавления к кнопке
//        console.log("=========== проверка ===========");
//        return false;
//    };


    var addRowShowModal = function() {

    	var modalModeObj = $("#modalMode");

    	if (modalModeObj.val() != "addrow") {
	    	$("#modalMode").val("addrow");
	    	$("#modalMessage").html('<h4 class="modal-title">Добавить запись в путевой лист ?</h4>');

	    	$("#modalButton").text("Добавить");

	    	$("#modalButton").off("click");
	    	$("#modalButton").on("click", function() {
				pledit.module.addRow();
	    	});
    	};

    	$("#tweet-modal").modal();
    };


    var deleteRowShowModal = function(btnObj) {

    	var modalModeObj = $("#modalMode");

    	$("#modalMode").val("delrow");
    	$("#modalMessage").html('<h4 class="modal-title">Удалить запись ?</h4>');

    	$("#modalButton").text("Удалить");
    	$("#modalButton").off("click");
    	$("#modalButton").on("click", function() {
			pledit.module.delRow($(btnObj).parent().parent().parent().parent());
    	});

    	//console.log($(btnObj).parent().parent().parent().parent());

    	$("#tweet-modal").modal();
    };


    var addRow = function() {

    	$("#tweet-modal").modal("hide");


    	// добавить блок card с записью пл

    	// нужно получить общее количество записей и добавить новую после последней 
    	var cardsObj = $(".card");

    	if (cardsObj.lehgth == 0) {
    		return false;
    	};


    	var lastCardObj = $(cardsObj[cardsObj.length - 1]); // последний блок
    	var lastCardObjNumber = lastCardObj.find(".recnumber").text(); // номер последнего блока

    	var newCardObjNumber = getNewRecNumber();

    	// получим текст блока
    	var cardHtml = lastCardObj.html();
    	// заменим переменные

    	console.log(lastCardObjNumber);
    	//console.log(lastCardObj);
    	//console.log(cardHtml);


    	cardHtml = cardHtml.replace("beginDate" + lastCardObjNumber, "beginDate" + newCardObjNumber);
    	cardHtml = cardHtml.replace("beginDate" + lastCardObjNumber, "beginDate" + newCardObjNumber);

    	cardHtml = cardHtml.replace("endDate" + lastCardObjNumber, "endDate" + newCardObjNumber);
    	cardHtml = cardHtml.replace("endDate" + lastCardObjNumber, "endDate" + newCardObjNumber);

    	cardHtml = cardHtml.replace("datetimepickerBegin" + lastCardObjNumber, "datetimepickerBegin" + newCardObjNumber);
    	cardHtml = cardHtml.replace("datetimepickerBegin" + lastCardObjNumber, "datetimepickerBegin" + newCardObjNumber);
    	cardHtml = cardHtml.replace("datetimepickerBegin" + lastCardObjNumber, "datetimepickerBegin" + newCardObjNumber);

    	cardHtml = cardHtml.replace("datetimepickerEnd" + lastCardObjNumber, "datetimepickerEnd" + newCardObjNumber);
    	cardHtml = cardHtml.replace("datetimepickerEnd" + lastCardObjNumber, "datetimepickerEnd" + newCardObjNumber);
    	cardHtml = cardHtml.replace("datetimepickerEnd" + lastCardObjNumber, "datetimepickerEnd" + newCardObjNumber);

    	cardHtml = cardHtml.replace("relaxTime" + lastCardObjNumber, "relaxTime" + newCardObjNumber);
		cardHtml = cardHtml.replace("relaxTime" + lastCardObjNumber, "relaxTime" + newCardObjNumber);

    	cardHtml = '<div class="card" style="margin-bottom: 20px">' + cardHtml + '</div>';

    	var newCardObj = $(cardHtml);
    	newCardObj.find(".recnumber").text(newCardObjNumber);
    	// включим кнопку удалить
		newCardObj.find("div.col-sm-2.float-right").css("display", "block");


    	newCardObj.insertAfter(lastCardObj);


		// привяжем события
		$('#datetimepickerBegin' + newCardObjNumber).datetimepicker({
            locale: "ru",
			ignoreReadonly: true
		});

		$('#datetimepickerEnd' + newCardObjNumber).datetimepicker({
            locale: "ru",
            ignoreReadonly: true
        });



        console.log("=========== добавление строки ===========");
        return false;
    };


    var delRow = function(objDel) {
    	$("#tweet-modal").modal("hide");

        objDel.remove();
    	
    };



	return {
        showMessage:showMessage,
        addRowShowModal:addRowShowModal,
        deleteRowShowModal:deleteRowShowModal,
        addRow:addRow,
        delRow:delRow
    };

}());