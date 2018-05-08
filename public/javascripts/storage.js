/* jshint esversion: 6 */
function guardarEstilo(estilo) {
    localStorage.setItem("estilo", estilo);        
}

function recuperarEstilo(){
    var result = window.localStorage.getItem("estilo");
    return result;
}

function guardarEquiposFavoritos(favoritos){
    localStorage.setItem("favoritos", JSON.stringify(favoritos));        
}

function recuperarEquiposFavoritos(){
    var result = window.localStorage.getItem("favoritos");
    result = JSON.parse(result);
    if(result != null)
        return result;
    else
        return [];
}

function guardarJugadoresFavoritos(favoritos){
    localStorage.setItem("jugadoresFavoritos", JSON.stringify(favoritos));        
}

function recuperarJugadoresFavoritos(){
    var result = window.localStorage.getItem("jugadoresFavoritos");
    result = JSON.parse(result);
    if(result != null)
        return result;
    else
        return [];

}


function guardarEquiposFavoritosBD(equipos){
    const equiposString = JSON.stringify(equipos);
   $.ajax({
        url: './api/equiposFav',
        type: 'POST',
        data: JSON.stringify({equiposFavoritos: JSON.parse(equiposString)}),
        contentType: "application/json",
        dataType: "json",
        success: function(data){ 
        },
        error: function(data) {
            window.localStorage.setItem("favoritos", equiposString);
        }
    });
}

function recuperarEquiposFavoritosBD(callback) {
	$.ajax({
	    url: './api/equiposFav',
	    type: 'GET',
	    success: function(data){ 
	        callback(data);
	    },
	    error: function(data) {
		    return window.localStorage.getItem("favoritos");
	    }
	});
}

function guardarJugadoresFavoritosBD(jugadores){
    const jugadoresString = JSON.stringify(jugadores);
   $.ajax({
        url: './api/jugadoresFav',
        type: 'POST',
        data: JSON.stringify({jugadoresFavoritos: JSON.parse(jugadoresString)}),
        contentType: "application/json",
        dataType: "json",
        success: function(data){ 
        },
        error: function(data) {
            window.localStorage.setItem("jugadoresFavoritos", jugadoresString);
        }
    });
}

function recuperarJugadoresFavoritosBD(callback) {
	$.ajax({
	    url: './api/jugadoresFav',
	    type: 'GET',
	    success: function(data){ 
	        callback(data);
	    },
	    error: function(data) {
		    return window.localStorage.getItem("jugadoresFavoritos");
	    }
	});
}

function guardarEstiloBD(estilo){
    const estiloString = JSON.stringify(estilo);
   $.ajax({
        url: './api/estilo',
        type: 'POST',
        data: JSON.stringify({estilo: JSON.parse(estiloString)}),
        contentType: "application/json",
        dataType: "json",
        success: function(data){ 
        },
        error: function(data) {
            window.localStorage.setItem("estilo", estiloString);
        }
    });
}



function removerJugadorFavoritoBD(favorito){
    localStorageFavoritos = recuperarJugadoresFavoritos();
    for(var i = 0; i < localStorageFavoritos.length;i++){
        if(localStorageFavoritos[i] == favorito)
           localStorageFavoritos.splice(i,i);
    }
    guardarJugadoresFavoritos(localStorageFavoritos);
    guardarJugadoresFavoritosBD(localStorageFavoritos);
}

function recuperarEstiloBD(callback) {
	$.ajax({
	    url: './api/estilo',
	    type: 'GET',
	    success: function(data){ 
            callback(data);
	    },
	    error: function(data) {
		    var result = window.localStorage.getItem("estilo");
	    }
	});
}