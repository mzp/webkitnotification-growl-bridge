$(function() {
    function eachField(f) {
        $(".text").each(function(_, elem) {
            var elem = $(elem);
            f(elem);
        });
    }

    function restore() {
        eachField(function(elem) {
            var name = elem.attr("name");
            elem.attr( "value", localStorage[name]);
        });

        if(localStorage['growl-only'] == 'true') {
            $("#growl-only").attr("checked","checked")
        }else{
            $("#growl-only").attr("checked","")
        }
    }
    function save() {
        eachField(function(elem) {
            var name = elem.attr("name");
            localStorage[name] = elem.attr("value");
        })
        localStorage['growl-only'] = $("#growl-only").attr("checked");
    }

    restore();
    $(".save").bind("click", function(e) {
        e.preventDefault();
        save();
        window.close();
    });
});
