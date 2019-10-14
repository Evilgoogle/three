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