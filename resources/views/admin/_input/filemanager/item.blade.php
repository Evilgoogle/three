<div class="bn">
    <div class="column">
        <div class="rubber js_select blue" data-id="{{ $set->id }}" data-name="{{ $set->name }}" data-image="{{ $set->image }}" data-type="{{ $set->type }}" data-alt="{{ $set->alt }}" data-mass="{{ $set->size }}" data-created_at="{{ $set->created_at }}">
            <div class="image" style="background-image: url(/files/{{ $set->image }})"></div>
            <div class="date">{{ date_vk($set->created_at) }}</div>
            <div class="title">{{ str_limit($set->name, 24) }}</div>
        </div>
    </div>
</div>