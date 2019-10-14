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

<div class="header header_fix">
    <header>
        <div class="bar">
            <div class="contain">
                <a href="/" class="logo"><img src="/images/logo.svg" alt="lovestyle.kz"></a>
                <div class="panel">
                    <button class="js_search"></button>
                    <a href="/cart" class="buy"></a>
                    <a href="/favourite" class="favourite"></a>
                    <button class="js_mobile_nav"></button>
                </div>
            </div>
        </div>
        <nav>
            <div class="mobile_head">
                <div class="contain">
                    <a href="/" class="logo"><img src="/images/logo.svg" alt="lovestyle.kz"></a>
                    <button class="js_close_nav"></button>
                </div>
            </div>
            <ul>
                <li><a href="/product-catalog">Каталог товаров <span class="a_animate"></span></a></li>
                <li><a href="/delivery">Доставка и оплата <span class="a_animate"></span></a></li>
                <li><a href="/stocks">Акции! <span class="a_animate"></span></a></li>
                <li><a href="/reviews">Обзоры <span class="a_animate"></span></a></li>
                <li><a href="/articles">Статьи <span class="a_animate"></span></a></li>
                <li><a href="/contacts">Контакты <span class="a_animate"></span></a></li>
            </ul>
        </nav>
    </header>
    <div class="block_search">
        <div class="line"></div>
        <form method="get" action="/search">
            {{-- csrf_field() --}}
            <label>
                <button type="submit" class="icon"></button>
                <input type="text" name="title" placeholder="|">
            </label>
            <div class="arrow"></div>
        </form>
    </div>
</div>

<main>
    @if(isset($breadcrumbs))
        <div class="contain">
            @include('pages.templates.breadcrumbs', ['breadcrumbs' => $breadcrumbs])
        </div>
    @endif

    @yield('app_content')
</main>

<footer>
    <div class="contain">
        <div class="top">
            <a href="/warranty-and-return" class="bn">Гарантии и возврат <span class="a_animate"></span></a>
            <a href="/about" class="bn">О компании <span class="a_animate"></span></a>
            <a href="/how-to-order" class="bn">Как заказать? <span class="a_animate"></span></a>
            <a href="tel: {{ $contacts->phone }}" class="bn">{{ $contacts->phone }} <span class="a_animate"></span></a>
        </div>
        <div class="info">
            LoveStyle.kz – мы за построение доверительных отношений между людьми, за крепкие семьи и свободную жизнь от предрассудков.
        </div>
        <div class="center">
            <div class="bn">
                <b>Следите за нами</b>
                <a href="https://www.instagram.com/lovestyle.kz/" class="insta">
                    <i class="fab fa-instagram"></i>
                    <span>Instagram</span>
                </a>
            </div>
            <div class="bn">
                <b>Режим работы</b>
                <div>ПН -ВС 10:00 – 20:00</div>
            </div>
            <div class="bn">
                <button class="pic_block js_map"><span>Показать на карте</span></button>
                <button class="pic_block js_feedback"><span>Обратная связь</span></button>
                <button class="pic_block js_protect"><span>Защита от детей</span></button>
                <a href="{{ asset('/libs/oferta.pdf') }}" class="pic_block js_protect" target="_blank"><span>Договор оферты</span></a>
            </div>
            <form id="mailing">
                <label>Подписка на рассылки</label>
                <input type="text" placeholder="Ваш e-mail">
                <button type="submit"><span>Подписаться</span></button>
            </form>
        </div>
        <div class="bottom">
            <div class="left">&copy LoveStyle, 2019. Alright reserve</div>
            <a href="http://emotionsgroup.kz" target="_blank" class="right">Powered by EmotionsGroup, 2019</a>
        </div>
    </div>
    <div class="map">
        <button class="close_map"></button>
        <div id="map" data-lat="{{ $contacts->lat}}" data-lng="{{ $contacts->lng }}"></div>
    </div>
</footer>

