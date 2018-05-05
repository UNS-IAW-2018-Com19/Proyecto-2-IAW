
$(function(){
    $.get("./api/carreras", function(fixture){
            armarFixture(fixture);
        });
    });

function armarFixture(fixture){
    $("#fixture").click(function(){
        var $this = $(this); //cache the reference
        var contenedor = $("#contenedorFixture");
        var grid = $("#gridFixture");
        var id = "contenedorFixture";

        $(".resultados").removeClass('disabled');


        if (!$this.hasClass('disabled')) {
            cargarVista(grid, id, "fixture");
            contenedor = $("#contenedorFixture");

            makeFixtureCards(contenedor, fixture);
            scrollabajo(contenedor);
        }
        else{
            scrollarriba(contenedor,$this);
        }
    });
}

function makeFixtureCards(container, fixture){

    var img, bodyCart, h5, vueltas, src,card, i = 1;

    $.each(fixture,function(key,carrera){
        //Armo la imagen del mapa
        card = $("<div></div>").addClass("card bg-light col-sm-3");
        card.css("width","400px");
       
        img = $("<img/>").addClass("card-img-top");
        img.attr('alt', 'Card image cap');
        src = ("images/mapas/").concat(carrera.fotoMapa);  
        img.attr("src",src);

        //Armo el cart body

        bodyCart = ($("<div></div>"));
        bodyCart.addClass("card-body");
        bodyCart.css("background-image","url:https://www.walldevil.com/wallpapers/a77/background-black-noise-colorful-wallpaper-wallpapers.jpg");
        fecha = "Fecha "+carrera.fecha+": ";
        nombreMapa = carrera.mapa; 
        h5 = $("<h5/>").addClass("card-title").text(fecha+nombreMapa);
   
        //Armo el cart text
        vueltas = $("<p/>");
        vueltas.addClass("card-text").text(carrera.descripcion).append("<br>").append("Vueltas totales: "+carrera.vueltas);
        
        var button = $("<button/>");
        button.addClass("btn btn-primary resultados").text("Ver resultados");
        var idButton = i;
        button.attr('id',i);
        i++;
        bodyCart.append(h5);
        bodyCart.append(vueltas);
        bodyCart.append(button);
        card.append(img);
        card.append(bodyCart);

        container = container.append(card);
        
    });
}

$(function(){ 
    $("body").on("click",".resultados",function(e) {
        var idFecha = $(this).attr('id');
        var posiciones;
        var $this = $(this); 
       
        if (!$this.hasClass('disabled')) {
            $.get("./api/jugadores", function(jugadores){
                $.get("./api/carreras", function(carreras){
                    $.get("./api/equipos", function(equipos){
                        $("#rankTable").remove();
                        dataPosiciones = armarTablaPosicion(carreras,equipos,jugadores, idFecha);
                        mostrarTabla(dataPosiciones,idFecha);     
                        $('#classModal').modal('show');
                        $this.addClass('disabled');
                    });
                });
            });
        }
    });
});

function armarTablaPosicion(dataCarreras, dataEquipos, dataJugadores, idFecha){

    dataPosiciones = [[1,0,0,0],[2,0,0,0],[3,0,0,0],[4,0,0,0],[5,0,0,0],[6,0,0,0],[7,0,0,0],[8,0,0,0],[9,0,0,0],[10,0,0,0],[11,0,0,0],[12,0,0,0]];
    var cantPosiciones = 12;

    $.each(dataCarreras,function(key,carrera){
        $.each(dataEquipos,function(key,equipo){
            if(idFecha == carrera.fecha){
                for(var j = 0; j < cantPosiciones;j++){
                    if(equipo.id_jugadorUno == carrera.posiciones[j][0].jugador || equipo.id_jugadorDos == carrera.posiciones[j][0].jugador){
                        dataPosiciones[j][2] = equipo.nombre;
                        dataPosiciones[j][3] = "+"+carrera.posiciones[j][0].puntaje;   
                        $.each(dataJugadores, function(key,player){  
                            if(carrera.posiciones[j][0].jugador == player.id_jugador)
                                dataPosiciones[j][1] = player.userName;
                        });
                    }
                }
            }
        });
    });

    var posiciones = [["Posición", "Jugador", "Equipo", "Puntaje"]];
    posiciones = posiciones.concat(dataPosiciones);

    return posiciones;
    
}

function mostrarTabla(dataPosiciones, idFecha){
    $("#classModalLabel").text("MARIO KART TOURNAMENT: FECHA "+idFecha);
    container = $("#modalTable");
    makeRankTable(container,dataPosiciones, "FECHA "+ idFecha);
}