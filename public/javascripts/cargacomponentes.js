/*
A partir de un componente, carga la vista correspondiente
*/

var comp = ["posiciones","fixture","equipos"];

var contenedores = ["#tablaPosicion","#contenedorFixture","#contenedorEquipos"];

function cargarVista(grid, id, component){
    for (var i = 0; i < comp.length; i++){
        if(component != comp[i]){
            $("#"+comp[i]).removeClass('disabled'); 
            $(contenedores[i]).remove();
        }
        else{
            $("#"+component).addClass('disabled'); 
        }
    }
    $("#descripcionEquipo").remove();
    $(grid).append($("<div/>").addClass("row").attr("id",id));
}