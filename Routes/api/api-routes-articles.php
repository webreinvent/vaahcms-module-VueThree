<?php


Route::group(
    [
    'prefix' => 'vuethree/articles',
    'namespace' => 'Backend',
    ],
    function () {
        //---------------------------------------------------------
        Route::get('/assets', 'ArticlesController@getAssets')
            ->name('vh.backend.vuethree.api.articles.assets');
        //---------------------------------------------------------
        Route::get('/', 'ArticlesController@getList')
            ->name('vh.backend.vuethree.api.articles.list');
        //---------------------------------------------------------
        Route::post('/{id}', 'ArticlesController@createItem')
            ->name('vh.backend.vuethree.api.articles.create');
        //---------------------------------------------------------
        Route::get('/{id}', 'ArticlesController@getItem')
            ->name('vh.backend.vuethree.api.articles.read');
        //---------------------------------------------------------
        Route::match(['put', 'patch'], '/{id}', 'ArticlesController@updateItem')
            ->name('vh.backend.vuethree.api.articles.update');
        //---------------------------------------------------------
        Route::delete('/{id}', 'ArticlesController@deteleItem')
            ->name('vh.backend.vuethree.api.articles.delete');
        //---------------------------------------------------------
    });
