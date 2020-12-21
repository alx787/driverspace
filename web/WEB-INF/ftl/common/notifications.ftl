
<!-- push notification -->
<div aria-live="polite" aria-atomic="true" style="position: fixed; top: 70px; right: 5px; min-height: 100px; width: 300px; z-index: 100">
    <!-- Position it -->
    <div id="notification-container" style="position: absolute; top: 0; right: 0;">

        <!-- Then put toasts within -->
        <!--<div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="10000" style="width: 300px;">-->
        <div class="toast-template" role="alert" aria-live="assertive" aria-atomic="true" data-autohide="false" style="width: 300px;">
            <div class="toast-header">
                <!--<img src="..." class="rounded mr-2" alt="...">-->
                <svg class="bd-placeholder-img rounded mr-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img"><rect fill="#007aff" width="100%" height="100%"></rect></svg>
                <strong class="mr-auto">__header__</strong>
                <small class="text-muted"></small>
                <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="toast-body">__body__</div>
        </div>


    </div>
</div>
