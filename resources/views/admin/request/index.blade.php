@extends('layouts.admin')

@section('admin_content')

    <input type="hidden" id="ajaxUrl" value="{{ $info->url }}">
    <div class="row clearfix">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="card">
                <div class="header">
                    <h2>{{ $info->head }}</h2>
                    {{--<a href="/admin/{{ $info->url }}/add" class="btn btn-info waves-effect m-t-15">Добавить</a>--}}
                </div>
                <div class="body table-responsive">
                    <table class="table table-bordered table-striped {{--js-table--}} dataTable">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Имя</th>
                            <th>Статус</th>
                            <th>Опции</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach ($items as $item)
                            <tr id="{{ $item->id }}">
                                <td>{{ $item->id }}</td>
                                <td>{{ $item->name }}</td>
                                <td>{{ $item->enable ? 'Обработано' : 'Не обработано' }}</td>
                                <td>
                                    <a href="/admin/{{ $info->url }}/edit/{{ $item->id }}">Изменить</a> {{--<a href="/admin/{{ $info->url }}/remove/{{ $item->id }}">Удалить</a>--}}
                                </td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

@stop