<?php

/**
 * Created by PhpStorm.
 * User: andreymiskov
 * Date: 21.12.14
 * Time: 22:45
 */
class Album extends Eloquent {
	public $timestamps = false;

	public function scopeTriplePeriod($query)
	{
		return $query->where('title', 'LIKE', '...%');
	}
}
