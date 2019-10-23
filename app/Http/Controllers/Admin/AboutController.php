<?php

namespace App\Http\Controllers\Admin;

use App\About;
use App\Http\CrudClass;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AboutController extends Controller
{
    protected $crudClass;
    protected $info;

    public function __construct()
    {
        $this->crudClass = new CrudClass();
        $this->info = (object)[];
        $this->info->head = 'О компаний';
        $this->info->url = 'about';
        $this->info->modelName = 'About';
        $this->middleware('role:superadmin');
    }

    public function index()
    {
        $item = About::find(1);
        $info = $this->info;

        return view('admin.about', compact('item', 'info', 'products'));
    }

    public function insert(Request $request, $id = null)
    {

        $result = $this->crudClass->insert($this->info->modelName, $id ,$request, null, null, null, null, true);

        if ($result['status'] == 'ok')
            return redirect('/admin/'.$this->info->url)->with('message', 'Запись обновлена');
        else
            return back()->withErrors($result['message']);
    }
}