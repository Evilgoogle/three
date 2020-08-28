@extends('layouts.app')

@section('app_content')

    <div id="scene_container"></div>
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