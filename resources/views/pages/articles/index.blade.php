@extends('layouts.app')

@section('app_content')


    <div class="section_articles">
        <div class="contain">
            <div class="left">
                <div class="loading"></div>
                @foreach($articles as $item)
                    <a href="/articles/{{ $item->url }}"  class="bn wow fadeInUp_slow" data-wow-duration="0.7s" data-wow-delay="0.7s" data-wow-offset="30">
                        <div class="top">
                            <div class="pic" style="background-image: url(/files/{{ $item->image }})"></div>
                            <h2>{{ $item->title }}</h2>
                            <div class="text">{{ $item->desc }}</div>
                        </div>
                        <div class="button"><span>подробнее</span></div>
                    </a>
                @endforeach
            </div>
            <div class="right">
                <?php $i = 0?>
                @foreach($times as $t)
                    <?php $i++?>
                    <button class="js_news_year {{ ($i == 1) ? 'active' : '' }}" data-year="{{ $t }}">
                        <div class="line"></div>
                        <div class="year">{{ $t }}</div>
                    </button>
                @endforeach
            </div>
        </div>
    </div>

@stop