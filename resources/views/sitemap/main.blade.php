<?=
/* Using an echo tag here so the `<? ... ?>` won't get parsed as short tags */
'<?xml version="1.0" encoding="UTF-8"?>'.PHP_EOL
?>
<urlset
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

    <url>
        <loc>{{ asset('/') }}</loc>
        <lastmod>{{ date('Y-m-d\TH:i:sP', strtotime($last_news_time->created_at)) }}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>{{ asset('product-catalog') }}</loc>
        <lastmod>{{ date('Y-m-d\TH:i:sP', strtotime($last_news_time->created_at)) }}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>

    <url>
        <loc>{{ asset('articles') }}</loc>
        <lastmod>{{ date('Y-m-d\TH:i:sP', strtotime($last_news_time->created_at)) }}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    @foreach($articles as $a)
        <url>
            <loc>{{ asset('articles/'. $a->url) }}</loc>
            <lastmod>{{ date('Y-m-d\TH:i:sP', strtotime($a->created_at)) }}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.6</priority>
        </url>
    @endforeach

    <url>
        <loc>{{ asset('reviews') }}</loc>
        <lastmod>{{ date('Y-m-d\TH:i:sP', strtotime($last_news_time->created_at)) }}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>

    <url>
        <loc>{{ asset('about') }}</loc>
        <lastmod>{{ date('Y-m-d\TH:i:sP', strtotime($last_news_time->created_at)) }}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.3</priority>
    </url>
    <url>
        <loc>{{ asset('warranty-and-return') }}</loc>
        <lastmod>{{ date('Y-m-d\TH:i:sP', strtotime($last_news_time->created_at)) }}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.3</priority>
    </url>
    <url>
        <loc>{{ asset('how-to-order') }}</loc>
        <lastmod>{{ date('Y-m-d\TH:i:sP', strtotime($last_news_time->created_at)) }}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.3</priority>
    </url>
    <url>
        <loc>{{ asset('delivery') }}</loc>
        <lastmod>{{ date('Y-m-d\TH:i:sP', strtotime($last_news_time->created_at)) }}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.3</priority>
    </url>

    <url>
        <loc>{{ asset('stocks') }}</loc>
        <lastmod>{{ date('Y-m-d\TH:i:sP', strtotime($last_news_time->created_at)) }}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    @foreach($stocks as $s)
        <url>
            <loc>{{ asset('stocks/'. $s->url) }}</loc>
            <lastmod>{{ date('Y-m-d\TH:i:sP', strtotime($s->created_at)) }}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.6</priority>
        </url>
    @endforeach
</urlset>