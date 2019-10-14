<?=
/* Using an echo tag here so the `<? ... ?>` won't get parsed as short tags */
'<?xml version="1.0" encoding="UTF-8"?>'.PHP_EOL
?>
<urlset
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

    @foreach($cat_data as $cat)
        <url>
            <loc>{{ asset('/goods/'.urlencode($cat->url)) }}</loc>
            <lastmod>{{ date('Y-m-d\TH:i:sP', strtotime($cat->created_at)) }}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.4</priority>
        </url>
    @endforeach

</urlset>