<!doctype html>
<html lang="ru">
<head>

    <script type="text/javascript" src="pages/js/jq/jquery-3.5.1.min.js"></script>
    <script type="text/javascript" src="pages/js/site/utils.js"></script>
    <script type="text/javascript" src="pages/js/site/checkauth.js"></script>

    <script type="text/javascript" >

        $(document).ready(function() {
            // деавторизация
            checkauth.module.unAuth();
            // перенаправляем на главную страницу
            window.location.assign("/" + getContextUrl() + "/index");

        });

    </script>

</head>
<body>

</body>
</html>
