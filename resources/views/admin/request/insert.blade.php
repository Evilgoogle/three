@extends('layouts.admin')

@section('admin_content')

    <input type="hidden" id="ajaxUrl" value="{{ $info->url }}">
    <div class="row clearfix">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="card">
                <div class="header">
                    <h2>Заявка</h2>
                </div>
                <div class="body">
                    <form action="/admin/{{ $info->url }}/insert{{ isset($item->id) ? '/'. $item->id : '' }}" method="post">
                        {{ csrf_field() }}

                        @if ($item->enable == false)
                            @include('admin._input.input-switch', [
                                'name' => 'enable',
                                'label' => 'Статус',
                                'item' => isset($item) ? $item : '',
                                'default' => true,
                                'on' => 'Обработан', 'off' => 'Не обработан'
                            ])
                        @endif

                        @include('admin._input.input-text', [
                            'name' => 'name',
                            'label' => 'Имя',
                            'item' => isset($item) ? $item : '',
                            'disabled' => true
                        ])

                        @include('admin._input.input-text', [
                            'name' => 'phone',
                            'label' => 'Телефон',
                            'item' => isset($item) ? $item : '',
                            'disabled' => true
                        ])

                        @include('admin._input.input-text', [
                            'name' =>  'email',
                            'label' => 'E-mail',
                            'item' => isset($item) ? $item : '',
                            'disabled' => true
                        ])

                        @include('admin._input.textarea', [
                            'name' => 'message',
                            'label' => 'Текст',
                            'item' => isset($item) ? $item : '',
                            'disabled' => true
                        ])

                        @if (!$item->enable)
                            <div class="row clearfix">
                                <div class="col-sm-12">
                                    <button type="submit" class="btn btn-primary m-t-10 waves-effect">{{ isset($item) ? 'Обновить' : 'Записать' }}</button>
                                </div>
                            </div>
                        @endif
                    </form>
                </div>
            </div>
        </div>
    </div>

@stop