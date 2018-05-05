/* jshint esversion: 6 */
$(function(){
    $("#tablaPosicion").hide();
});

$(function(){
     $.get("./api/carreras", function(fixture){
        $.get("./api/equipos", function(equipos){
            $.get("./api/jugadores", function(jugadores){
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

            dataPosiciones = [[1,0,0,0],[2,0,0,0],[3,0,0,0],[4,0,0,0],[5,0,0,0],[6,0,0,0],[7,0,0,0],[8,0,0,0],[9,0,0,0],[10,0,0,0],[11,0,0,0],[12,0,0,0]];
           
            var index=0;
            var cantPosiciones = 12;
            var ultimaCarrera;

            $.each(dataCarreras,function(key,carrera){
                    ultimaCarrera = carrera.fecha;
            });

            $.each(dataCarreras,function(key,carrera){
                $.each(dataEquipos,function(key,equipo){
                    if(ultimaCarrera == carrera.fecha){
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

            console.log(dataPosiciones);
            var posiciones = [["Posición", "Jugador", "Equipo", "Puntaje"]];
            posiciones = posiciones.concat(dataPosiciones);

            var subtitulo = "ULTIMA CARRERA";
            makeRankTable(contenedor,posiciones, subtitulo);
           
            makeTable(contenedor,arr);
           
            scrollabajo(contenedor);
        } 
        else{
            scrollarriba(contenedor,$this);
       }
    });
}

function makeRankTable(containerPrinc, data, textSub) {
    container = $("<div></div>").addClass('col-sm-3');
    var table = $("<table/>").addClass('table table-dark');
    table.addClass('table table-dark');
    table.addClass('table table-bordered');
    table.addClass('table table-md');
    table.attr("id","rankTable")
    var subtitulo = $("<th></th>").attr("colspan", "4").text("TABLA DE POSICIONES "+textSub);
    subtitulo.attr("id","headerTabla");
    table.append($("<tr></tr>").append(subtitulo));    
    $.each(data, function(rowIndex, r) {
        var row = $("<tr/>");
        $.each(r, function(colIndex, c) { 
            row.append($("<t"+(rowIndex == 0 ?  "h" : "d")+"/>").text(c));
        });
        table.append(row);
    });

    container.append(table);
 
    return  containerPrinc.append(container);
}


function makeTable(containerPrinc, data) {

        container = $("<div></div>").addClass('col-sm-9');
   
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
        container.append(table);
        return  containerPrinc.append(container);
}




