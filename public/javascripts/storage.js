function guardarEstilo(estilo) {
    localStorage.setItem("estilo", estilo);        
}

function recuperarEstilo(){
    var result = window.localStorage.getItem("estilo");
    return result;
}

