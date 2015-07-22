define(function(require) {

    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = "geppetto/js/components/dev/wormsimlogo/wormsim-logo.css";
    document.getElementsByTagName("head")[0].appendChild(link);
    
    $("#geppettologo").click(function(){
    	document.location.href="/";
    })

});