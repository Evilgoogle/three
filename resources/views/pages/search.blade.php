@extends('layouts.app')

@section('app_content')

    <div id="none" style="display: none;" class="catalog page">

        <div class="contain">
            <div class="block wow fadeIn" data-wow-duration="1.3s" data-wow-delay="0.8s" data-wow-offset="10">
                <div class="info">Поиск по слову: <b><u>{{ $title }}</u></b></div>
                @if($catalog->count())
                    @foreach($catalog as $item)
                        <{{ !empty($item->file) ? 'a' : 'div' }} href="{{ !empty($item->file) ? '/uploads/'.$item->file : '#' }}" download="download" class="bn">
                            <div class="left">
                                <div class="text">{{ $item->title }}</div>
                                <div class="line"></div>
                            </div>
                            <div class="right">
                                <div class="icon"></div>
                            </div>
                        </{{ !empty($item->file) ? 'a' : 'div' }}>
                    @endforeach
                @else
                <div download="download" class="bn">
                    <div class="left">
                        <div class="text">Нечего не найдена</div>
                        <div class="line"></div>
                    </div>
                </div>
                @endif
            </div>
        </form>
    </div>

@stop