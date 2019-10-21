@extends('layouts.app')

@section('app_content')

    <?php
            $main = [
                0 => (object)[
                    'id' => 1,
                    'title' => 'Кабельно-проводниковая продукция',
                    'url' => '#',
                    'desc' => 'Поставляемая нашей компанией кабельно-проводниковая продукция, обеспечит высокий уровень надёжности Ваших линий электропередач и управления, благодаря применению современных технологий на производстве. Качество металлов, применяемых при изготовлении проводников обеспечит высокую проводимость и снизит величину потерь при передаче электроэнергии',
                    'icon' => 'main_slider_ico1.svg',
                    'fon' => 'main_slider_fon1.png',
                    'image' => 'main_slider_image1.png'
                ],
                1 => (object)[
                    'id' => 2,
                    'title' => 'Трубы, фитинги и запорная арматура',
                    'url' => '#',
                    'desc' => 'Поставляемая нашей компанией кабельно-проводниковая продукция, обеспечит высокий уровень надёжности Ваших линий электропередач и управления, благодаря применению современных технологий на производстве. Качество металлов, применяемых при изготовлении проводников обеспечит высокую проводимость и снизит величину потерь при передаче электроэнергии',
                    'icon' => 'main_slider_ico2.svg',
                    'fon' => 'main_slider_fon2.png',
                    'image' => 'main_slider_image2.png'
                ],
                2 => (object)[
                    'id' => 3,
                    'title' => 'Оборудование для промышленного производства',
                    'url' => '#',
                    'desc' => 'Поставляемая нашей компанией кабельно-проводниковая продукция, обеспечит высокий уровень надёжности Ваших линий электропередач и управления, благодаря применению современных технологий на производстве. Качество металлов, применяемых при изготовлении проводников обеспечит высокую проводимость и снизит величину потерь при передаче электроэнергии',
                    'icon' => 'main_slider_ico3.svg',
                    'fon' => 'main_slider_fon3.png',
                    'image' => 'main_slider_image3.png'
                ],
                3 => (object)[
                    'id' => 4,
                    'title' => 'Металлические решётчатые настилы и ограждения',
                    'url' => '#',
                    'desc' => 'Поставляемая нашей компанией кабельно-проводниковая продукция, обеспечит высокий уровень надёжности Ваших линий электропередач и управления, благодаря применению современных технологий на производстве. Качество металлов, применяемых при изготовлении проводников обеспечит высокую проводимость и снизит величину потерь при передаче электроэнергии',
                    'icon' => 'main_slider_ico4.svg',
                    'fon' => 'main_slider_fon4.png',
                    'image' => 'main_slider_image4.png'
                ],
                4 => (object)[
                    'id' => 5,
                    'title' => 'Металлический прокат',
                    'url' => '#',
                    'desc' => 'Поставляемая нашей компанией кабельно-проводниковая продукция, обеспечит высокий уровень надёжности Ваших линий электропередач и управления, благодаря применению современных технологий на производстве. Качество металлов, применяемых при изготовлении проводников обеспечит высокую проводимость и снизит величину потерь при передаче электроэнергии',
                    'icon' => 'main_slider_ico5.svg',
                    'fon' => 'main_slider_fon1.png',
                    'image' => 'main_slider_image5.png'
                ],
            ];
    ?>

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
            @foreach ($main as $item)
                <div class="swiper-slide">
                    <!-- text -->
                    {{--<div class="contain">
                        <div class="content">
                            <h2>{{ $item->title }}</h2>
                            <small>{{ $item->desc }}</small>
                            <a href="{{ $item->url }}" class="web_button"></a>
                        </div>
                    </div>--}}

                    <!-- absolute -->
                    {{--<div class="fon">
                        <div class="zoomer" id="main_fon_{{ $item->id }}">
                            <div data-depth="0.2" class="element" style="background-image: url('/temp/{{ $item->fon }}')"></div>
                        </div>
                    </div>
                    <div class="image" id="main_image_{{ $item->id }}">
                        <div data-depth="0.2" class="element" style="background-image: url('/temp/{{ $item->image }}')"></div>
                    </div>--}}
                    <div class="main_swiper_panel">
                        <div class="arrows">
                            <div class="prev swiper-button-next"></div>
                            <div class="next swiper-button-prev"></div>
                        </div>
                        <div class="block" data-blocks="{{ $main_json }}"></div>
                    </div>
                </div>
            @endforeach
        </div>
    </div>

@stop