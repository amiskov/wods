<?php
class WorkoutController extends BaseController {
	// Whole workouts list
	public function showIndex() {
		return View::make('workouts');
	}

	// Single workout page
	public function showSingle($ytID) {
		return View::make('workout')->with('ytID', $ytID);
	}

}