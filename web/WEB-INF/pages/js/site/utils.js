function getContextUrl() {
    var pathArr = window.location.pathname.split("/");

    if (pathArr.length > 1) {
        return pathArr[1];
    }

    return "";
}