<div id="modal_buy" class="modal_block">
    <div class="modal">
        <div class="flipper">
            <div class="front">
                <form action="/order-paybox" id="js_form_buy" method="post">
                    {{ csrf_field() }}
                    <div class="js_right_away"></div>
                    <button type="button" class="js_modal_cose"></button>
                    <label>
                        <small>Ваше имя*</small>
                        <input type="text" name="name">
                    </label>
                    <label>
                        <small>Ваш мобильный телефон*</small>
                        <input type="text" name="phone" class="phone">
                    </label>
                    <div class="flex">
                        <label class="js_type radio" data-delivery="on">
                            <span>Доставка</span>
                            <input type="radio" name="delivery_method" value="Доставка">
                        </label>
                        <label class="js_type radio active">
                            <span>Самовывоз</span>
                            <input type="radio" name="delivery_method" checked value="Самовывоз">
                        </label>
                    </div>
                    <div class="js_modal_delivery">
                        <label>
                            <small>Город*</small>
                            <input type="text" name="city">
                        </label>
                        <label>
                            <small>Адрес доставки*</small>
                            <input type="text" name="address">
                        </label>
                        <div class="flex">
                            <label class="js_type_buy radio active js_type_buy_money" data-type_buy="money">
                                <svg xmlns="http://www.w3.org/2000/svg" width="97.444" height="47.806" viewBox="0 0 97.444 47.806">
                                    <g id="Group_325" data-name="Group 325" transform="translate(-41.256 -369.194)">
                                        <path id="Path_195" data-name="Path 195" d="M132.7,369.194H41.256V411H132.7ZM61.025,379.71H43.256v-8.516H61.025Zm25.953,23.419A12.451,12.451,0,1,1,99.43,390.677,12.452,12.452,0,0,1,86.978,403.129ZM130.7,409H112.93v-8.516H130.7Z" fill="#fff"/>
                                        <path id="Path_196" data-name="Path 196" d="M135.7,371.193h-2V412H43.256v2H135.7Z" fill="#fff"/>
                                        <path id="Path_197" data-name="Path 197" d="M136.7,374.193V415H46.256v2H138.7V374.193Z" fill="#fff"/>
                                    </g>
                                </svg>
                                <span>Наличными</span>
                                <input type="radio" name="pay_method" checked value="Наличными">
                            </label>
                            <label class="js_type_buy radio" data-type_buy="bank">
                                <svg xmlns="http://www.w3.org/2000/svg" width="77.848" height="47.806" viewBox="0 0 77.848 47.806">
                                    <g id="Group_326" data-name="Group 326" transform="translate(-156.194 -369.194)">
                                        <path id="Path_198" data-name="Path 198" d="M156.194,411.331A5.669,5.669,0,0,0,161.863,417h66.51a5.669,5.669,0,0,0,5.669-5.669v-3.589H156.194Z" fill="#201600"/>
                                        <path id="Path_199" data-name="Path 199" d="M228.373,369.194h-66.51a5.669,5.669,0,0,0-5.669,5.669v26.879h77.848V374.863A5.669,5.669,0,0,0,228.373,369.194Zm-19.126,21.483H164.215v-6h45.032Zm16.774,0H211.569v-6h14.452Z" fill="#201600"/>
                                    </g>
                                </svg>
                                <span>Банковской картой</span>
                                <input type="radio" name="pay_method" value="Банковской картой">
                            </label>
                        </div>
                    </div>
                    <button type="submit" class="button button_buy"><span>Заказать</span></button>
                </form>
            </div>
            <div class="back">
                <button class="js_modal_cose"></button>
                <div class="block">
                    <div class="icon"></div>
                    <div class="title">Спасибо за заказ</div>
                    <div class="desc">мы свяжеться с Вами как только ваш заказ будет готов!</div>
                    <div class="desc">Номер заказа: <span class="js_payment_number"></span></div>
                    <div class="desc">Время заказа: <b class="js_payment_date"></b></div>
                    <div class="desc">Общая сумма: <b class="js_payment_sum"></b></div>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="modal_reviews" class="modal_block">
    <div class="modal">
        <div class="flipper">
            <div class="front">
                <form id="js_form_reviews">
                    <input type="hidden" name="good_id" class="js_good_id_review">
                    <button type="button" class="js_modal_cose"></button>
                    <label>
                        <small>Ваше имя*</small>
                        <input type="text" name="name">
                    </label>
                    <label>
                        <small>Ваша почта*</small>
                        <input type="text" name="email">
                    </label>
                    <label>
                        <small>Отзыв</small>
                        <textarea name="text"></textarea>
                    </label>
                    <button type="submit" class="button button_review"><span>Написать</span></button>
                </form>
            </div>
            <div class="back">
                <button class="js_modal_cose"></button>
                <div class="block">
                    <div class="icon"></div>
                    <div class="title">Спасибо за отзыв</div>
                    <div class="desc">ваш отзыв появится как только его одобрят!</div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="window18 {{ !isset($_COOKIE['window18']) ? 'active_18' : '' }}">
    <div class="block">
        <div class="icon"></div>
        <div class="text">Вам есть 18+ лет?</div>
        <div class="pick">
            <button class="js_window_ok">Да, я остаюсь!</button>
            <a href="https://www.google.com/"><span>Нет, я ухожу!</span></a>
        </div>
    </div>
</div>
<div class="overlay" id="overlay"></div>

<!-- FontAwesome -->
<link href="{{ mix('css/fontawesome.css') }}" rel="stylesheet">

<!-- WebSite JS -->
<script src="{{ asset('/js/jquery.min.js') }}"></script>
<!-- Google map JS -->
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCXrKE5h-QaBB_NDgmMqTzEDaAj4NzM9Wk"></script>
<script src="{{ asset('/js/app.js') }}"></script>

<!-- Selectric -->
<script src="{{ asset('libs/selectric/public/jquery.selectric.min.js') }}"></script>

<!-- Yandex.Metrika counter -->
<script type="text/javascript" >
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

    ym(55064191, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
    });
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/55064191" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->

</body>
</html>
