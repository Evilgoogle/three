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
    var main_swiper_panel = $('.main_swiper_panel .block').data('blocks');
    var main_swiper  = new Swiper('.main_swiper', {
        direction: 'vertical',
        pagination: {
            el: '.main_swiper_panel .block',
            clickable: true,
            renderBullet: function (index, className) {
                for (var key in main_swiper_panel) {
                    if(index == key) {
                        return '<button class="bn ' + className + '">' +
                            '<div class="text">'+main_swiper_panel[key].title+'</div>' +
                            '<div class="icon" style="background-image: url(/temp/' + main_swiper_panel[key].icon + ')"></div>' +
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
    var swiper_gallary = new Swiper('.swiper_gallary', {
        slidesPerView: 4,
        spaceBetween: 0,
        loop: true,
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        keyboard: {
            enabled: true,
        },
        mousewheel: true,
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 140,
            modifier: 1,
            slideShadows : true
        },
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
});