@extends('layouts.app')

@section('app_content')

    <div class="gallary page">
        <div class="contain">
            <div class="swiper_gallary">
                @if($items->count())
                    <div class="swiper-container">
                        <div class="swiper-wrapper">
                            @foreach($items as $item)
                                <div class="swiper-slide" style="background-image: url('/files/{{ $item->image }}')">
                                    <div class="content">
                                        <h2>{{ $item->title }}</h2>
                                        <small>{{ $item->desc }}</small>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </div>
                    <div class="arrows">
                        <div class="prev swiper-button-next"></div>
                        <div class="next swiper-button-prev"></div>
                    </div>
                @endif
            </div>
        </div>
    </div>

@stop
