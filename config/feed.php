<?php

return [
    'feeds' => [
        'main' => [
            /*
             * Here you can specify which class and method will return
             * the items that should appear in the feed. For example:
             * 'App\Model@getAllFeedItems'
             *
             * You can also pass an argument to that method:
             * ['App\Model@getAllFeedItems', 'argument']
             */
            'items' => 'App\NewsSmall@getFeedItemsMain',

            /*
             * The feed will be available on this url.
             */
            'url' => '/feed',

            'title' => 'Main',

            /*
             * The view that will render the feed.
             */
            'view' => 'rss.news',
        ],
        'zen' => [
            /*
             * Here you can specify which class and method will return
             * the items that should appear in the feed. For example:
             * 'App\Model@getAllFeedItems'
             *
             * You can also pass an argument to that method:
             * ['App\Model@getAllFeedItems', 'argument']
             */
            'items' => 'App\NewsSmall@getFeedItemsZen',

            /*
             * The feed will be available on this url.
             */
            'url' => '/feed/zen',

            'title' => 'Zen',

            /*
             * The view that will render the feed.
             */
            'view' => 'rss.zen',
        ]
    ],
];
