<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get( '/', 'WorkoutController@showIndex' );

// Pass Youtube ID to workout page and render it via 'workout.blade.php'
Route::get( 'workout/{ytID}', 'WorkoutController@showSingle' );

Route::get( '/test', function () {
	echo '<pre>';
	$collection = Album::all();

	$collection->sort(function($a, $b)
	{
		$a = $a->year;
		$b = $b->year;

		if($a === $b) {
			return 0;	
		}

		return ($a > $b) ? 1 : -1;
	});

	$collection->each(function($album)
	{
		var_dump($album->year);
	});

} );



