var exercises;
WODs.forEach(function (wod, index) {
    var totalTime = calculateTotalTime(wod);
    var img = '<a class="wods__link" href="workout/' + wod.youtubeID + '">' +
                  '<img src="//i.ytimg.com/vi/' + wod.youtubeID + '/mqdefault.jpg">' +
                  '<span class="time">' + secondsToTime(totalTime) + '</span>' +
              '</a>';
    var html;

    exercises = '';

    wod.exercises.forEach(function (exercise, index) {
        exercises += '<li>' + exercise.name + '</li>';
    });


    html = '<li class="wods__item">' +
                img +
                '<ol class="wod__exercises">' + exercises + '</ol>' +
           '</li>';

    $('#wodsList').append(html);

});





