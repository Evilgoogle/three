<?=
/* Using an echo tag here so the `<? ... ?>` won't get parsed as short tags */
'<?xml version="1.0" encoding="UTF-8"?>'.PHP_EOL
?>
<sitemapindex xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/siteindex.xsd"
              xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

    <sitemap>
        <loc>{{ asset('/sitemap-main.xml') }}</loc>
        <lastmod>{{ date('Y-m-d\TH:i:sP', strtotime($last_news_time->created_at)) }}</lastmod>
    </sitemap>

    <sitemap>
        <loc>{{ asset('/sitemap-category.xml') }}</loc>
        <lastmod>{{ date('Y-m-d\TH:i:sP', strtotime($last_news_time->created_at)) }}</lastmod>
    </sitemap>

    <sitemap>
        <loc>{{ asset('/sitemap-items.xml') }}</loc>
        <lastmod>{{ date('Y-m-d\TH:i:sP', strtotime($last_news_time->created_at)) }}</lastmod>
    </sitemap>

</sitemapindex>