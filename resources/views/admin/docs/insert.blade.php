@extends('layouts.admin')

@section('admin_content')

    <input type="hidden" id="ajaxUrl" value="{{ $info->url }}">
    <div class="row clearfix">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="card">
                <div class="header">
                    <h2>{{ $info->head }}</h2>
                </div>
                <div class="body">
                    <form action="/admin/{{ $info->url }}/insert{{ isset($item->id) ? '/'. $item->id : '' }}" method="post" enctype="multipart/form-data">
                        {{ csrf_field() }}

                        @include('admin._input.input-switch', [
                            'name' => 'enable',
                            'label' => 'Состояние',
                            'item' => isset($item) ? $item : '',
                            'default' => true,
                            'on' => 'Включить', 'off' => 'Выключить'
                        ])

                        @include('admin._input.select', [
                           'name' => 'product_id',
                           'label' => 'Продукция',
                           'oKey' => 'id',
                           'oValue' => 'title',
                           'options' => isset($products) ? $products : '',
                           'required' => true,
                           'selectedId' => isset($item) ? $item->product_id : ''
                       ])

                        @include('admin._input.input-text', [
                            'name' => 'title',
                            'label' => 'Заголовок',
                            'item' => isset($item) ? $item : '',
                            'required' => true
                        ])

                        @include('admin._input.input-file', [
                            'name' => 'file',
                            'label' => 'Файл',
                            'item' => isset($item) ? $item : '',
                            'is_image' => false,
                            'modelName' => 'Doc'
                        ])

                        <div class="row clearfix">
                            <div class="col-sm-12">
                                <button type="submit" class="btn btn-primary m-t-10 waves-effect">{{ isset($item) ? 'Обновить' : 'Записать' }}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

@stop
