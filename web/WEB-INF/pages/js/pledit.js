var pledit = {};

pledit.module = (function () {

	var recCnt = 0; // счетчик записей путевого листа - всегда увеличивается

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

    	// получим блок с шаблоном возьмем его текст
    	var cardHtml = $(".card.hidden-card").html();

        // получим номер блока
    	var newCardObjNumber = getNewRecNumber();

    	// проведем замены текста в блоке
        cardHtml = cardHtml.replace("__rownum__", newCardObjNumber);

        cardHtml = cardHtml.replace("rowBeginDate_", "rowBeginDate" + newCardObjNumber);
        cardHtml = cardHtml.replace("rowBeginDate_", "rowBeginDate" + newCardObjNumber);

        cardHtml = cardHtml.replace("rowEndDate_", "rowEndDate" + newCardObjNumber);
        cardHtml = cardHtml.replace("rowEndDate_", "rowEndDate" + newCardObjNumber);

        cardHtml = cardHtml.replace("rowDatePickerBegin_", "rowDatePickerBegin" + newCardObjNumber);
        cardHtml = cardHtml.replace("rowDatePickerBegin_", "rowDatePickerBegin" + newCardObjNumber);
        cardHtml = cardHtml.replace("rowDatePickerBegin_", "rowDatePickerBegin" + newCardObjNumber);

        cardHtml = cardHtml.replace("rowDatePickerEnd_", "rowDatePickerEnd" + newCardObjNumber);
        cardHtml = cardHtml.replace("rowDatePickerEnd_", "rowDatePickerEnd" + newCardObjNumber);
        cardHtml = cardHtml.replace("rowDatePickerEnd_", "rowDatePickerEnd" + newCardObjNumber);

        cardHtml = cardHtml.replace("rowRelaxTime_", "rowRelaxTime" + newCardObjNumber);
        cardHtml = cardHtml.replace("rowRelaxTime_", "rowRelaxTime" + newCardObjNumber);

        cardHtml = '<div class="card" style="margin-bottom: 20px">' + cardHtml + '</div>';

        // получим общее количество записей вместе с шаблоном
        var cardsObj = $(".card");

        if (cardsObj.lehgth == 0) {
        	return false;
        };

    	var lastCardObj = $(cardsObj[cardsObj.length - 1]); // последний блок


    	var newCardObj = $(cardHtml);
    	newCardObj.insertAfter(lastCardObj);

		// привяжем события
		$('#rowDatePickerBegin' + newCardObjNumber).datetimepicker({
            locale: "ru",
			ignoreReadonly: true
		});

		$('#rowDatePickerEnd' + newCardObjNumber).datetimepicker({
            locale: "ru",
            ignoreReadonly: true
        });

        // console.log("=========== добавление строки ===========");
        return true;
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