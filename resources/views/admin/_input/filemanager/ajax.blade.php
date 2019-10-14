@foreach($get as $item)
    <div class="bn">
        <div class="column">
            <div class="rubber js_select" data-id="{{ $item->id }}" data-name="{{ $item->name }}" data-image="{{ $item->image.setDinamic_image($item->id, isset($dinamic_images) ? $dinamic_images : []) }}" data-type="{{ $item->type }}" data-alt="{{ $item->alt }}" data-mass="{{ $item->size }}" data-created_at="{{ $item->created_at }}">
                <div class="image" style="background-image: url(/files/{{ $item->image.setDinamic_image($item->id, isset($dinamic_images) ? $dinamic_images : []) }})"></div>
                <div class="date">{{ date_vk($item->created_at) }}</div>
                <div class="title">{{ str_limit($item->name, 24) }}</div>
            </div>
        </div>
    </div>
@endforeach