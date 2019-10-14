@extends('layouts.app')

@section('app_content')

    <?php
        $seo_new = (object)[];
        $seo_new->title = config('app.name').' | '.html_entity_decode($item->title);
        $seo_new->description = html_entity_decode(strip_tags($item->text));
    ?>

    <div class="section_show_articles">
        <div class="pic_block" style="background-image: url('/files/{{ $item->fullimage }}')">
            {{--<div class="contain">
                <div class="title wow fadeInUp_slow" data-wow-duration="0.7s" data-wow-delay="0.7s" data-wow-offset="30">{{ $item->title }}</div>
            </div>--}}
        </div>
        <div class="contain">
            <div class="block">
                <ul class="breadcrumbs">
                    <li><a href="/">Главная</a></li>
                    <li>Статьи</li>
                </ul>
                <h1 class="wow fadeInLeft" data-wow-duration="1.1s" data-wow-delay="0.1s" data-wow-offset="30">{{ $item->title }}</h1>
                <div class="desc wow fadeInUp_slow" data-wow-duration="0.7s" data-wow-delay="0.3s" data-wow-offset="30">{{ $item->desc }}</div>
                <div class="text wow fadeInUp_slow" data-wow-duration="0.7s" data-wow-delay="0.3s" data-wow-offset="30">{!! $item->text !!}</div>
            </div>
        </div>
    </div>

@stop