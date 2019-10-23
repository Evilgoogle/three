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

                    @include('admin._input.input-text', [
                        'name' => 'phone_1',
                        'label' => 'Телефон 1',
                        'item' => isset($item) ? $item : ''
                    ])

                    @include('admin._input.input-text', [
                        'name' => 'phone_2',
                        'label' => 'Телефон 2',
                        'item' => isset($item) ? $item : ''
                    ])

                    @include('admin._input.input-text', [
                        'name' => 'adress',
                        'label' => 'Адрес',
                        'item' => isset($item) ? $item : '',
                    ])

                    @include('admin._input.input-text', [
                        'name' => 'email',
                        'label' => 'E-mail',
                        'item' => isset($item) ? $item : '',
                    ])

                    @include('admin._input.input-text', [
                        'name' => 'lat',
                        'label' => 'Широта (карта)',
                        'item' => isset($item) ? $item : '',
                    ])

                     @include('admin._input.input-text', [
                        'name' => 'lng',
                        'label' => 'Долгота (карта)',
                        'item' => isset($item) ? $item : '',
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