$(document).ready(function(){
        var pos = 0;
        var playlistJSON = [{ "title": "Love King", "src": "http://www.youtube.com/embed/AGcQgUnxY14" }, {"title": "Keep on Lovin Me", "src": "http://www.youtube.com/embed/qP1Z3M9G1j0" }, { "title": "Screams of Passion", "src": "http://www.youtube.com/embed/D6zduBiRZw8"}];
        var vidList = [];
        $("#courseVid").attr('src', playlistJSON[pos].src);
        // Autocomplete 
    $(function() {
        var tags = [
            "Clips",
            "Devices",
            "Device Rack",
            "Sampler",
            "Filters"
        ];
        $( "#tags" ).autocomplete({
            source: tags
        });
    });
        // Slide down results
        $("#info").click(function(){
            if( $("#queryResults").css('display') == 'none'){
                $("#queryResults").fadeIn();
                } else {
                $("#queryResults").fadeOut();
            }
        });
        // Slide down announcements
        $("#logo").click(function(){
            if( $("#announce").css('display') == 'none'){
            $("#announce").fadeIn();
            } else {
            $("#announce").fadeOut();
        }
        });
        // Check if announcement has been seen already. Announcement can come to page as JSON and include an expiration date. Set a cookie for the last announcement, so that the script can see if it has already been seen.
        // Generate clickable VidList from JSON
        $.each(playlistJSON, function(i, item) {
            vidList.push('<li id="' + i + '" class="vidListItem">' + item.title + '</li>');
        });
        $("#vidList ul").append( vidList.join( '' ) );
        $("#" + pos).addClass("isPlaying");
        // click to navigate to video
        $(".vidListItem").click(function(){
            pos = this.id;
            $("#courseVid").attr('src', playlistJSON[pos].src);
            $(".isPlaying").removeClass("isPlaying");
            $(this).addClass("isPlaying");
        });
});
        // Previous and Next buttons
        //$("#prev").click(function() {
