@extends('layouts.admin')

@section('admin_content')

    <div class="row clearfix">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="card">
                <div class="header">
                    <h2>{{ $info->head }}</h2>
                </div>
                <div class="body">
                    <form action="/admin/{{ $info->url }}/insert/{{ $item->id }}" method="post" enctype="multipart/form-data">
                        {{ csrf_field() }}

                        @include('admin._input.textarea', [
                            'name' => 'text_1',
                            'label' => '1 текст',
                            'item' => isset($item) ? $item : '',
                            'editor' => true
                        ])

                        @include('admin._input.textarea', [
                            'name' => 'text_2',
                            'label' => '2 текст',
                            'item' => isset($item) ? $item : '',
                            'editor' => true
                        ])

                        @include('admin._input.textarea', [
                            'name' => 'textgray',
                            'label' => 'Серый текст',
                            'item' => isset($item) ? $item : '',
                            'editor' => true
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