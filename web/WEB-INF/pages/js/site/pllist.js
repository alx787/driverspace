var pllist = {};

pllist.module = (function () {

    var echo = function() {
        console.log("hello from pllist");
    }


    return {
        echo:echo
    };

}());