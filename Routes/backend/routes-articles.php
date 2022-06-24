<?php

Route::group(
    [
    'prefix' => 'backend/vuethree/articles',
    
    'middleware' => ['web', 'has.backend.access'],
    
    'namespace' => 'Backend',
],
function () {
     //---------------------------------------------------------
    Route::get('/assets', 'ArticlesController@getAssets')
        ->name('vh.backend.vuethree.articles.assets');
    //---------------------------------------------------------
    Route::get('/', 'ArticlesController@getList')
        ->name('vh.backend.vuethree.articles.list');
    //---------------------------------------------------------
    Route::match(['put', 'patch'], '/', 'ArticlesController@updateList')
        ->name('vh.backend.vuethree.articles.list.updates');
    //---------------------------------------------------------
    Route::delete('/', 'ArticlesController@deleteList')
        ->name('vh.backend.vuethree.articles.list.delete');
    //---------------------------------------------------------
    Route::post('/', 'ArticlesController@createItem')
        ->name('vh.backend.vuethree.articles.create');
    //---------------------------------------------------------
    Route::get('/{id}', 'ArticlesController@getItem')
        ->name('vh.backend.vuethree.articles.read');
    //---------------------------------------------------------
    Route::match(['put', 'patch'], '/{id}', 'ArticlesController@updateItem')
        ->name('vh.backend.vuethree.articles.update');
    //---------------------------------------------------------
    Route::delete('/{id}', 'ArticlesController@deleteItem')
        ->name('vh.backend.vuethree.articles.delete');
    //---------------------------------------------------------

});
