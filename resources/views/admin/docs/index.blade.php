@extends('layouts.admin')

@section('admin_content')

    <input type="hidden" id="ajaxUrl" value="{{ $info->url }}">
    <div class="row clearfix">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="card">
                <div class="header">
                    <h2>{{ $info->head }}</h2>
                    <a href="/admin/{{ $info->url }}/add" class="btn btn-info waves-effect m-t-15">Добавить</a>
                </div>
                <div class="pagination_block">
                    <form class="filter_block" action="/admin/catalog/filter" method="get">
                        <div class="bn">
                            <div class="form-group">
                                <div class="form-line">
                                    <select class="form-control show-tick" id="product" name="product" title="Продукция" data-live-search="true">
                                        <option value="">Вся продукция</option>
                                        @foreach($products as $p)
                                            <option {{ isset($filter_form['cats']) ? ($filter_form['cats'] == $p->id)  ? 'selected' : '' : '' }} value="{{ $p->id }}">{{ $p->title }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-info waves-effect">Показать</button>
                    </form>
                    {{ $items->appends(isset($patch) ? $patch : [])->links() }}
                </div>
                <div class="body table-responsive">
                    <table class="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Заголовок</th>
                            <th>Файл</th>
                            <th>Дата добавление</th>
                            <th>Активность</th>
                            <th>Опции</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach ($items as $item)
                            <tr>
                                <td>{{ $item->id }}</td>
                                <td>{{ $item->title }}</td>
                                <td>
                                    @if(isset($item->file))
                                        <a target="_blank" href="{{ asset('uploads/'.$item->file) }}">Посмотреть</a>
                                    @else
                                        Нет файла
                                    @endif
                                </td>
                                <td>{{ $item->created_at }}</td>
                                <td>
                                    <input type="checkbox" class="enable filled-in chk-col-blue" name="enable" data-id="{{ $item->id }}" id="enable_{{ $item->id }}" {{ $item->enable ? 'value=1 checked' : 'value=0'}}>
                                    <label for="enable_{{ $item->id }}"></label>
                                </td>
                                <td>
                                    <a href="/admin/{{ $info->url }}/edit/{{ $item->id }}" class="entry_edit btn btn-default"><i class="fas fa-edit"></i> <span>изменить</span></a>
                                    <a href="/admin/{{ $info->url }}/remove/{{ $item->id }}" class="js_del_data entry_del btn btn-primary"><i class="fas fa-trash"></i></a>
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
