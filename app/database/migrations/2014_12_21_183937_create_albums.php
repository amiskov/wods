<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAlbums extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up() {
		Schema::create( 'albums', function ( $table ) {
			$table->increments( 'id' );
			$table->string( 'title' );
			$table->string( 'artist' );
			$table->string( 'genre' );
			$table->integer( 'year' );
		} );
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down() {
		Schema::drop( 'albums' );
	}

}
