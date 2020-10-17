@extends('layouts.app')

@section('app_content')

    <div class="gaming">
        <div id="scene_container"></div>
        <div class="panel">
            <button class="js_print_add" data-id="cube_brick">
                <img src="">
                <p>Куб кирпич</p>
            </button>
            <button class="js_print_add" data-id="schere_plastic">
                <img src="">
                <p>Шар пластик</p>
            </button>
            <button class="js_draw">
                <img src="">
                <p>Рисовать</p>
            </button>
            <button class="js_extrude">
                <img src="">
                <p>Поднять</p>
            </button>
        </div>
    </div>
    <div class="scene_method">
        <div class="box">
            <div class="title">3D room</div>
            <div class="bn">
                <button type="button" data-type="game">PLAY</button>
                <p>Двигайтесь кнопками WASD и посматривайте по сторонам с помощью мышки</p>
            </div>
            <div class="bn">
                <button type="button" class="view" data-type="view">осмотреть</button>
                <p>Осмотретите сцену польностью двигая мышкой</p>
            </div>
        </div>
    </div>

@stop
