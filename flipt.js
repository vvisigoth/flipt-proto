$(document).ready(function(){
        function test1() {
            alert('test');
        }
        var instructions = "Looks like that question is new. Go ahead and enter the details of your question in this box and check the box below to be notified when an answer is posted!"
        function showNewQuestion(){
            $("#questionBar").slideUp();
            $("#newQuestion").show(200);
            $("#queryResults").slideUp();
            var newQuestionTitle = $("#tags").attr('value');
            $("#questionTitle").attr('value', newQuestionTitle);

        }
        function hideNewQuestion() {
            $("#newQuestion").slideUp();
            $("#questionBar").slideDown();
        }

        function showResults(){
            if( $("#queryResults").css('display') == 'none'){
                $("#queryResults").fadeIn();
                }else {
                //$("#queryResults").fadeOut();
            }
        }

        function postNewQuestion(title){
            $("#newQuestion").fadeOut();
            $("").replaceAll("#queryResults ul li");
            $("#queryResultsUl").append( '<li id="questionSuccess" class="resultTitle">' + title + '</li><ul><li class="resultExcerpt"> <span class="noAnswer">No Answer...yet.</span></li></ul>');
            // Most of this stuff will have to be modified on deploy, for prototype
            var newQuestionJSON = [{"resultTitle": title, "resultExcerpt": "No Answer...yet.", "answeredBy": ""}];
            tags.push(title);
            // Change the source for autocomplete after initialization
            $("#tags").autocomplete("option", "source", tags);
            resultsDictJSON[title] = newQuestionJSON;
            showResults();
            $("#tags").attr('value', "")
            $("#questionBar").slideDown();
            $("#queryResults ul li").delay(1200).fadeOut('slow');
        }
        

        var pos = 0;
        var tags = [
            "Clips",
            "Devices",
            "Device Racks",
            "Sampler",
            "Filters"
        ];
        var playlistJSON = [{ "title": "Love King", "src": "http://www.youtube.com/embed/AGcQgUnxY14" }, {"title": "Keep on Lovin Me", "src": "http://www.youtube.com/embed/qP1Z3M9G1j0" }, { "title": "Screams of Passion", "src": "http://www.youtube.com/embed/D6zduBiRZw8"}];
        var resultsJSON = [{ "resultTitle": "What time is Workaholics on?", "resultExcerpt": "Dunno, ask Anthony."}, {"resultTitle": "Is Futurama better than the Simpsons?", "resultExcerpt": "I keep on hearing that it is, but I'm not so sure..."}]
        var filterJSON = [{ "resultTitle": "What is the best type of filter to use on a bassline?", "resultExcerpt": "I tend to use a low-pass filter, but it really depends", "answeredBy": "anthonyarroyo"}, { "resultTitle": "How can I MIDI map the filter type?", "resultExcerpt": "You actually can't map filter type to a button. You have to map it to a knob, so that you can scroll through them.", "answeredBy": "AfroDJMac"}]
        var deviceRackJSON = [{ "resultTitle": "Is there a maximum number of chains in a device rack?", "resultExcerpt": "I don't think that there is a hard limit, but at some point it becomes unwiedly. I usually try to keep it under at least 128, since after that you can't effectively use the chain selector.", "answer_1": "Answer", "answeredBy": "anthonyarroyo"}, { "resultTitle": "How can you assign more than 8 macros?", "resultExcerpt": "You can only assign 8 macros, after that you have to use MIDI controllers.", "answer_1": "Answer", "answeredBy": "AfroDJMac"}]
        var resultsDictJSON = { "Filters": filterJSON, "Device Racks": deviceRackJSON }
        var vidList = [];
        var answerList = [];
        var results = [];
        var deactivateVidNav = function(pos){
            if (pos == playlistJSON.length - 1){
                $("#next").addClass("deactivated");
                } else {
                $("#next").removeClass("deactivated");
            }
            if (pos == 0){
                $("#prev").addClass("deactivated");
                } else {
                $("#prev").removeClass("deactivated");
            }
        };

        function resultsList(key) {
            $.each(resultsDictJSON[key], function(i, item) {
                if (item.resultExcerpt != "No Answer...yet."){
                results.push('<li id="' + i + '" class="resultTitle">' + item.resultTitle + '</li><ul><li class="resultExcerpt">' + item.resultExcerpt + '<span class="answeredBy">' + item.answeredBy +'</span></li></ul>')
                } else {
                results.push('<li id="' + i + '" class="resultTitle">' + item.resultTitle + '</li><ul><li class="resultExcerpt"><span class="noAnswer">' + item.resultExcerpt + '</spane<span class="answeredBy">' + item.answeredBy +'</span></li></ul>')
                }

            });
            $("#queryResultsUl").append( results.join( '' ) );
            results = [];
        }

        // Prep page at load
        $("#courseVid").attr('src', playlistJSON[pos].src);
        deactivateVidNav(pos);
        $("#newQuestion").css('display', 'none');
        $("textarea").val(instructions);
        $("textarea").css('color', 'grey');
        // Populate Answer Page
        
        // Autocomplete 
    $(function() {
        $( "#tags" ).autocomplete({
        
            source: tags
        });
    });
        // Slide down results
        // Slide down announcements
        $("#logo").click(function(){
            if( $("#announce").css('display') == 'none'){
            $("#announce").slideDown();
            } else {
            $("#announce").fadeOut();
        }
        });
        // Check if announcement has been seen already. Announcement can come to page as JSON and include an expiration date. Set a cookie for the last announcement, so that the script can see if it has already been seen.

        // Generate clickable VidList from JSON
        // TODO replace this whole thing with the YT javascript API: Time stamp questions, make sure that prev, next works with sorted list
        $.each(playlistJSON, function(i, item) {
            vidList.push('<li id="' + i + '" class="vidListItem">' + item.title + '</li>');
        });
        $("#vidList ul").append( vidList.join( '' ) );
        $("#" + pos).addClass("isPlaying");
        //vidListIteam to navigate to video
        $(".vidListItem").click(function(){
            pos = this.id;
            $("#courseVid").attr('src', playlistJSON[pos].src);
            $(".isPlaying").removeClass("isPlaying");
            $(this).addClass("isPlaying");
            deactivateVidNav(pos);
        });
        // List of results from JSON to display in #queryResults
        // Previous and Next buttons
        $("#prev").click(function() {
            if (pos != 0){
            pos --;
            $(".isPlaying").removeClass("isPlaying");
            $("#" + pos).addClass("isPlaying");
            $("#courseVid").attr('src', playlistJSON[pos].src);
            } else{
        }
            deactivateVidNav(pos);
        });

        $("#next").click(function() {
            if (pos < playlistJSON.length - 1){
            pos ++;
            $(".isPlaying").removeClass("isPlaying");
            $("#" + pos).addClass("isPlaying");
            $("#courseVid").attr('src', playlistJSON[pos].src);
            } else {
        }
            deactivateVidNav(pos);
        });
        // Intercept submission, fadeIn results in INFO
        // TODO There is a bug on repeated question submission. My guess is that it is related to global v local variables
        $("#questionAsk").submit(function(){
            //$("#queryResults").fadeOut('fast');
            $("").replaceAll("#queryResults ul li");
            var submission = $("#tags").attr('value');
            if (submission != "Have a question? Ask it here!") {
                if (submission in resultsDictJSON){
                resultsList(submission);
                showResults();
                return false;
                } else {
                showNewQuestion();
                return false;
                }
            } else {
            alert("You don't have any questions?");
            return false;
        }
        });
        // Hide newQuestion on cancel
        $("#newQuestionCancel").click(function(){
            hideNewQuestion();
        });
        // Post a new question
        $("#newQuestionSubmit").click(function(){
            var title = $("#questionTitle").attr('value')
            postNewQuestion(title);

            return false;
        });
        $("textarea").focus(function(){
            if ( $("textarea").val() == instructions ){
                $("textarea").val("");
                $("textarea").css('color', 'black');
            }
            });
        $("textarea").blur(function(){
            if ( $("textarea").val() == "" ){
                $("textarea").css('color', 'grey');
                $("textarea").val(instructions);
            }
            });
        $(function() {
                $("#vidList ul").sortable();
                });

});
