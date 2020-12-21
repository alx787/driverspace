var notifications = {};

notifications.module = (function () {

    // var echo = function () {
    //     console.log("hello from notify")
    // }


    var showNotification = function (header, body, delay) {

        // data-delay="10000"
        // data-autohide="false"

        var notifyBegin = "<div class=\"toast-template fade show\" role=\"alert\" aria-live=\"assertive\" aria-atomic=\"true\" __delay__ style=\"width: 300px;\">";
        var notifyEnd = "</div>";
        var notifyText = $(".toast-template").html();

        if (delay == 0) {
            notifyBegin = notifyBegin.replace("__delay__", "data-autohide=\"false\"");
        } else {
            var delayms = delay * 1000;
            notifyBegin = notifyBegin.replace("__delay__", "data-delay=\"" + delayms + "\"");
        }

        notifyText = notifyText.replace("__header__", header);
        notifyText = notifyText.replace("__body__", body);

        var notifyObj = $(notifyBegin + notifyText + notifyEnd);

        $("#notification-container").append(notifyObj);
        notifyObj.removeClass("toast-template");
        notifyObj.addClass("toast");

        notifyObj.toast("show");
    }



    return {
        showNotification:showNotification
    }


}());