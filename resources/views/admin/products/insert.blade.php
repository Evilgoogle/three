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

                        @include('admin._input.input-text', [
                            'name' => 'title',
                            'label' => 'Заголовок',
                            'item' => isset($item) ? $item : '',
                            'required' => true
                        ])

                        @include('admin._input.input-text', [
                            'name' => 'ulr',
                            'label' => 'URL',
                            'item' => isset($item) ? $item : '',
                        ])

                        @include('admin._input.input-filemanager', [
                            'name' => 'icon',
                            'label' => 'Иконка',
                            'item' => isset($item) ? $item : '',
                            'is_image' => true,
                            'filemanager_id' => 1,
                        ])

                        @include('admin._input.input-filemanager', [
                            'name' => 'image',
                            'label' => 'Изображение',
                            'item' => isset($item) ? $item : '',
                            'is_image' => true,
                            'filemanager_id' => 2,
                        ])

                        @include('admin._input.input-filemanager', [
                            'name' => 'fon',
                            'label' => 'Фоновое изображение',
                            'item' => isset($item) ? $item : '',
                            'is_image' => true,
                            'filemanager_id' => 3,
                        ])

                        @include('admin._input.textarea', [
                             'name' => 'desc',
                             'label' => 'Короткое описание',
                             'item' => isset($item) ? $item : ''
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
