function scrollabajo(container){
    $(container).show();
    $('html, body').animate({
        scrollTop: $(container).offset().top
        }, 500);
}

function scrollarriba(container, object){
    $(container).remove();
    $('html, body').animate({
        scrollTop: $("#cabeza").offset().top
        }, 500);
    object.removeClass('disabled');
}