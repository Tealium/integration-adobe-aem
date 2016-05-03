;(function($) {
    var tealiumData = jQuery('[data-tealium-utag-data]').data('tealium-utag-data');
    if (tealiumData) {
        TealiumAsyncJsManager.addValueToResult(tealiumData);
    }
})(jQuery);