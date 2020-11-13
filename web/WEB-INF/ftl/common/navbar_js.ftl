
<script type="text/javascript" >

    // скрипты js которые выполняются почти на всех страницах

    $(document).ready(function() {

        // если не авторизован то сразу переходим на страницу авторизации
        if (!checkauth.module.checkAuth()) {
            window.location.assign("/" + getContextUrl() + "/index");
        }


        console.log("document loaded 3");


        // здесь назначаются события кнопкам навигационной панели
        // прицепим событие на кнопки

        // информация
        // $("#navinfo").on("click", function () {
        //     window.location.assign("/" + getContextUrl() + "/mainpage");
        // });
        //
        // // путевые листы
        // $("#navpllist").on("click", function () {
        //     window.location.assign("/" + getContextUrl() + "/pllist");
        // });

        // // выход
        // $("#navexit").on("click", function () {
        //     console.log("navexit");
        //     checkauth.module.unAuth();
        //     window.location.assign("/" + getContextUrl() + "/index");
        // });


    });


</script>