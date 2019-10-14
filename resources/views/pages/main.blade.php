@extends('layouts.app')

@section('app_content')


    <div class="main_block">
        <div class="pics">
            <?php $p = 0?>
            @foreach($slider as $item)
                <?php $p++?>
                <div id="main_{{ $item->id }}" class="pic {{ ($p == 1) ? 'active' : '' }}" style="background-image: url('/files/{{ $item->image }}')"></div>
            @endforeach
        </div>
        <div class="menu">
            <div class="contain">
                <?php $i = 0?>
                @foreach($slider as $item)
                    <?php $i++?>
                    <a href="{{ $item->url }}" class="bn {{ ($i == 1) ? 'active' : '' }}" data-id="{{ $item->id }}">
                        <div class="icon">{!!  file_get_contents(asset('/files/'.$item->icon)) !!}</div>
                        <h2 class="title">{{ $item->title }}</h2>
                    </a>
                @endforeach
                <div class="bn stub"><span></span></div>
            </div>
        </div>
    </div>
    <div class="contain">
        @if(count($popular_cats))
            <section class="section_popularCats">
                <div class="headers h_love"><span>Популярные категории</span></div>
                <div class="block">
                    @foreach($popular_cats as $item)
                        <div class="box">
                            <a href="/goods/{{ $item->url }}" class="bn">
                                <div class="rubber">
                                    <div class="image" style="background-image: url({{ issetImg($item->image) }})"></div>
                                    <h3>{{ str_limit($item->title, 28) }}</h3>
                                </div>
                            </a>
                        </div>
                    @endforeach
                </div>
            </section>
        @endif
        @if(count($new_goods))
            <section class="section_new">
                <div class="headers h_new"><span>Новое на сайте</span></div>
                <div class="swiper_new">
                    <div class="contain">
                        <div class="swiper-container">
                            <div class="swiper-wrapper">
                                @foreach($new_goods as $item)
                                    <a href="/goods_show/{{ $item->url }}" class="swiper-slide good"style="background-image: url({{ issetImg($item->image) }})">
                                        <div class="box">
                                            <div class="m_top">
                                                <div class="mobile_image" style="background-image: url({{ issetImg($item->image) }})"></div>
                                                <div class="rubber">
                                                    <div class="text_content">
                                                        <h4>{{ str_limit($item->title, 40) }}</h4>
                                                        <div class="buy_elements">
                                                            <button type="button" class="buy js_buy" data-good_id="{{ $item->id }}" onclick="return false"></button>
                                                            <button type="button" class="favourite js_favourite" data-good_id="{{ $item->id }}" onclick="return false"></button>
                                                            <div class="link"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="m_bottom">
                                                <div class="buy_elements">
                                                    <button type="button" class="buy js_buy" data-good_id="{{ $item->id }}" onclick="return false"></button>
                                                    <button type="button" class="favourite js_favourite" data-good_id="{{ $item->id }}" onclick="return false"></button>
                                                    <div class="link"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                @endforeach
                            </div>
                        </div>
                    </div>
                    <!-- Add Arrows -->
                    <div class="arrow swiper-button-next new-arrow-next"></div>
                    <div class="arrow swiper-button-prev new-arrow-prev"></div>
                </div>
            </section>
        @endif
        @if(count($popular_goods))
            <section class="section_popularGoods">
                <div class="headers h_love"><span>Популярные товары</span></div>
                <div class="swiper_popular-goods">
                    <div class="contain">
                        <div class="swiper-container">
                            <div class="swiper-wrapper">
                                @foreach($popular_goods as $item)
                                    <a href="/goods_show/{{ $item->url }}" class="swiper-slide good" style="background-image: url({{ issetImg($item->image) }})">
                                        <div class="box">
                                            <div class="m_top">
                                                <div class="mobile_image" style="background-image: url({{ issetImg($item->image) }})"></div>
                                                <div class="rubber">
                                                    <div class="text_content">
                                                        <h4>{{ str_limit($item->title, 40) }}</h4>
                                                        <div class="buy_elements">
                                                            <button type="button" class="buy js_buy" data-good_id="{{ $item->id }}" onclick="return false"></button>
                                                            <button type="button" class="favourite js_favourite" data-good_id="{{ $item->id }}" onclick="return false"></button>
                                                            <div class="link"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="m_bottom">
                                                <div class="buy_elements">
                                                    <button type="button" class="buy js_buy" data-good_id="{{ $item->id }}" onclick="return false"></button>
                                                    <button  type="button" class="favourite js_favourite" data-good_id="{{ $item->id }}" onclick="return false"></button>
                                                    <div class="link"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                @endforeach
                            </div>
                        </div>
                    </div>
                    <!-- Add Arrows -->
                    <div class="arrow swiper-button-next new-popular-next"></div>
                    <div class="arrow swiper-button-prev new-popular-prev"></div>
                </div>
            </section>
        @endif
    </div>
    <div class="section_reviews">
        <div class="contain">
            <a href="/reviews" class="title"><span>FreeLife на YouTube</span></a>
            @if(count($reviews))
                <div class="block">
                    <div class="rubber">
                        <div class="left">
                            <div class="swiper_reviews swiper-container">
                                <div class="swiper-wrapper">
                                    @foreach ($reviews as $item)
                                        <div class="swiper-slide">{!! $item->video !!}</div>
                                    @endforeach
                                </div>
                                <div class="arrow">
                                    <div class="next swiper-button-next"></div>
                                    <div class="prev swiper-button-prev"></div>
                                </div>
                            </div>
                        </div>
                        <div class="right">
                            <?php $data = [];
                            foreach ($reviews as $js_items) {
                                $data[] = [
                                    'id' => $js_items->id,
                                    'title' => $js_items->title,
                                    'image' => $js_items->image
                                ];
                            }
                            $services_json = json_encode($data); ?>
                            <div class="reviews_pagination" data-blocks="{{ $services_json }}"></div>
                        </div>
                    </div>
                </div>
            @endif
        </div>
    </div>

@stop