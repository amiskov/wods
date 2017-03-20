// Prepare Youtube API
var tag = document.createElement('script');
tag.src = "//www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Video player variables
var timeUpdater = null,
    player = null,
    counter = 0,
    ytVideo = null,
    repeater = null;

// Add player to page
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        //width: '640',
        //height: '360',
        width: '853',
        height: '480',
        videoId: WODInfo.youtubeID,
        events: {
            'onReady': onPlayerReady
        }
    });
}

// The API will call this function when the video player is ready
function onPlayerReady(event) {
    ytVideo = event.target;

    ytVideo.setPlaybackQuality('medium');

    // Switch off sound
    player.mute();





    //
    // Events
    //
    $(document).on('startExercise', {}, function (event, exerciseNumber) {
        // Mark current exercise
        $('#wodList').find('li').removeClass('current');
        $($('#wodList').find('li').get(exerciseNumber - 1)).addClass('current');

        // Show exercise title
        $('#actionTitle').html(WODInfo.exercises[exerciseNumber - 1].name);

        setTimeout(function () {
            bell.play();
        }, 1000);

        if(exerciseNumber == 1) {
            playVideo(false, exerciseNumber);
        }
    });

    $(document).on('restStart', {}, function (event) {
        playVideo(false, event.exerciseNumber);

        setTimeout(function() {
            $('#wodList').find('li.current')
                .addClass('done').removeClass('current')
                .next().addClass('current');
        }, 1000);
        ten.play();
    });

    $(document).on('secondLeft', {}, function (event) {
        var now = event.now;

        var delta;
        var text;

        // Exercise progress indicator
        if (now == 'work') {
            // Move progress bar
            $('#progressBar').removeClass('progress__bar_rest').addClass('progress__bar_work').css({
                width: event.elapsed / event.work * 100 + '%'
            });

            text = secondsToTime(event.elapsed);
        } else if (now == 'rest') {
            delta = event.rest - event.elapsed;
            text = secondsToTime(delta);

            // Move progress bar
            var width = event.elapsed / event.rest * 100;
            $('#progressBar').removeClass('progress__bar_work').addClass('progress__bar_rest').css({
                width: (100 - width) + '%'
            });
        } else if (now == 'roundRest') {
            delta = event.rest - event.elapsed;
            text = secondsToTime(delta);

            // Say what's going on
            $('#actionTitle').text('Round completed!');

            $('#progressBar').removeClass('progress__bar_work').addClass('progress__bar_rest').css({
                width: (100 - event.elapsed / event.rest * 100) + '%'
            });
        }

        $('#progressTime').text(text);

        // Increase total time
        $('#totalTime').html(secondsToTime(--totalTime));
    });






    $('#btnStart').on('click', function () {
        $(document).trigger({type: 'wodStart'});
        $('.btn_start').hide();
        $('.btn_stop').show();
    });
    $('#btnStop').on('click', function () {
        window.location.reload();
    });

    setTimeout(function() {
        $('.btn').prop('disabled', false);
    }, 500);



// By Chris Coyier & tweaked by Mathias Bynens

    //$(function() {

        // Find all YouTube videos
        var $allVideos = $("iframe[src^='https://www.youtube.com']"),

        // The element that is fluid width
            $fluidEl = $(".wod__video");

        // Figure out and save aspect ratio for each video
        $allVideos.each(function() {

            $(this)
                .data('aspectRatio', this.height / this.width)

                // and remove the hard coded width/height
                .removeAttr('height')
                .removeAttr('width');

        });

        // When the window is resized
        // (You'll probably want to debounce this)
        $(window).resize(function() {

            var newWidth = $fluidEl.width();

            // Resize all videos according to their own aspect ratio
            $allVideos.each(function() {

                var $el = $(this);
                $el
                    .width(newWidth)
                    .height(newWidth * $el.data('aspectRatio'));
                
                console.log(newWidth, newWidth * $el.data('aspectRatio'));

            });

            // Kick off one resize to fix all videos on page load
        }).resize();

    //});

}


var totalTime = calculateTotalTime(WODInfo);

$('#totalTime').html(secondsToTime(totalTime));

function playVideo(isReplay, exerciseNumber) {
    var exercise;

    if (exerciseNumber !== undefined) {
        pauseVideo();
        counter++;
        exercise = WODInfo.exercises[exerciseNumber - 1];

    } else {
        exercise = WODInfo.exercises[counter];
    }

    // Exercise exists, round is not finished
    if (exercise !== undefined) {


        // Play video from certain time
        var startTime = exercise.startTime.split(':');
        startTime = parseInt(startTime[0] * 60, 10) + parseInt(startTime[1], 10);
        var endTime = startTime + 10;

        ytVideo.seekTo(startTime);
        ytVideo.playVideo();

        ytVideo.timeupdate = function () {
            var videoObj = document.getElementById('video');

            if (videoObj.currentTime == endTime) {
                videoObj.currentTime = startTime;
            }
        };

        // http://stackoverflow.com/questions/10175367/youtube-api-event-on-a-specified-time
        function updateTime() {
            var videoTime = startTime;

            if (player && player.getCurrentTime) {
                videoTime = player.getCurrentTime();
            }
            if (videoTime !== startTime) {
                onProgress(videoTime, endTime);
            }
        }

        timeUpdater = setInterval(updateTime, 500);

        var t = endTime - startTime;
        if (!isReplay) {
            repeater = setTimeout(function () {
                clearInterval(timeUpdater);
                counter++;
                playVideo(false, exerciseNumber);
            }, t * 1000);
        }

    } else {
        pauseVideo();
    }
}

// Show WOD title and exercises
var list = '';
WODInfo.exercises.forEach(function (exercise, index) {
    list += '<li>' +
                '<span class="title">' +
                    '<span class="number">' + (index + 1) + '.</span>' +
                    '<span class="text">' + exercise.name + '</span>' +
                '</span>' +
                '<span class="time"></span>' +
                '<div class="loader"></div>' +
                '<div class="preloader"></div>' +
            '</li>';
});

$('#wodTitle').html(WODInfo.name);
$('#wodList').html(list);


$(document).on('wodStart', {}, function () {
    // Start workout timer
    doTimer(WODInfo);

    refreshExercisesList()
});

$(document).on('newRound', {}, function (event) {
    doTimer(WODInfo, event.rounds);
    refreshExercisesList()
});


function refreshExercisesList() {
    $('.list').find('li').removeClass('current, done')
}

// Round is done
$(document).on('roundFinished', {}, function () {
    pauseVideo();

    setTimeout(function () {
        gong.play();
    }, 1100);
});

$(document).on('wodFinished', {}, function () {
    stopVideo();
    gong.play();
});


// Repeat period
function onProgress(currentTime, endTime) {
    if (currentTime >= endTime) {
        clearInterval(timeUpdater);
        playVideo(true);
    }
}

function pauseVideo() {
    player.pauseVideo();
    clearTimeout(repeater);
    clearInterval(timeUpdater);
}

function stopVideo() {
    player.stopVideo();
    clearTimeout(repeater);
    clearInterval(timeUpdater);
}

// Sounds
var bell = document.getElementById("bell"),
    ten = document.getElementById("ten"),
    gong = document.getElementById("gong");


