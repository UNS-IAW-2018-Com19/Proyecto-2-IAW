
$(function(){
    $.getJSON('json/fixture.json', function(fixture){
        $.getJSON('json/equipos.json',function(equipos){
            armarFixture(fixture);
        });
    });
 
});


function armarFixture(fixture){
    $("#fixture").click(function(){
        var $this = $(this); //cache the reference
        var contenedor = $("#contenedorFixture");
        var grid = $("#gridFixture");
        var id = "contenedorFixture";

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

    var img, bodyCart, h5, vueltas, src,card;

    $.each(fixture.fixture,function(key,carrera){
        //Armo la imagen del mapa
        card = $("<div></div>").addClass("card bg-light col-sm-3");
        card.css("width","400px");
       
        img = $("<img/>").addClass("card-img-top");
        img.attr('alt', 'Card image cap');
        src = ("img/mapas/").concat(carrera.fotoMapa);  
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
        vueltas.addClass("card-text").text("Descripción de la carrera");

      
        var button = $("<button/>");
        button.addClass("btn btn-primary").text("Ver resultados");
        button.attr('id','resultados');

      
       
        bodyCart.append(h5);
        bodyCart.append(vueltas);
        bodyCart.append(button);
        card.append(img);
        card.append(bodyCart);

        container = container.append(card);
        
    });

}

$("body").on("click","#resultados",function() {

    var container = $("#contenedorTablas").append($("<div></div>").addClass('col-sm-10'));

    makeTablaaPosiciones(fecha,fixture,container);
   
    $("#contenedorTablas").show();
    $('html, body').animate({
        scrollTop: $("#contenedorTablas").offset().top
        }, 500);
});

function makeTablaaPosiciones(fecha, fixture, contenedor){
    $.getJSON('json/equipos.json',function(equipos){
        $.getJSON('json/jugadores.json',function(jugadores){
            console.log(equipos);
            console.log(jugadores);
            armarTablaPosicionees(fecha,fixture,equipos,jugadores, contenedor);
        });
    });
}

function armarTablaPosicionees(fecha, dataCarreras, dataEquipos, dataJugadores, contenedor){
            var puntos = new Array(6,4);
            dataPosiciones = [[1,0,0,0],[2,0,0,0],[3,0,0,0],[4,0,0,0],[5,0,0,0],[6,0,0,0],[7,0,0,0],[8,0,0,0],[9,0,0,0],[10,0,0,0],[11,0,0,0],[12,0,0,0]];
            var index=0;
            var cantPosiciones = 12;
            var maxFechas = 4;
            var i;

            $.each(dataCarreras.fixture,function(key,carrera){
                if(carrera.fecha == maxFechas){
                    $.each(dataEquipos.equipos,function(key,equipo){   
                        if(fecha == carrera.fecha){
                            for(i = 0; i < cantPosiciones;i++){
                                if(equipo.id_jugadorUno == carrera.posiciones[i][0].jugador || equipo.id_jugadorDos == carrera.posiciones[i][0].jugador){
                                        dataPosiciones[i][2] = equipo.nombre;
                                        dataPosiciones[i][3] = "+"+carrera.posiciones[i][0].puntaje;       
                                        $.each(dataJugadores.jugadores,function(key,player){  
                                                if(carrera.posiciones[i][0].jugador == player.id_jugador)
                                                    dataPosiciones[i][1] = player.userName;
                                        });
                                }
                            }
                        }
                    });
                }
            });
            var arr = [["Posición", "Jugador", "Equipo", "Puntaje"]];
            arr = arr.concat(dataPosiciones);
            console.log(arr);
            makeRankTablee(contenedor,arr);
          
}


function makeRankTablee(container, data) {

    container = container.append($("<div></div>").addClass('col-sm-10'));
    var table = $("<table/>").addClass('table table-dark');
    table.addClass('table table-dark');
    table.addClass('table table-bordered');
    table.addClass('table table-md');
    table.attr("id","rankTable")
    var subtitulo = $("<th></th>").attr("colspan", "4").text("TABLA DE POSICIONES ULTIMA CARRERA");
    subtitulo.attr("id","headerTabla");
    table.append($("<tr></tr>").append(subtitulo));    
    $.each(data, function(rowIndex, r) {
        var row = $("<tr/>");
        $.each(r, function(colIndex, c) { 
            row.append($("<t"+(rowIndex == 0 ?  "h" : "d")+"/>").text(c));
        });
        table.append(row);
    });
    return container.append(table);
}

