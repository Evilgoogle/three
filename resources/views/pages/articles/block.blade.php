@foreach($articles as $item)
    <a href="/articles/{{ $item->url }}" class="bn fadeInUp_set">
        <div class="pic" style="background-image: url(/files/{{ $item->image }})"></div>
        <h2>{{ $item->title }}</h2>
        <div class="text">{{ $item->desc }}</div>
        <div class="button"><span>подробнее</span></div>
    </a>
@endforeach