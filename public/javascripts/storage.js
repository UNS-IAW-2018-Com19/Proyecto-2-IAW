/* jshint esversion: 6 */
function guardarEstilo(estilo) {
    localStorage.setItem("estilo", estilo);        
}

function recuperarEstilo(){
    var result = window.localStorage.getItem("estilo");
    return result;
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
            console.log("GUARDAR ESTILO BD: DATA ES: "+data);
        },
        error: function(data) {
            window.localStorage.setItem("estilo", estiloString);
        }
    });
}


function recuperarEstiloBD(callback) {
	$.ajax({
	    url: './api/estilo',
	    type: 'GET',
	    success: function(data){ 
            console.log("RECUPERAR ESTILO BD: data es: "+data);
	        callback(data);
	    },
	    error: function(data) {
		    var result = window.localStorage.getItem("estilo");
	    }
	});
}