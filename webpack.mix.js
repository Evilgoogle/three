let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/app.js', 'public/js')
    .js('resources/assets/js/admin.js', 'public/js')
    .sass('resources/assets/styles/text_editor.scss', 'public/css')
    .sass('resources/assets/styles/fontawesome.scss', 'public/css')
    .sass('resources/assets/styles/app.scss', 'public/css')
    .sass('resources/assets/styles/admin.scss', 'public/css').version();
