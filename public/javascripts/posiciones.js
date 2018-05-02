$(function(){
    $("#tablaPosicion").hide();
});

$(function(){
    $.getJSON('json/fixture.json', function(fixture){
        $.getJSON('json/equipos.json',function(equipos){
            $.getJSON('json/jugadores.json',function(jugadores){
                    armarTablaPosicionesGenerales(fixture, equipos,jugadores);
            
            });
        });
 
    });
});


function armarTablaPosicionesGenerales(dataCarreras, dataEquipos, dataJugadores){
    $("#posiciones").click(function(){
        var $this = $(this); //cache the reference
        var contenedor = $("#tablaPosicion");
        var grid = $("#gridTabla");
        var id = "tablaPosicion";

        if (!$this.hasClass('disabled')) {
            cargarVista(grid, id, "posiciones");
            contenedor = $("#tablaPosicion");
            var puntos = new Array(6,3);
            puntos = [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]];
            var index=0;
            var cantPosiciones = 12;
    /* Este es el código menos reusable que hice en mi vida :) */
            $.each(dataCarreras.fixture,function(key,carrera){
                $.each(dataEquipos.equipos,function(key,equipo){
                    for(var i = 0; i < cantPosiciones;i++){
                        if(equipo.id_jugadorUno == carrera.posiciones[i][0].jugador || equipo.id_jugadorDos == carrera.posiciones[i][0].jugador){
                            puntos[index][0] = equipo.nombre;
                            puntos[index][1] += carrera.posiciones[i][0].puntaje;
                            if(carrera.posiciones[i][0].puntaje == 15)
                                puntos[index][2] +=1;
                        }   
                    }
                index++;   
                });
            index=0;
            });
            
            puntos.sort(function(a, b){
                if (a[1] === b[1]) {
                    return 0;
                }
                else {
                    return (a[1] < b[1]) ? 1 : -1;
                }
            });
            
          
            var arr = [["Equipo", "Puntos", "Wins"]];
            arr = arr.concat(puntos);
            armarTablaPosiciones(4,dataCarreras, dataEquipos, dataJugadores, contenedor);
            makeTable(contenedor,arr);
            scrollabajo(contenedor);
        } 
        else{
            scrollarriba(contenedor,$this);
       }
    });
}

/*
    Dada una fecha de una carrera jugada, devuelve la tabla de posiciones de la misma.
*/

function makeTablaPosiciones(fecha, fixture){
    $.getJSON('json/equipos.json',function(equipos){
        $.getJSON('json/jugadores.json',function(jugadores){
            armarTablaPosiciones(fecha,fixture,equipos,jugadores);
        });
    });
}

function armarTablaPosiciones(fecha, dataCarreras, dataEquipos, dataJugadores, contenedor){
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
            makeRankTable(contenedor,arr);
          
}


function makeRankTable(container, data) {

    container = container.append($("<div></div>").addClass('col-sm-9'));
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


function makeTable(container, data) {

        container = container.append($("<div></div>").addClass('col-sm-1'));

        var table = $("<table/>").addClass('table table table-dark table-striped table-bordered table-md ');
        table.attr("id","tablaGeneral");
        var subtitulo = $("<th></th>").attr("colspan", "3").text("TABLA DE POSICIONES GENERALES");

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




