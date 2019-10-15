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
    var main_swiper_panel = $('.main_swiper_panel').data('blocks');
    var main_swiper  = new Swiper('.main_swiper', {
        direction: 'vertical',
        pagination: {
            el: '.main_swiper_panel',
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
        //loop: true,
        effect: 'cube',
        grabCursor: true,
        cubeEffect: {
            shadow: false,
            slideShadows: true,
            shadowOffset: 10,
            shadowScale: 0.94,
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