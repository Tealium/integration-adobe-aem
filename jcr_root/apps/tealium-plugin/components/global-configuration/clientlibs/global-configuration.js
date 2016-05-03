jQuery(document).ready(function() {
    
    jQuery('[data-udo-value]').each(function(i, e) {
        var elem = jQuery(e);
        var json = elem.data('udo-value');
        var nameAndValue;
        if (json.udoName && json.udoValue) {
            nameAndValue = json.udoName + ' = ' + json.udoValue;
        } else if (json.udoName || json.udoValue) {
            nameAndValue = json.udoName ? json.udoName : json.udoValue;
            elem.addClass('error');
        } else {
            nameAndValue = '';
        }
        var isArray = json.isArray ? ', rendered as array' : '';
        var isDynamic = json.isDynamic ? ', value is dynamic' : '';
        elem.text(nameAndValue + isArray + isDynamic);
    });
});