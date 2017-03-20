/**
 *
 *
 * @param wod    Object with WOD parameters
 * @param rounds Rounds passed if it's not first time. When WOD is started there are no rounds.
 *               When new round is started than this is current round number.
 */
function doTimer(wod, rounds) {
    var elapsedTime = 0,
        exerciseNumber = 1;

    var workTimer = null,
        restTimer = null;

    // WOD data
    var work = wod.exerciseWork,
        rest = wod.exerciseRest,
        exercisesQty = wod.exercises.length,
        roundsRest = wod.roundsRest;

    rounds = (rounds !== undefined) ? rounds : wod.rounds;
    console.log('init rounds: ' + rounds);

    rounds = rounds ? rounds : wod.rounds;
    count();
    function count() {
        $(document).trigger('startExercise', [exerciseNumber]);

        workTimer = window.setInterval(function () {
            elapsedTime += 1;

            $(document).trigger({
                type: 'secondLeft',
                now: 'work',
                elapsed: elapsedTime,
                work: work
            });


            // Rest after exercise
            if (elapsedTime == work) {

                // Activate next exercise
                ++exerciseNumber;

                $(document).trigger({
                    type: 'restStart',
                    exerciseNumber: exerciseNumber
                });

                // Flush work
                clearInterval(workTimer);

                // Flush time
                elapsedTime = 0;


                // There are unfinished exercises
                if (exerciseNumber <= exercisesQty) {
                    restTimer = window.setInterval(function () {
                        elapsedTime += 1;

                        $(document).trigger({
                            type: 'secondLeft',
                            now: 'rest',
                            rest: rest,
                            elapsed: elapsedTime
                        });

                        // Start new exercise
                        if (elapsedTime == rest) {
                            clearInterval(restTimer);
                            elapsedTime = 0;
                            $('#exerciseNumber').html(exerciseNumber);
                            count();
                        }
                    }, 1000);
                } else { // All exercises are finished

                    $(document).trigger({type: 'roundFinished'});

                    rounds -= 1;

                    if(rounds > 0) {
                        var i = 0,
                            n = roundsRest;

                        // Rest between rounds
                        (function loop() {
                            if (n--) {
                                setTimeout(function() {
                                    $(document).trigger({
                                        type: 'secondLeft',
                                        now: 'roundRest',
                                        rest: roundsRest,
                                        elapsed: ++i,
                                        round: true
                                    });

                                    loop();
                                }, 1000);
                            } else {
                                // Start new round
                                $(document).trigger({
                                    type: 'newRound',
                                    rounds: rounds
                                });
                            }
                        })();
                    } else {
                        alert('WOD is finished!');
                        // WOD is finished
                        $(document).trigger({type: 'wodFinished'});
                    }
                }
            }
        }, 1000);
    }
}





