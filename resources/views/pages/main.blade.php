@extends('layouts.app')

@section('app_content')

    <?php
    $door = [
        'width' => 1.1,
        'height' => 2,
        'name' => 'door'
    ];
    $window_s = [
        'width' => 1.3,
        'height' => 1.3,
        'name' => 'window_s'
    ];
    $window_b = [
        'width' => 2,
        'height' => 2,
        'name' => 'window_b'
    ];
    ?>

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
            <div class="wall_hole">
                <button class="js_hole">
                    <p>Проем</p>
                </button>
                <select>
                    <option name="hole" data-parameter="{{ json_encode($door) }}" selected>Дверь</option>
                    <option name="hole" data-parameter="{{ json_encode($window_s) }}">Окно маленькое</option>
                    <option name="hole" data-parameter="{{ json_encode($window_b) }}">Окно большое</option>
                </select>
                <input type="number" name="raise" value="0">
                <button class="js_hole_make">
                    <p>Высечь стену</p>
                </button>
            </div>
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
