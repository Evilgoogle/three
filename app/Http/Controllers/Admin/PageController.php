<?php

namespace App\Http\Controllers\Admin;

use App\Http\CrudClass;
use App\Page;
use App\PagesItem;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class PageController extends Controller
{
    protected $crudClass;
    protected $info;

    public function __construct()
    {
        $this->crudClass = new CrudClass();
        $this->info = (object)[];
        $this->info->head = '';
        $this->info->url = 'pages';
        $this->info->modelName = 'Page';
        $this->middleware('role:superadmin');
    }
    
    public function index($url) {

        if($url == 'delivery') {

            $item = Page::find(1);
            $images = PagesItem::where('page_id', $item->id)->get();

            $this->info->head = 'Доставка и оплата';
            $info = $this->info;
        } elseif($url == 'warranty-and-return') {

            $item = Page::find(2);
            $this->info->head = 'Гарантии и возврат';
            $info = $this->info;
        } elseif($url == 'about') {

            $item = Page::find(3);
            $this->info->head = 'О компании';
            $info = $this->info;
        } elseif($url == 'how-to-order') {

            $item = Page::find(4);
            $this->info->head = 'Как заказать?';
            $info = $this->info;
        }

        $return_url = $url;
        return view('admin.page.insert', compact('item', 'info', 'return_url', 'images'));
    }

    public function insert(Request $request, $id = null)
    {

        $result = $this->crudClass->insert($this->info->modelName, $id ,$request, null, null, null, null, true);

        if ($result['status'] == 'ok')
            return redirect('/admin/'.$this->info->url.'/'.$request->url)->with('message', 'Запись обновлена');
        else
            return back()->withErrors($result['message']);
    }
}
