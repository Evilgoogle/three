@extends('layouts.app')

@section('app_content')

    <div id="none" style="display: none" class="about">
        <div class="contain">
            <img src="/images/logo_text.svg" alt="Asken" class="logo wow fadeIn" data-wow-duration="1.3s" data-wow-delay="0.5s" data-wow-offset="10">
            <div class="text_1 wow fadeIn" data-wow-duration="0.7s" data-wow-delay="0.3s" data-wow-offset="10">{!! $about->text_1 !!}</div>
        </div>
        <div class="industries_block wow fadeInUp" data-wow-duration="0.7s" data-wow-delay="0.3s" data-wow-offset="10">
            <div class="contain">
                @foreach($main as $item)
                    <a href="/catalog/{{ $item->url }}" class="bn">
                        <div class="rubber">
                            <div class="text">{{ $item->title }}</div>
                            <div class="icon">{!!  file_get_contents(asset('/files/'.$item->icon)) !!}</div>
                        </div>
                    </a>
                @endforeach
            </div>
        </div>
        <div class="contain wow fadeIn" data-wow-duration="1.3s" data-wow-delay="0.5s" data-wow-offset="10">
            <div class="text_2">{!! $about->text_2 !!}</div>
            <div class="text_gray">{!! $about->textgray !!}</div>
        </div>
        <div class="mission wow fadeIn" data-wow-duration="1.3s" data-wow-delay="0.5s" data-wow-offset="10">
            <div class="head">
                <div class="line"></div>
                <div class="box">Миссия</div>
            </div>
            <div class="contain">
                Улучшить и развить поставки качественной продукции в различные отрасли экономики.
            </div>
        </div>
    </div>

@stop