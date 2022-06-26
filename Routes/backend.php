<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(
    [
        'prefix'     => 'backend/vuethree',
        'middleware' => ['web', 'has.backend.access'],
        'namespace' => 'Backend',
    ],
    function () {
        //------------------------------------------------
        Route::get( '/', 'BackendController@index' )
            ->name( 'vh.backend.vuethree' );
        //------------------------------------------------
        //------------------------------------------------
        Route::post( '/assets', 'BackendController@getAssets' )
            ->name( 'vh.backend.vuethree.assets' );
        //------------------------------------------------
    });


include("backend/routes-articles.php");
