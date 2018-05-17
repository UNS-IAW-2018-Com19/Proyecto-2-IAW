var estilo;

$(function(){


    var rec = recuperarEstiloBD(function(estiloRecuperado){
        if(estiloRecuperado != -1)
            estilo = setEstilo(estiloRecuperado);
    });
    
    var estiloRecuperado = recuperarEstilo();
    
    if(estiloRecuperado == undefined)
        estilo = 1;
    else 
        estilo = estiloRecuperado;

    estilo = setEstilo(estilo);

});

$("#toggleBDUser").click(function() {
    guardarEstiloBD(estilo);
    estilo = setEstilo(estilo);
});

$("#toggleVisitor").click(function() {
    guardarEstilo(estilo);
    console.log(estilo);
    estilo = setEstilo(estilo);
});


function setEstilo(estilo){
    if(estilo == 0){    //estilo dark
        $("link[href='stylesheets/redstyle.css']").attr("href", "stylesheets/darkstyle.css");
        estilo = 1;
    }
    else{ //estilo rojo
        $("link[href='stylesheets/darkstyle.css']").attr("href", "stylesheets/redstyle.css");
        estilo = 0;
    }

    return estilo;
}