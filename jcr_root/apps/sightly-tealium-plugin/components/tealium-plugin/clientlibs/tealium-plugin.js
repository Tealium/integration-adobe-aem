;(function($) {
    var utagData = jQuery('[data-tealium-utag-data]').data('tealium-utag-data');
    if (utagData) {
        var utagDataScript = document.createElement("script");
        utagDataScript.type = "text/javascript";
        utagDataScript.text = '\nvar utag_data = ' + JSON.stringify(utagData, null, 4) + '\n';
        document.getElementById('tealium-utag-data').appendChild(utagDataScript);
    }

    var linkToUtagJs = jQuery('[data-tealium-link-to-utag-js]').data('tealium-link-to-utag-js');
    if (linkToUtagJs) {
        var utagScriptText = "(function(a,b,c,d){a='"+ linkToUtagJs + "';b=document;c='script';d=b.createElement(c);d.src=a;d.type='text/java'+c;d.async=true;a=b.getElementsByTagName(c)[0];a.parentNode.insertBefore(d,a);})()";
        var utagJsScript = document.createElement("script");
        utagJsScript.type = "text/javascript";
        utagJsScript.text = utagScriptText;
        document.getElementById('tealium-link-to-utag-js').appendChild(utagJsScript);
    }
})(jQuery);