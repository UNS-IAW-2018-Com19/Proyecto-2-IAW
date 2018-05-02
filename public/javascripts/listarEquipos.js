$(function(){
    $("#descripcionEquipo").hide();
    $('#equipos').click(function(){
        var $this = $(this); //cache the reference
        var contenedor = $("#contenedorEquipos");
        var grid = $("#gridEquipos");
        var id = "contenedorEquipos";


        if (!$this.hasClass('disabled')) {
            cargarVista(grid, id, "equipos");
            contenedor=$("#contenedorEquipos");
            $("#descripcionEquipo").remove();
           
            $("body").append($("<div/>").addClass("jumbotron jumbotron-fluid container-full").attr("id","descripcionEquipo"));
            $("#descripcionEquipo").hide();
   
            $.getJSON('json/equipos.json', function(equipos){
                hacerTabla(contenedor,equipos);
            });

            scrollabajo(contenedor);
        }
        else{
            scrollarriba(contenedor,$this);
            $("#descripcionEquipo").remove();
        }

    });    
});
$(function(){ 
    $("body").on("click",".participante",function(e) {
        var selectedLiText = $(this).text();
        selectedLiText=selectedLiText.substring(11);
        $.getJSON('json/jugadores.json', function(jugadores){
            var pantallaJ= getPantallaJugador(selectedLiText,jugadores);
            $("#tablaEquipos").remove();
            $("#descripcionEquipo").show();
        }); 
    }); 
});


function hacerTabla(container,dataEquipos){
    var table= $("<table/>").addClass('table table borderless table-dark table-striped table-md');

    var i=0;

    var row= $("<tr/>");
    var row2= $("<tr/>");

    $.getJSON('json/jugadores.json', function(jugadores){

    $.each(dataEquipos.equipos,function(key,equipo){
        
        //Creamos lista donde agregaremos caracteristicas de equipo
        var lista=$("<ul/>").addClass('list-group');

        //Obtenemos caracteristicas
        var srcImagen="img/logos/"+equipo.logo;
        var imagen=$("<img/>").attr({src:srcImagen,width:"80px",height:"80px",align:"left"});
        imagen.addClass("rounded");
        var jugadorUno=(obtenerJugador(jugadores,equipo.id_jugadorUno));
        var jugadorDos=(obtenerJugador(jugadores,equipo.id_jugadorDos));
        
                
        lista.append($("<li/>").addClass("list-group-item list-group-item-action list-group-item-light").text(equipo.nombre));
        lista.append($("<li/>").addClass("list-group-item list-group-item-action list-group-item-light participante").text("Jugador 1: "+jugadorUno));
        lista.append($("<li/>").addClass("list-group-item list-group-item-action list-group-item-light participante").text("Jugador 2: "+jugadorDos));
        
    if(i<3){    
        row.append($("<td/>").append(imagen).append(lista));
        table.append(row);
        i++;
        }
    else{
       row2.append($("<td/>").append(imagen).append(lista));
       table.append(row2);
       i++;
        }
                
    });

   });
    table.attr({height:"500px",cellspacing:"0",cellpadding:"0"});
    table.attr("id","tablaEquipos");

    return container.append(table);
}



function obtenerJugador(data,idjugador){
    var devolver; 
    $.each(data.jugadores,function(key,jugador){ 
        if(jugador.id_jugador==idjugador){
            devolver=jugador.userName;
        }
    });
    return devolver;
}

function getPantallaJugador(nombrejugador,jugadores){
    var player; 
     $.each(jugadores.jugadores,function(key,jugador){
         if(jugador.userName==nombrejugador){
             player=jugador;
         }
     });

     var gridUser = $("#descripcionEquipo");
     var gridPersonaje = $("<div></div>").addClass("container-full");
     gridPersonaje.css("float","left");
     var user=$("<p/>").addClass("jugador-name").text(nombrejugador).append($("<br/>"));
     var pj = $("<p/>").addClass("texto-jugador").text("Personaje Favorito: ").append($("<br/>"));;
     var playerPicture = $("<img/>").attr({src:"img/personajes/"+player.fotopersonaje,width:"auto",height:"150px"});
     var textoPlayer = $("<p/>").addClass("texto-jugador").text(player.personaje);

     var source="img/avatar/"+player.avatar;
     var avatar=$("<img/>").attr({src:source,width:"150px",height:"150px"});
    
     gridUser.append(avatar);
     avatar.append(user);
     gridUser.append(user);
   
    gridUser.append(gridPersonaje);

     gridPersonaje.append(pj);
     pj.append(playerPicture);
     gridPersonaje.append(textoPlayer);


    var gridVehiculo = $("<div></div>").addClass("container-full");
    gridVehiculo.css("display","inline-block");

    var vehiculoLista=$("<dl/>");

     vehiculoLista.addClass("texto-vehiculo");
     
     vehiculoLista=vehiculoLista.add($("<dt/>").text("Vehiculo Favorito:"));
     vehiculoLista=vehiculoLista.add($("<dd/>").text("- Kart: "+player.vehiculo.kart));
     vehiculoLista=vehiculoLista.add($("<dd/>").text("- Ruedas: "+player.vehiculo.ruedas));
     vehiculoLista=vehiculoLista.add($("<dd/>").text("- Glider: "+player.vehiculo.glider));
    
     gridVehiculo.append(vehiculoLista);

     gridUser.append(gridVehiculo);


 }