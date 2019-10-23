@extends('layouts.app')

@section('app_content')

    <div class="about">
        <div class="contain">
            <img src="/images/logo_text.svg" alt="Asken" class="logo">
            <div class="text_1">{!! $about->text_1 !!}</div>
        </div>
        <div class="industries_block">
            <div class="contain">
                @foreach($main as $item)
                    <a href="{{ $item->url }}" class="bn">
                        <div class="rubber">
                            <div class="text">{{ $item->title }}</div>
                            <div class="icon">{!!  file_get_contents(asset('/files/'.$item->icon)) !!}</div>
                        </div>
                    </a>
                @endforeach
            </div>
        </div>
        <div class="contain">
            <div class="text_2">{!! $about->text_2 !!}</div>
            <div class="text_gray">{!! $about->textgray !!}</div>
        </div>
        <div class="mission">
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