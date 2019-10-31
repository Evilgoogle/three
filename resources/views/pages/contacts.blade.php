@extends('layouts.app')

@section('app_content')

    <div id="none" style="display: none" class="contacts">
        <div class="contain">
            <div id="map" class="map" data-lat="{{ $contacts->lat }}" data-lng="{{ $contacts->lng }}">
                <button class="js_close"></button>
            </div>
            <div class="block">
                <div class="left_block wow fadeInUp" data-wow-duration="0.7s" data-wow-delay="0.3s" data-wow-offset="10">
                    <div class="header">Есть вопросы, свяжитесь с нами:</div>
                    <a href="tel:{{ $contacts->phone_1 }}" class="bn">
                        <div class="left">
                            <div class="text">{{ $contacts->phone_1 }}</div>
                            <div class="line"></div>
                        </div>
                        <div class="right">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path id="Icon_metro-phone" data-name="Icon metro-phone" d="M20.171,18.256c-1.6,1.6-1.6,3.2-3.2,3.2s-3.2-1.6-4.8-3.2-3.2-3.2-3.2-4.8,1.6-1.6,3.2-3.2-3.2-6.4-4.8-6.4-4.8,4.8-4.8,4.8c0,3.2,3.288,9.688,6.4,12.8s9.6,6.4,12.8,6.4c0,0,4.8-3.2,4.8-4.8s-4.8-6.4-6.4-4.8Z" transform="translate(-2.571 -3.856)" fill="#858687"/>
                            </svg>
                        </div>
                    </a>
                    <a href="tel:{{ $contacts->phone_2 }}" class="bn">
                        <div class="left">
                            <div class="text">{{ $contacts->phone_2 }}</div>
                            <div class="line"></div>
                        </div>
                        <div class="right">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path id="Icon_metro-phone" data-name="Icon metro-phone" d="M20.171,18.256c-1.6,1.6-1.6,3.2-3.2,3.2s-3.2-1.6-4.8-3.2-3.2-3.2-3.2-4.8,1.6-1.6,3.2-3.2-3.2-6.4-4.8-6.4-4.8,4.8-4.8,4.8c0,3.2,3.288,9.688,6.4,12.8s9.6,6.4,12.8,6.4c0,0,4.8-3.2,4.8-4.8s-4.8-6.4-6.4-4.8Z" transform="translate(-2.571 -3.856)" fill="#858687"/>
                            </svg>
                        </div>
                    </a>
                    <a href="mailto:{{ $contacts->email }}" class="bn">
                        <div class="left">
                            <div class="text">{{ $contacts->email }}</div>
                            <div class="line"></div>
                        </div>
                        <div class="right">
                            <svg xmlns="http://www.w3.org/2000/svg" width="23.11" height="15.6" viewBox="0 0 23.11 15.6">
                                <path id="Icon_zocial-email" data-name="Icon zocial-email" d="M.072,18.286V5.45q0-.022.067-.423l7.555,6.463L.161,18.732a1.889,1.889,0,0,1-.089-.446Zm1-14.151a.96.96,0,0,1,.379-.067H21.8a1.262,1.262,0,0,1,.4.067L14.624,10.62l-1,.8-1.983,1.627L9.655,11.422l-1-.8ZM1.1,19.6l7.6-7.287L11.638,14.7l2.942-2.385,7.6,7.287a1.07,1.07,0,0,1-.379.067H1.454A1.009,1.009,0,0,1,1.1,19.6Zm14.485-8.112,7.532-6.463a1.33,1.33,0,0,1,.067.423V18.286a1.708,1.708,0,0,1-.067.446Z" transform="translate(-0.072 -4.068)" fill="#858687"/>
                            </svg>
                        </div>
                    </a>
                    <button class="js_map">
                        <span>Показать на карте</span>
                        <span class="icon"></span>
                    </button>
                </div>
                <div class="right_block wow fadeInUp" data-wow-duration="0.7s" data-wow-delay="0.3s" data-wow-offset="10">
                    <div class="header">Или напишите нам:</div>
                    <form id="request">
                        <input type="text" name="name" placeholder="Ваше имя">
                        <input type="text" name="email" placeholder="Ваш e-mail">
                        <input type="phone" name="phone" class="phone" placeholder="Ваш телефон...">
                        <input type="text" name="message" placeholder="Текст...">
                        <div class="submit">
                            <button type="submit"></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

@stop