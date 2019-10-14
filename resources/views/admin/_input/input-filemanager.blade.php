<h2 class="card-inside-title">{{ $label }} {{ isset($required) && $required ? '*' : '' }}</h2>
<div class="row clearfix">
    <div class="col-sm-12">
        @if (!empty($item))
            @if (isset($array) && $array && !empty($item))
                <?php $name_new = substr($name, 0, -1) ?>
                <table class="order-table images-table">
                    <tbody>
                    @foreach($item as $i)
                        <tr id="{{ $i->id }}">
                            <td class="index">{{ $i->order }}</td>
                            <td>
                                <div class="thumbnail">
                                    <a href="{{ issetImg($i->$name_new) }}" target="_blank">
                                        @if (isset($is_image) && $is_image)
                                            <img src="{{ issetImg($i->$name_new) }}" class="img-responsive">
                                        @else
                                            {{ $i->$name_new }}
                                        @endif
                                    </a>
                                </div>
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            @elseif (!empty($item->$name))
                <div class="thumbnail">
                    <a href="{{ issetImg($item->$name) }}" target="_blank">
                        @if (isset($is_image) && $is_image)
                            <img src="{{ issetImg($item->$name) }}" class="img-responsive">
                        @else
                            {{ $item->$name }}
                        @endif
                    </a>
                </div>
            @endif
        @endif
        <div class="panel panel-default">
            <div class="panel-heading"><button type="button" class="btn btn-default filemanager_open" data-basic_id="{{ $filemanager_id }}">Выбрать</button></div>
            <div class="panel-body">
                <div id="filemanager_create_{{ $filemanager_id }}" class="filemanager_create"></div>
                <input type="hidden" id="filemanager_server_image_{{ $filemanager_id }}" name="{{ $name }}" value="{{ !empty($item) ? $item->$name : '' }}">
            </div>
        </div>
    </div>
</div>