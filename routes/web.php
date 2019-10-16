<?php

Route::group(['middleware' => 'web'], function () {

    Auth::routes();

    Route::group(['prefix' => 'admin', 'namespace' => 'Admin', 'middleware' => ['auth', 'role:superadmin']], function () {

        Route::get('', 'AdminController@index');

        Route::group(['prefix' => 'profile'], function () {
            Route::get('', 'ProfileController@index');
            Route::post('update/', 'ProfileController@profileUpdate');
            Route::get('change-password', 'ProfileController@changePassword');
            Route::post('update-password/', 'ProfileController@updatePassword');
        });

        Route::group(['prefix' => 'param'], function () {
            Route::post('add-param', 'AdminController@addParam');
        });
        Route::post('removeArrJson', 'AdminController@removeArrJson');

        Route::group(['prefix' => 'config'], function () {
            Route::get('', 'ConfigController@edit');
            Route::post('update', 'ConfigController@update');
        });

        Route::group(['prefix' => 'seo'], function () {
            Route::get('', 'SeoController@index');
            Route::get('add', 'SeoController@add');
            Route::get('edit/{id}', 'SeoController@edit');
            Route::post('insert/{id?}', 'SeoController@insert');
            Route::get('remove/{id}', 'SeoController@remove');
        });

        Route::group(['prefix' => 'block'], function () {
            Route::get('', 'BlockController@index');
            Route::get('add', 'BlockController@add');
            Route::get('edit/{id}', 'BlockController@edit');
            Route::post('insert/{id?}', 'BlockController@insert');
            Route::get('remove/{id}', 'BlockController@remove');
            Route::post('enable', 'BlockController@enable');
        });

        // --> filemanager
        Route::group(['prefix' => 'admin'], function () {
            Route::post('filemanager', 'AdminController@filemanager');
            Route::post('filemanager_crop', 'AdminController@filemanager_crop');
            Route::post('filemanager_resize', 'AdminController@filemanager_resize');
            Route::post('filemanager_namealt', 'AdminController@filemanager_namealt');
            Route::post('filemanager_del', 'AdminController@filemanager_del');
            Route::post('filemanager_replace', 'AdminController@filemanager_replace');
            Route::post('filemanager_search', 'AdminController@filemanager_search');
            Route::post('filemanager_paginator', 'AdminController@filemanager_paginator');
            Route::match(['get', 'post'], 'filemanager_load', 'AdminController@filemanager_load');
        });

        Route::group(['prefix' => 'language'], function () {
            Route::get('', 'LangController@index');
            Route::get('add', 'LangController@add');
            Route::get('edit/{id}', 'LangController@edit');
            Route::post('insert/{id?}', 'LangController@insert');
            Route::get('remove/{id}', 'LangController@remove');
            Route::post('change-position', 'LangController@changePosition');
            Route::post('remove-image', 'LangController@removeImage');
            Route::post('enable', 'LangController@enable');
            Route::post('default_lang', 'LangController@default_lang');
        });

        Route::group(['prefix' => 'language_interface'], function () {
            Route::get('', 'LangInterfaceController@index');
            if(config('myconfig.language_developer')) {
                Route::get('add', 'LangInterfaceController@add');
            }
            Route::get('edit/{id}', 'LangInterfaceController@edit');
            Route::post('insert/{id?}', 'LangInterfaceController@insert');
            if(config('myconfig.language_developer')) {
                Route::get('remove/{id}', 'LangInterfaceController@remove');
            }
            Route::post('change-position', 'LangInterfaceController@changePosition');
        });

        Route::post('filemanager_imageUpload', 'AdminController@filemanager_imageUpload');

        Route::group(['prefix' => 'access', 'middleware' => ['role:superadmin']], function () {
            Route::get('', 'AccessController@index');

            Route::group(['prefix' => 'users'], function () {
                Route::get('add', 'AccessController@addUser');
                Route::post('create', 'AccessController@createUser');
                Route::get('edit/{id}', 'AccessController@editUser');
                Route::post('update/{id}', 'AccessController@updateUser');
                Route::get('remove/{id}', 'AccessController@removeUser');
            });

            Route::group(['prefix' => 'roles'], function () {
                Route::get('add', 'AccessController@addRole');
                Route::post('create', 'AccessController@createRole');
                Route::get('edit/{id}', 'AccessController@editRole');
                Route::post('update/{id}', 'AccessController@updateRole');
                Route::get('remove/{id}', 'AccessController@removeRole');
            });

            Route::group(['prefix' => 'permissions'], function () {
                Route::get('add', 'AccessController@addPermission');
                Route::post('create', 'AccessController@createPermission');
                Route::get('edit/{id}', 'AccessController@editPermission');
                Route::post('update/{id}', 'AccessController@updatePermission');
                Route::get('remove/{id}', 'AccessController@removePermission');
            });
        });

        /*
       |--------------------------------------------------------------------------
       | WebSite
       |--------------------------------------------------------------------------
       */

        Route::group(['prefix' => 'category'], function () {
            Route::get('', 'CategoryController@index');
            Route::get('add', 'CategoryController@add');
            Route::get('edit/{id}', 'CategoryController@edit');
            Route::post('insert/{id?}', 'CategoryController@insert');
            Route::get('remove/{id}', 'CategoryController@remove');
            Route::post('enable', 'CategoryController@enable');
            Route::post('change-position', 'CategoryController@changePosition');
            Route::post('remove-image', 'CategoryController@removeImage');
        });

        Route::group(['prefix' => 'slider'], function () {
            Route::get('', 'SliderController@index');
            Route::get('add', 'SliderController@add');
            Route::get('edit/{id}', 'SliderController@edit');
            Route::post('insert/{id?}', 'SliderController@insert');
            Route::post('enable', 'SliderController@enable');
            Route::get('remove/{id}', 'SliderController@remove');
            Route::post('change-position', 'SliderController@changePosition');
            Route::post('remove-image', 'SliderController@removeImage');
        });

        Route::group(['prefix' => 'item'], function () {
            Route::get('', 'ItemController@index');
            Route::get('filter', 'ItemController@filter');
            Route::get('add', 'ItemController@add');
            Route::get('edit/{id}', 'ItemController@edit');
            Route::post('insert/{id?}', 'ItemController@insert');
            Route::post('enable', 'ItemController@enable');
            Route::get('remove/{id}', 'ItemController@remove');
            Route::post('change-position', 'ItemController@changePosition');
            Route::post('remove-image', 'ItemController@removeImage');
            Route::post('image/change-position', 'ItemController@changeImagePosition');
            Route::post('image', 'ItemController@image');
            Route::post('image-delete', 'ItemController@image_delete');
            Route::post('view-goods', 'ItemController@view_goods');
            //Route::get('import', 'ItemController@import');
            Route::post('import-file', 'ImportController@importItemsFromFile');
            Route::get('search-title', 'ItemController@search');
            Route::get('search-artikul', 'ItemController@search_artikul');
        });

        Route::group(['prefix' => 'orders'], function () {
            Route::get('', 'OrderController@index');
            Route::get('edit/{id}', 'OrderController@edit');
            Route::post('insert/{id?}', 'OrderController@insert');
            Route::get('remove/{id}', 'OrderController@remove');
            Route::post('enable', 'OrderController@enable');
        });

        Route::group(['prefix' => 'pages'], function () {
            Route::get('{url}', 'PageController@index');
            Route::post('insert/{id}', 'PageController@insert');
        });

        Route::group(['prefix' => 'stocks'], function () {
            Route::get('', 'StockController@index');
            Route::get('add', 'StockController@add');
            Route::get('edit/{id}', 'StockController@edit');
            Route::post('insert/{id?}', 'StockController@insert');
            Route::get('remove/{id}', 'StockController@remove');
            Route::post('enable', 'StockController@enable');
            Route::post('change-position', 'StockController@changePosition');
        });

        Route::group(['prefix' => 'reviews'], function () {
            Route::get('', 'ReviewController@index');
            Route::get('add', 'ReviewController@add');
            Route::get('edit/{id}', 'ReviewController@edit');
            Route::post('insert/{id?}', 'ReviewController@insert');
            Route::get('remove/{id}', 'ReviewController@remove');
            Route::post('enable', 'ReviewController@enable');
        });

        Route::group(['prefix' => 'articles'], function () {
            Route::get('', 'ArticlesController@index');
            Route::get('add', 'ArticlesController@add');
            Route::get('edit/{id}', 'ArticlesController@edit');
            Route::post('insert/{id?}', 'ArticlesController@insert');
            Route::get('remove/{id}', 'ArticlesController@remove');
            Route::post('enable', 'ArticlesController@enable');
        });

        Route::group(['prefix' => 'comments'], function () {
            Route::get('', 'CommentController@index');
            Route::get('edit/{id}', 'CommentController@edit');
            Route::post('insert/{id?}', 'CommentController@insert');
            Route::get('remove/{id}', 'CommentController@remove');
            Route::post('enable', 'CommentController@enable');
        });

        Route::group(['prefix' => 'contacts'], function () {
            Route::get('', 'ContactsController@index');
            Route::post('insert/{id}', 'ContactsController@insert');
        });
    });

    Route::post('subscribe', 'MainController@subscribe');
    Route::get('un-subscribe', 'MainController@unSubscribe');
    Route::post('un-subscribing', 'MainController@unSubscribing');
    Route::post('file-uploads', 'MainController@fileUploads');
    Route::post('request', 'MainController@request');


    // Sitemap
    Route::get('sitemap.xml', 'MainController@sitemap');
    Route::get('sitemap-main.xml', 'MainController@sitemap_main');
    Route::get('sitemap-category.xml', 'MainController@sitemap_category');
    Route::get('sitemap-items.xml', 'MainController@sitemap_items');

    // website
    Route::get('', 'MainController@index');
    Route::get('industries', 'MainController@industries');

});