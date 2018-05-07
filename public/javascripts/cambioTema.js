var estilo;

$(function(){
    
    var recuperarEstilo = recuperarEstiloBD(function(estiloRecuperado){
        setEstilo(estiloRecuperado);
    });
    
    if(recuperarEstilo == undefined)
        estilo = setEstilo(1);
    else 
        estilo = recuperarEstilo;

    $("#toggleB").click(function() {
       guardarEstiloBD(estilo);
       estilo = setEstilo(estilo);
    });

});



function setEstilo(estilo){
    if(estilo==0){    //estilo dark
        $("link[href='stylesheets/redstyle.css']").attr("href", "stylesheets/darkstyle.css");
        estilo = 1;
    }
    else{ //estilo rojo
        $("link[href='stylesheets/darkstyle.css']").attr("href", "stylesheets/redstyle.css");
        estilo=0;
    }
    return estilo;
}