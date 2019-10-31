@extends('layouts.app')

@section('app_content')

    <div id="none" style="display: none;" class="catalog page">

        <div class="industries_block wow fadeInUp" data-wow-duration="0.7s" data-wow-delay="0.3s" data-wow-offset="10">
            <a href="#" class="bn mobile">
                <div class="rubber">
                    <div class="text">{{ $products[0]->title }}</div>
                    <div class="icon">{!!  file_get_contents(asset('/files/'.$products[0]->icon)) !!}</div>
                    <button class="js_arrow_ind"></button>
                </div>
            </a>
            <div id="ind_mobile" class="contain">
                @foreach($products as $item)
                    <a href="/catalog/{{ $item->url }}" class="bn {{ isset($main) && ($item->id == $main->id) ? 'active' : '' }}">
                        <div class="rubber">
                            <div class="text">{{ $item->title }}</div>
                            <div class="icon">{!!  file_get_contents(asset('/files/'.$item->icon)) !!}</div>
                        </div>
                    </a>
                @endforeach
            </div>
        </div>
        <div class="contain">
            <div class="block wow fadeIn" data-wow-duration="1.3s" data-wow-delay="0.8s" data-wow-offset="10">
                <div class="info">{{ isset($main) ? $main->title.':' : 'Весь каталог:' }}</div>
                <?php $data = []?>
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
                    <?php
                        if(!empty($item->file)) {
                            $data[] = $item->file;
                        }
                    ?>
                @endforeach
                @if($catalog->count())
                    <form action="/download" class="download_all" method="post">
                        {{ csrf_field() }}
                        <input type="hidden" name="data" value="{{ json_encode($data) }}">
                        <button type="submit" class="bn">
                            <div class="left">
                                <div class="text">Скачать все</div>
                                <div class="line"></div>
                            </div>
                            <div class="right">
                                <div class="icon"></div>
                            </div>
                        </button>
                    </form>
                @endif
            </div>
        </form>
    </div>

@stop