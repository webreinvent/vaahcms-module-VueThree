<?php

Route::group(
    [
    'prefix' => 'backend/vuethree/articles',

    'middleware' => ['web', 'has.backend.access'],

    'namespace' => 'Backend',
],
function () {
    /**
     * Get Assets
     */
    Route::get('/assets', 'ArticlesController@getAssets')
        ->name('vh.backend.vuethree.articles.assets');
    /**
     * Get List
     */
    Route::get('/', 'ArticlesController@getList')
        ->name('vh.backend.vuethree.articles.list');
    /**
     * Update List
     */
    Route::match(['put', 'patch'], '/', 'ArticlesController@updateList')
        ->name('vh.backend.vuethree.articles.list.updates');
    /**
     * Delete List
     */
    Route::delete('/', 'ArticlesController@deleteList')
        ->name('vh.backend.vuethree.articles.list.delete');
    /**
     * Create Item
     */
    Route::post('/', 'ArticlesController@createItem')
        ->name('vh.backend.vuethree.articles.create');
    /**
     * Get Item
     */
    Route::get('/{id}', 'ArticlesController@getItem')
        ->name('vh.backend.vuethree.articles.read');
    /**
     * Update Item
     */
    Route::match(['put', 'patch'], '/{id}', 'ArticlesController@updateItem')
        ->name('vh.backend.vuethree.articles.update');
    /**
     * Delete Item
     */
    Route::delete('/{id}', 'ArticlesController@deleteItem')
        ->name('vh.backend.vuethree.articles.delete');
    //---------------------------------------------------------

});
