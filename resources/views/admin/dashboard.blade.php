@extends('layouts.admin')

@section('admin_content')

    <div class="block-header">
        <h2>Административная панель</h2>
    </div>

    <div class="row clearfix">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="card">
                <div class="header">Добро пожаловать в Админку</div>
                <div class="header">
                    <a href="/admin/products" class="btn bg-deep-purple waves-effect m-t-15">Продукция</a>
                    <a href="/admin/requests" class="btn bg-indigo waves-effect m-t-15">Заявки</a>
                </div>
            </div>
        </div>
    </div>

@stop
