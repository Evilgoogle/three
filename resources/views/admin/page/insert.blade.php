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

                        <input type="hidden" name="url" value="{{ $return_url }}">
                        @include('admin._input.textarea', [
                             'name' => 'text',
                             'label' => 'Описание',
                             'item' => isset($item) ? $item : '',
                             'editor' =>true
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
