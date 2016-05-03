var TealiumAsyncJsManager = (function() {
    
    var REGISTERED = 'registered';
    var UNREGISTERED = 'unregistered';
    var DONE = 'done';
    
    TealiumAsyncJsManager = {};
    var registeredMethods = [];
    var tealiumData = {};
    var processing = false;
    var debug = false;
    var processed = false;
    
    function markAsDone(event) {
        var eventName = event.type;
        var registeredElement = event.target;
        for (var i = 0; i < registeredMethods.length; i++) {
            if (registeredMethods[i].key == eventName) {
                jQuery(registeredElement).off(eventName);
                registeredMethods[i].status = DONE;
                return;
            }
        }
    }

    function debugLog(message) {
        if (debug) {
            console.log(message);
        }
    }

    function debugLogs(message1, message2) {
        if (debug) {
            console.log(message1);
            console.log(message2);
        }
    }

    function processEvent(event, eventData) {
        if (eventData) {
            debugLogs('Received data from event.', eventData);
        }

        markAsDone(event);
        
        if (isJson(eventData)) {
            eventData = JSON.parse(eventData);
        }
        
        jQuery.extend(tealiumData, eventData);

        if (allEventsProcessed()) {
            renderUtagData();
        }
        
    }

    function allEventsProcessed() {
        return processing && !containsNotFinishedEvents();
    }

    function containsNotFinishedEvents() {
        for (var i = 0; i < registeredMethods.length; i++) {
            if (registeredMethods[i].status == REGISTERED) {
                return true;
            }
        }
        return false;
    }
    
    function isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    function registerMethod(eventName, elementToListen) {
        if (!eventName || !elementToListen) {
            console.error('Event name and element to listen should not be empty.');
            return;
        }
        for (var i = 0; i < registeredMethods.length; i++) {
            if (registeredMethods[i].key == eventName) {
                debugLog('already registered');
                return;
            }
        }
        jQuery(elementToListen).on(eventName, processEvent);
        registeredMethods.push({key: eventName, status: REGISTERED});
        debugLog('Method ' + eventName + ' is registered.');
    }
    
    function deregisterMethod(eventName, elementToListen) {
        if (!eventName || !elementToListen) {
            console.error('Event name and element to listen should not be empty.');
            return;
        }
        for (var i = 0; i < registeredMethods.length; i++) {
            if (registeredMethods[i].key == eventName) {
                jQuery(elementToListen).off(eventName);
                registeredMethods[i].status = UNREGISTERED;
                debugLog('Event name ' + eventName + ' is unregistered')
            }
        }

        if (allEventsProcessed()) {
            renderUtagData();
        }

    }

    function startProcessing() {
        processing = true;
        var registeredMethodsArray = [];
        for (var i = 0; i < registeredMethods.length; i++) {
            registeredMethodsArray.push(registeredMethods[i].key);
        }
        debugLogs('Start processing asynchronous calls. Registered methods:', registeredMethodsArray);
    }

    function addValueToResult(value) {
        if (!value) {
            return;
        }

        if (isJson(value)) {
            value = JSON.parse(value);
        }

        jQuery.extend(tealiumData, value);

        debugLogs('Tealium data after adding value is:', tealiumData);
    }

    function renderUtagData() {

        if (processed) {
            console.error('Rendering of utag data is called more then once. Ignoring next attempts.');
            return;
        }
        processed = true;

        var tealiumAccountInformation = jQuery('[data-tealium-account-information]').data('tealium-account-information');

        addValueToResult(tealiumAccountInformation);

        var tealiumPagePath = jQuery('[data-tealium-page-path]').data('tealium-page-path');

        addValueToResult({"tealiumPagePath": tealiumPagePath});

        debugLogs('Tealiumdata before sending request:', tealiumData);

        jQuery.ajax({
            async: true,
            cache: false,
            type: "POST",
            url: '/services/tealium/components/js/include',
            data: tealiumData,
            dataType: 'json',
            success: function(data) {
                debugLogs('Received response:', data);
                insertUtagData(data);
                insertUtagJsScript(tealiumData);
            },
            error: function(data) {
                console.log('error is occurred');
                console.log(data);
            }
        });
    }

    function enableDebug() {
        debug = true;
    }

    function insertUtagData(utagData) {
        var utagDataEnabled = jQuery('[data-tealium-enabled-custom-udo]').data('tealium-enabled-custom-udo');
        if (!utagDataEnabled) {
            debugLog('Utag data is disabled in configuration. utag_data will not be rendered.');
            return;
        }

        mergeTealiumData(utagData, tealiumData);

        var utagDataScript = document.createElement("script");
        utagDataScript.type = "text/javascript";
        utagDataScript.text = '\nvar utag_data = ' + JSON.stringify(utagData, null, 4) + '\n';
        document.head.appendChild(utagDataScript);
    }

    function mergeTealiumData(destination, target) {
        for (var i in destination) {
            if(isEmptyVariable(destination[i]) && target[i] != undefined && !isEmptyVariable(target[i])) {
                destination[i] = target[i];
            } else if (destination[i] instanceof Array && target[i] instanceof Array) {
                mergeTealiumData(destination[i], target[i]);
            }
        }
    }

    function isEmptyVariable(variable) {
        return variable === '';
    }

    function sameTypes(var1, var2) {
        return typeof var1 == typeof var2;
    }


    function insertUtagJsScript(data) {
        var utagJsEnabled = jQuery('[data-tealium-enabled-utag-js]').data('tealium-enabled-utag-js');
        if (!utagJsEnabled) {
            debugLog('Utag js is disabled in configuration. utag_data will not be rendered.');
            return;
        }
        var utagScriptText = "(function(a,b,c,d){a='//tags.tiqcdn.com/utag/"+data.account+"/"+data.profile+"/"+data.environment+"/utag.js';b=document;c='script';d=b.createElement(c);d.src=a;d.type='text/java'+c;d.async=true;a=b.getElementsByTagName(c)[0];a.parentNode.insertBefore(d,a);})()";
        var utagJsScript = document.createElement("script");
        utagJsScript.type = "text/javascript";
        utagJsScript.text = utagScriptText;
        document.head.appendChild(utagJsScript);
    }

    return {
        startProcessing: startProcessing,
        registerMethod: registerMethod,
        deregisterMethod: deregisterMethod,
        addValueToResult: addValueToResult,
        renderUtagData: renderUtagData,
        enableDebug: enableDebug
    }

})();