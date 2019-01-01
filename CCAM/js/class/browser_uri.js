class BrowserUri{
    paramsGet () {
        var uriParams = window.location.search.substr(1).split("&");
        var $_GET = {};
        for (var f = 0; f < uriParams.length; f++) {
            var param = uriParams[f].split("=");
            $_GET[decodeURIComponent(param[0])] = decodeURIComponent(param[1]);
        }
        return $_GET;
    }
}