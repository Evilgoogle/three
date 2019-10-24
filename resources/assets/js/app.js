require('./inputmask');
const Swal = require('sweetalert2');
var Swiper = require('swiper/dist/js/swiper');

// Ширина и высота браузера клиента
$clientWidht = document.documentElement.clientWidth;
$clientHeight = document.documentElement.clientHeight;

// WOW JS
var WOW = require('wow.js');
new WOW().init();
//

// Parallax js
const Parallax = require('parallax-js');

$('input.phone').inputmask("+7 (999) 999 9999");

/* Прослушка ориентаций экрана */
var mql = window.matchMedia("(orientation: portrait)");
mql.addListener(function(m) {
    window.location = location.pathname;
});

$(document).ready(function () {

    // nav search
    $('.js_search').click(function () {

        var input = $('#nav_search_input');
        if(input.hasClass('active')) {
            input.removeClass('active');
            setTimeout(function () {
                input.css('display', 'none')
            },300);
        } else {
            input.css('display', 'block')
            setTimeout(function () {
                input.addClass('active');
            },100);
        }
    });

    // main swiper
    var orientation = 'vertical';
    if (window.matchMedia("(orientation: portrait)").matches) {
        orientation = 'horizontal'
    }
    var main_swiper_panel = $('.main_swiper_panel .block').data('blocks');
    var main_swiper  = new Swiper('.main_swiper', {
        direction: orientation,
        pagination: {
            el: '.main_swiper_panel .block',
            clickable: true,
            renderBullet: function (index, className) {
                for (var key in main_swiper_panel) {
                    if(index == key) {
                        return '<button class="bn ' + className + '">' +
                            '<div class="text">'+main_swiper_panel[key].title+'</div>' +
                            '<div class="icon" style="background-image: url(/files/' + main_swiper_panel[key].icon + ')"></div>' +
                            '</button>';
                    }
                }
            },
        },
        speed: 1300,
        navigation: {
            nextEl: '.next',
            prevEl: '.prev',
        },
        effect: 'coverflow',
        grabCursor: true,
        mousewheel: true,
    });

    // Parallax main
   $('.main_swiper .swiper-slide').each(function (key, val) {

       var fon = $(val).children('.fon').children('.zoomer').attr('id'),
           image = $(val).children('.image').attr('id');

       var main_fon = document.getElementById(fon);
       new Parallax(main_fon, {
           scalarX: 26
       });

       var main_image = document.getElementById(image);
       new Parallax(main_image);
   });

   // Gallary
    var gal_slides = 4;
    var gal_stretch = 0;
    if ($clientWidht < 1024) {
        gal_slides = 2;
        gal_stretch = 40
    }
    var swiper_gallary = new Swiper('.swiper_gallary .swiper-container', {
        slidesPerView: gal_slides,
        spaceBetween: 0,
        loop: true,
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        keyboard: {
            enabled: true,
        },
        navigation: {
            nextEl: '.next',
            prevEl: '.prev',
        },
        mousewheel: true,
        coverflowEffect: {
            rotate: 0,
            stretch: gal_stretch,
            depth: 140,
            modifier: 1,
            slideShadows : true
        },
    });

    // Mobile nav
    $('.js_mobile_nav').click(function () {

        $('nav').addClass('active_nav');
    });
    $('.js_close_nav').click(function () {

        $('nav').removeClass('active_nav');
    });

    $('.js_arrow_ind').click(function () {

        var ind = $('#ind_mobile');
        if(ind.hasClass('active_ind_mobile')) {
            ind.removeClass('active_ind_mobile');
        } else {
            ind.addClass('active_ind_mobile');
        }
    });

    // Map
    $('.js_map').click(function () {
        $('.map').addClass('active');
    });
    $('.js_close').click(function () {
        $('.map').removeClass('active');
    });

    $('.js_modal_cose').click(function () {

        $('#modal_buy .modal').removeClass('modal_active');
        $('#modal_buy .modal .flipper').removeClass('success');

        $('#modal_reviews .modal').removeClass('modal_active');

        $('#overlay').removeClass('active');
    });
    $('#overlay').click(function () {

        $('#modal_buy .modal').removeClass('modal_active');
        $('#modal_buy .modal .flipper').removeClass('success');

        $('#modal_reviews .modal').removeClass('modal_active');

        $('#overlay').removeClass('active');
    });

    var request = $('#request');
    request.submit(function(e){
        e.preventDefault();
        var formData = request.serialize();
        $.ajax({
            url: '/request',
            type: 'POST',
            data: formData,
            dataType: 'json',
            headers: {
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            },
            success: function(data){
                if (data.status == 'ok') {
                    Swal.fire({
                        title: 'Спасибо',
                        html: 'Ваш отзыв после появится после модераций',
                        type: 'success',
                        confirmButtonText: 'Закрыть'
                    });
                    $("input", request).val('');
                }
            },
            error: function (data) {
                var alert = data.responseJSON;
                var errors = [];
                for(var a in alert) {
                    errors.push(alert[a][0]);
                }
                Swal.fire({
                    title: 'Ошибка!',
                    html: errors.join('<br>'),
                    type: 'error',
                    confirmButtonText: 'Закрыть'
                });
            }
        });
    });

});