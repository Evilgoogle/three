<?php

namespace App\Http\Controllers\Admin;

use App\Http\CrudClass;
use App\Contact;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class ContactsController extends Controller
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
    
    public function index() {

        $item = Contact::find(1);
        $info = $this->info;

        return view('admin.contacts', compact('item', 'info'));
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
