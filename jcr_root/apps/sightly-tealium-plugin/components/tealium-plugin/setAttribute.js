use(function () {
    var key;
    for (key in this) {
        request.setAttribute(key, this[key]);
    }
});
