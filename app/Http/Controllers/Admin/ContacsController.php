<?php

namespace App\Http\Controllers\Admin;

use App\Contact;
use App\Http\CrudClass;
use App\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class ContacsController extends Controller
{
    protected $crudClass;
    protected $info;

    public function __construct()
    {
        $this->crudClass = new CrudClass();
        $this->info = (object)[];
        $this->info->head = 'Контакты';
        $this->info->url = 'contacts';
        $this->info->modelName = 'Contact';
        $this->middleware('role:superadmin');
    }

    public function index()
    {
        $item = Contact::find(1);
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