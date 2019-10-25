@extends('layouts.app')

@section('app_content')

    <div class="main_swiper swiper-container">
        <?php $data = [];
        foreach ($main as $js_items) {
            $data[] = [
                'id' => $js_items->id,
                'title' => $js_items->title,
                'icon' => $js_items->icon
            ];
        }
        $main_json = json_encode($data); ?>
        <div class="swiper-wrapper">
            <?php $i = 0?>
            @foreach ($main as $item)
                <?php $i++?>
                <div class="swiper-slide">
                    <!-- text -->
                    <div id="swmain_text_{{ $i }}" class="contain {{ ($i == 1) ? 'anm_start_swmain_text' : '' }}">
                        <div class="content">
                            <h2>{{ $item->title }}</h2>
                            <small>{{ $item->desc }}</small>
                            <a href="/catalog/{{ $item->url }}" class="web_button"></a>
                        </div>
                    </div>

                    <!-- absolute -->
                    <div @if($i == 1) id="swmain_fon_{{ $i }}" @endif class="fon {{ ($i == 1) ? 'anm_start_swmain' : '' }}">
                        <div class="space_animate">
                            <div class="zoomer" id="main_fon_{{ $item->id }}">
                                <div data-depth="0.2" class="element" style="background-image: url('/files/{{ $item->fon }}')"></div>
                            </div>
                        </div>
                    </div>
                    <div @if($i == 1) id="swmain_image_{{ $i }}" @endif class="image {{ ($i == 1) ? 'anm_start_swmain' : '' }}">
                        <div class="space_animate" id="main_image_{{ $item->id }}">
                            <div data-depth="0.2" class="element" style="background-image: url('/files/{{ $item->image }}')"></div>
                        </div>
                    </div>
                    <div class="main_swiper_panel">
                        <div class="arrows">
                            <div class="prev swiper-button-next"></div>
                            <div class="next swiper-button-prev"></div>
                        </div>
                        <div id="swmain_block_{{ $i }}" class="block {{ ($i == 1) ? 'anm_start_swmain_block' : '' }}" data-blocks="{{ $main_json }}"></div>
                    </div>
                </div>
            @endforeach
        </div>
    </div>

@stop