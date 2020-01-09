<?php

namespace App\Http\ViewComposers;

use App\Seo;
use App\Contact;
use Illuminate\Support\Facades\Request;
use Illuminate\View\View;

class MainComposer
{

    public function compose(View $view)
    {

    	// contacts
    	//$contacts = Contact::find(1);

        // seo
        $segments = Request::segments();
        $url = implode('/', $segments);
        if (empty($url)) $url = "main";
        $seo = Seo::where('url', $url)->first();

        $view->with(compact('seo'));
    }

}