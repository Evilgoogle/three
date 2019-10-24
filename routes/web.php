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

        Route::group(['prefix' => 'products'], function () {
            Route::get('', 'ProductController@index');
            Route::get('add', 'ProductController@add');
            Route::get('edit/{id}', 'ProductController@edit');
            Route::post('insert/{id?}', 'ProductController@insert');
            Route::post('change-position', 'ProductController@changePosition');
        });

        Route::group(['prefix' => 'catalog'], function () {
            Route::get('', 'DocsController@index');
            Route::get('filter', 'DocsController@filter');
            Route::get('add', 'DocsController@add');
            Route::get('edit/{id}', 'DocsController@edit');
            Route::post('insert/{id?}', 'DocsController@insert');
            Route::get('remove/{id}', 'DocsController@remove');
            Route::post('remove-image', 'DocsController@removeImage');
            Route::post('enable', 'DocsController@enable');
        });

        Route::group(['prefix' => 'industries'], function () {
            Route::get('', 'IndustriesController@index');
            Route::get('add', 'IndustriesController@add');
            Route::get('edit/{id}', 'IndustriesController@edit');
            Route::post('insert/{id?}', 'IndustriesController@insert');
            Route::get('remove/{id}', 'IndustriesController@remove');
            Route::post('change-position', 'IndustriesController@changePosition');
            Route::post('enable', 'IndustriesController@enable');
        });

        Route::group(['prefix' => 'contacts'], function () {
            Route::get('', 'ContactsController@index');
            Route::post('insert/{id}', 'ContactsController@insert');
        });

        Route::group(['prefix' => 'about'], function () {
            Route::get('', 'AboutController@index');
            Route::post('insert/{id}', 'AboutController@insert');
        });

        Route::group(['prefix' => 'requests'], function () {
            Route::get('', 'ClientRequestController@index');
            Route::get('edit/{id}', 'ClientRequestController@edit');
            Route::post('insert/{id?}', 'ClientRequestController@insert');
            Route::get('remove/{id}', 'ClientRequestController@remove');
            Route::post('enable', 'ClientRequestController@enable');
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
    Route::get('about', 'MainController@about');
    Route::get('catalog/{url?}', 'MainController@catalog');
    Route::get('contacts', 'MainController@contacts');
    Route::post('download', 'MainController@download');
});