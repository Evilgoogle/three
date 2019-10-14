<!DOCTYPE html>
<html lang="ru" prefix="og: http://ogp.me/ns#">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="google-site-verification" content="txkWRShqy8Lc79o0O6cV8Z210XePetb-YO3VMUcSg-k" />
    <meta name="yandex-verification" content="12b7d7ce7c523501" />

    <?php
    if (isset($seo_new)) $seo = $seo_new;
    ?>
    <title>{{ isset($seo) && !empty($seo->title) ? $seo->title : config('app.name') }}</title>

    <meta name="apple-mobile-web-app-title" content="{{ $seo->title ?? config('app.name') }}">
    <meta name="description" content="{{ $seo->description ?? '' }}">
    <meta name="keywords" content="{{ $seo->keywords ?? '' }}">
    <meta name="author" content="FreeLife">
    <meta name="robots" content="index, follow">

    <!-- Open Graph -->
    <meta property="og:title" content="{{ $seo->title ?? config('app.name') }}">
    <meta property="og:description" content="{{ $seo->description ?? '' }}">
    <meta property="og:url" content="{{ url()->current() }}/">
    <meta property="og:image" content="{{ $seo->image ?? '' }}">
    <meta property="og:image:url" content="{{ $seo->image ?? '' }}">
    <meta property="og:image:width" content="{{ $seo->image_width ?? '' }}">
    <meta property="og:image:height" content="{{ $seo->image_height ?? '' }}">
    <meta property="og:image:type" content="{{ $seo->image_mime ?? '' }}">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="ru">
    <meta property="og:site_name" content="proccess">

    <!-- WebSite CSS -->
    <link href="{{ asset('libs/animate.css') }}" rel="stylesheet">
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">

    <link rel="icon" href="/images/favicon.png" type="image/x-icon">
    <link rel="shortcut icon" href="/images/favicon.png" type="image/x-icon">
    <link rel="apple-touch-icon" href="/images/touch-icon-iphone.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/images/touch-icon-ipad.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/images/touch-icon-iphone-retina.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/images/touch-icon-ipad-retina.png">
    <link rel="canonical" href="{{ strtolower(url()->current()) }}">
</head>
<body>

<main>
    @if(isset($breadcrumbs))
        <div class="contain">
            @include('pages.templates.breadcrumbs', ['breadcrumbs' => $breadcrumbs])
        </div>
    @endif

    @yield('app_content')
</main>

<div class="overlay" id="overlay"></div>

<!-- FontAwesome -->
<link href="{{ mix('css/fontawesome.css') }}" rel="stylesheet">

<!-- WebSite JS -->
<script src="{{ asset('/js/jquery.min.js') }}"></script>
<!-- Google map JS -->
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCXrKE5h-QaBB_NDgmMqTzEDaAj4NzM9Wk"></script>
<script src="{{ asset('/js/app.js') }}"></script>
</body>
</html>
