var channelName = 'Nintendo';

$(document).ready(function(){
    $("#youtube").click(function(){
        var $this = $(this); //cache the reference
        var ul = $("<ul/>").attr("id","results");
        var grid = $("#youtubeContainer");
        grid.append(ul);

        $("#contenedorFixture").remove();
        $("#tablaPosicion").remove();
        $("#descripcionEquipo").remove();
        $("#tablaEquipos").remove();
        scrollabajo(grid);
        if (!$this.hasClass('disabled')) {
            $.get(
            "https://www.googleapis.com/youtube/v3/channels",{
                part: 'contentDetails',
                forUsername: channelName,
                key: 'AIzaSyALhNyYFvHIDRQJrZAqKg2mD0kpxZeXpqo'},
                function(data){
                    $.each(data.items, function(i, item){
                        pid = item.contentDetails.relatedPlaylists.uploads;
                        getVids(pid);
                    });
                }
            );
        }
    });
});

function getVids(pid){
    $.get(
        "https://www.googleapis.com/youtube/v3/playlistItems",{
            part: 'snippet',
            maxResults: 1,
            playlistId: pid,
            key: 'AIzaSyALhNyYFvHIDRQJrZAqKg2mD0kpxZeXpqo'},
            function(data){
                var output;
                $.each(data.items, function(i, item){
                    videTitle = item.snippet.title;
                    videoId= item.snippet.resourceId.videoId;
                    output = '<li><iframe width="1240" height="600" src="https://www.youtube.com/embed/'+videoId+'"></iframe></li>'; 
                     //Append to results listStyleType
                    $('#results').append(output);
                });
            }

        );
}