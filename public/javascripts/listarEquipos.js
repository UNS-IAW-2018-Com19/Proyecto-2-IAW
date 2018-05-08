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
   
            $.get("./api/equipos", function(equipos){
                hacerTabla(contenedor,equipos);
            });
            scrollabajo(contenedor);
            
        }
        else{
            scrollarriba(contenedor,$this);
            $("#descripcionEquipo").remove();
            $("#guardarEquiposFavs").remove();
        }

    });    
});

$(function(){ 
    $("body").on("click",".participante",function(e) {
        var selectedLiText = $(this).text();
        selectedLiText=selectedLiText.substring(11);
        $.get("./api/jugadores", function(jugadores){
            var pantallaJ= getPantallaJugador(selectedLiText,jugadores);
            $("#tablaEquipos").hide();
            $("#descripcionEquipo").show();
        }); 
    }); 
});


function hacerTabla(container,dataEquipos){
    var table= $("<table/>").addClass('table table borderless table-dark table-striped table-md');

    var i=0;

    var row= $("<tr/>");
    var row2= $("<tr/>");

    $.get("./api/jugadores", function(jugadores){
         
        $.each(dataEquipos,function(key,equipo){
            
            //Creamos lista donde agregaremos caracteristicas de equipo
            var lista=$("<ul/>").addClass('list-group');

            //Obtenemos caracteristicas
            var srcImagen="images/logos/"+equipo.logo;
            var imagen=$("<img/>").attr({src:srcImagen,width:"80px",height:"80px",align:"left"});
            imagen.addClass("rounded");
            var jugadorUno=(obtenerJugador(jugadores,equipo.id_jugadorUno));
            var jugadorDos=(obtenerJugador(jugadores,equipo.id_jugadorDos));

            var formCheck = $("<div/>").addClass("form-check");            
            var checkBox = $("<input/>").attr("type","checkbox").addClass("form-check-input favchecked").attr("id",equipo.id_equipo);
            var label = $("<label/>");
            label.attr("text","Agregar favorito");
            label.append(checkBox);
            formCheck.append(label);

            var buttonEquiposFavoritos = $("<button/>").addClass("btn btn-primary").attr("id","guardarEquiposFavs").text("Marcar como favorito");
            var link = $("<i/>").addClass("fa fa-star-o").attr("aria-hidden","true");
            buttonEquiposFavoritos.append(link);

            recuperarEquiposFavoritosBD(function(equiposRecuperados){
                if(equiposRecuperados == undefined)
                    equiposRecuperados = recuperarEquiposFavoritos();
                
                for(var index = 0; index < equiposRecuperados.length; index++){
                if(equiposRecuperados[index] == checkBox.attr("id")){
                        checkBox.attr("checked","checked"); 
                    }
                }  
                
            });
                    
            lista.append($("<li/>").addClass("list-group-item list-group-item-action list-group-item-light").text(equipo.nombre));
            lista.append($("<li/>").addClass("list-group-item list-group-item-action list-group-item-light participante").text("Jugador 1: "+jugadorUno));
            lista.append($("<li/>").addClass("list-group-item list-group-item-action list-group-item-light participante").text("Jugador 2: "+jugadorDos));
            if(i<3){    
            row.append($("<td/>").append(imagen).append(lista).append(buttonEquiposFavoritos));
            table.append(row);
            i++;
        }
        else{
            row2.append($("<td/>").append(imagen).append(lista).append(buttonEquiposFavoritos));
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
    $.each(data,function(key,jugador){ 
        if(jugador.id_jugador==idjugador){
            devolver=jugador.userName;
        }
    });
    return devolver;
}

function getPantallaJugador(nombrejugador,jugadores){
    var player; 
     $.each(jugadores,function(key,jugador){
         if(jugador.userName==nombrejugador){
             player=jugador;
         }
     });

     var estrellaVacia = $("<i/>").addClass("fa fa-star-o").attr("aria-hidden","true");
     var estrella = $("<i/>").addClass("fa fa-star").attr("aria-hidden","true");

     var buttonJugadoresFavoritos = $("<button/>").addClass("btn btn-primary botonPersonajeFavorito").text("Guardar como favorito");
     buttonJugadoresFavoritos.append(estrellaVacia);

     recuperarJugadoresFavoritosBD(function(jugadoresRecuperados){
            if(jugadoresRecuperados == undefined)
                jugadoresRecuperados = recuperarJugadoresFavoritos();
            for(var i = 0; i < jugadoresRecuperados.length; i++){
                 if (jugadoresRecuperados[i] == player.userName){   
                    buttonJugadoresFavoritos.removeClass("btn-primary");
                    buttonJugadoresFavoritos.addClass("btn-success").text("Marcado favorito");
                    buttonJugadoresFavoritos.append(estrella);
                 }
            }
    });

    
     var gridUser = $("#descripcionEquipo");
     var gridPersonaje = $("<div></div>").addClass("container-full");
     gridPersonaje.css("float","left");
     var checkBox = $("<input/>").attr("type","checkbox").addClass("form-check-input favchecked").attr("id",player.id_jugador);
     var user=$("<p/>").addClass("jugador-name").text(nombrejugador).append($("<br/>"));
     var pj = $("<p/>").addClass("texto-jugador").text("Personaje Favorito: ").append($("<br/>"));;
     var playerPicture = $("<img/>").attr({src:"images/personajes/"+player.fotopersonaje,width:"auto",height:"150px"});
     var textoPlayer = $("<p/>").addClass("texto-jugador").text(player.personaje);

     var source="images/avatar/"+player.avatar;
     var avatar=$("<img/>").attr({src:source,width:"150px",height:"150px"});
    
     buttonJugadoresFavoritos.attr("id",nombrejugador);

     gridUser.append(avatar);
     avatar.append(user);
     user.append(buttonJugadoresFavoritos);
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

     var buttonVolver = $("<button/>").addClass("btn btn-primary volver").text("Volver");

    gridVehiculo.append(buttonVolver);
     
     gridUser.append(gridVehiculo);
}

$(function(){ 
    $("body").on("click",".volver",function(e) {
        $("#descripcionEquipo").empty();
        $("#descripcionEquipo").hide();
        $("#tablaEquipos").show();
    });
});
/*
$(function(){ 
    $("body").on("click","#guardarEquiposFavs",function(e) {
        var checksbox = document.getElementsByClassName("favchecked");
        localStorage.clear();
        seleccionados = [];
    
        for(var i = 0; i < checksbox.length; i++){
            if(checksbox[i].checked){
                seleccionados.push(checksbox[i].id);            
            }
        }
        guardarEquiposFavoritos(seleccionados);
        guardarEquiposFavoritosBD(seleccionados);

        var div = $("<div/>").addClass("alert alert-success").attr("role","alert").text("Los equipos favoritos fueron guardados exitosamente!");
        $("#gridEquipos").append(div);
        $('.alert').show();
        $('.alert').fadeTo(2000, 2000).slideUp(2000, function(){
            $("#success-alert").slideUp(2000);});
    }); 
});*/

$(function(){ 
    $("body").on("click",".botonEquipoFavorito",function(e) {
        var favorito = document.getElementsById("botonEquipoFavorito");
        var noagregar=false;

        if($(favorito).hasClass("btn-primary")){
            var jugadoresFavoritos = recuperarJugadoresFavoritos();
            for(var i =0; i < jugadoresFavoritos.length; i++){
                if(jugadoresFavoritos[i] == favorito[0].id){
                     noagregar = true;
                }
            }
            if(!noagregar){
                     jugadoresFavoritos.push(favorito[0].id);
             }
             else{
                 if (jugadoresFavoritos.length == 0){
                     jugadoresFavoritos.push(favorito[0].id);
                 }
             }
             var estrella = $("<i/>").addClass("fa fa-star").attr("aria-hidden","true");
             $(".botonPersonajeFavorito").text("Marcado Favorito");
             $(".botonPersonajeFavorito").removeClass("btn-primary");
             $(".botonPersonajeFavorito").append(estrella);
             $(".botonPersonajeFavorito").addClass("btn-success");
             guardarJugadoresFavoritos(jugadoresFavoritos);
             guardarJugadoresFavoritosBD(jugadoresFavoritos);
         }
         else{
             $(".botonPersonajeFavorito").text("Guardar como favorito");
             $(".botonPersonajeFavorito").removeClass("btn-success");
             $(".botonPersonajeFavorito").addClass("btn-primary");
             removerJugadorFavoritoBD(favorito[0].id);
         }

        guardarEquiposFavoritos(seleccionados);
        guardarEquiposFavoritosBD(seleccionados);
    }); 
});


$(function(){ 
    $("body").on("click",".botonPersonajeFavorito",function(e) {
        var favorito = document.getElementsByClassName("botonPersonajeFavorito");
        var noagregar=false;
        if($(".botonPersonajeFavorito").hasClass("btn-primary")){
           var jugadoresFavoritos = recuperarJugadoresFavoritos();
           for(var i =0; i < jugadoresFavoritos.length; i++){
               if(jugadoresFavoritos[i] == favorito[0].id){
                    noagregar = true;
               }
           }
           if(!noagregar){
                    jugadoresFavoritos.push(favorito[0].id);
            }
            else{
                if (jugadoresFavoritos.length == 0){
                    jugadoresFavoritos.push(favorito[0].id);
                }
            }
            $(".botonPersonajeFavorito").text("Marcado Favorito");
            $(".botonPersonajeFavorito").removeClass("btn-primary");
            $(".botonPersonajeFavorito").addClass("btn-success");
            console.log("DESPUES "+jugadoresFavoritos);
            guardarJugadoresFavoritos(jugadoresFavoritos);
            guardarJugadoresFavoritosBD(jugadoresFavoritos);
        }
        else{
            $(".botonPersonajeFavorito").text("Guardar como favorito");
            $(".botonPersonajeFavorito").removeClass("btn-success");
            $(".botonPersonajeFavorito").addClass("btn-primary");
            removerJugadorFavoritoBD(favorito[0].id);
        }
    }); 
});

