
var executeBrowserContext = function(funcOrString) {
    var code = "javascript:(" + encodeURIComponent(funcOrString.toString()) + ")();";
    location.href = code;
};
executeBrowserContext(function(){
    var original = window.webkitNotifications.createNotification;
    window.webkitNotifications.createNotification = function(icon, title, body){
        var ev = document.createEvent("MessageEvent");
        ev.initMessageEvent("codefirst::message",true,false,
                            JSON.stringify({
                                page_title: document.title,
                                icon: icon,
                                title: title,
                                text: body
                            }),
                            location.protocol + '//' + location.host, // origin
                            '', // lastEventId (Server-sent Event に使われるもの)
                            window // source
                           );
        document.dispatchEvent(ev);
        return original.apply(this,arguments);
    };
});


function query(json) {
    var params = new Array();
    for(name in json){
        params.push(name + "=" + encodeURI(json[name]));
    }
    return params.join("&");
}

document.addEventListener("codefirst::message", function(ev){
    chrome.extension.sendRequest({method: "getLocalStorage", key: "bridge-url"}, function(url) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url.data + '/notify',true);
        xhr.setRequestHeader("If-Modified-Since", "Thu, 01 Jun 1970 00:00:00 GMT");
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(query(JSON.parse(ev.data)));
    })},false);

