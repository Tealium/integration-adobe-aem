;(function($) {

    var priceCaller = 'price-caller';
    var productDataCaller = 'product-data-caller';
    var elementToListen = jQuery('.tealium-price-caller');

    TealiumAsyncJsManager.enableDebug();

    TealiumAsyncJsManager.registerMethod(productDataCaller, elementToListen);
    TealiumAsyncJsManager.registerMethod(priceCaller, elementToListen);

    function getProductData() {
        var url = elementToListen.data('page-path');
        jQuery.ajax({
            async: true,
            cache: false,
            type: "GET",
            url: url + '/jcr:content/par/product.json',
            dataType: 'json',
            success: function(data) {
                console.log('Received response:', data);
            	elementToListen.trigger(productDataCaller, data);

                if (data.productData) {
					callForPrice(data.productData);
        		} else {
                    console.error('Response does not contain required data');
                    TealiumAsyncJsManager.deregisterMethod(priceCaller, elementToListen);
                }



            },
            error: function(data) {
                console.log('Error is occurred. Unregistering events.');
    			TealiumAsyncJsManager.deregisterMethod(productDataCaller, elementToListen);
    			TealiumAsyncJsManager.deregisterMethod(priceCaller, elementToListen);
            }
        });
    }

	function callForPrice(productDataPath) {
        jQuery.ajax({
            async: true,
            cache: false,
            type: "GET",
            url: productDataPath + '.json',
            dataType: 'json',
            success: function(data) {
                console.log('Received response:', data);
            	elementToListen.trigger(priceCaller, data);
            },
            error: function(data) {
                console.log('Error is occurred. Unregistering events.');
            	TealiumAsyncJsManager.deregisterMethod(priceCaller, elementToListen);
            }
        });
    }

    jQuery(document).ready(getProductData);

})(jQuery);