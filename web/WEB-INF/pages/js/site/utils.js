// функции для общего пользования

function getContextUrl() {
    var pathArr = window.location.pathname.split("/");

    if (pathArr.length > 1) {
        return pathArr[1];
    }

    return "";
}

function formatDate(date, delimeter) {

    var dd = date.getDate();

    if (dd < 10) dd = '0' + dd;

    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    // var yy = date.getFullYear() % 100;
    var yy = date.getFullYear();
    // if (yy < 10) yy = '0' + yy;

    // return dd + '.' + mm + '.' + yy;
    return yy + delimeter + mm + delimeter + dd;
}