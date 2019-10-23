<?php

namespace App\Http\Controllers\Admin;

use App\ClientRequest;
use App\Http\CrudClass;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ClientRequestController extends Controller
{
    protected $crudClass;
    protected $info;

    public function __construct()
    {
        $this->crudClass = new CrudClass();
        $this->info = (object)[];
        $this->info->head = 'Заявки';
        $this->info->url = 'requests';
        $this->info->modelName = 'ClientRequest';
        $this->middleware('role:superadmin');
    }

    public function index()
    {
        $items = ClientRequest::orderBy('created_at', 'desc')->get();
        $info = $this->info;

        return view('admin.request.index', compact(['items', 'info']));
    }

    public function edit($id)
    {
        $info = $this->info;

        try {
            $item = ClientRequest::findOrFail($id);
        } catch (\Exception $e) {
            return back()->withErrors($e->getMessage());
        }

        return view('admin.request.insert', compact(['item', 'order_goods', 'info']));
    }

    public function remove($id)
    {
        $result = $this->crudClass->remove($this->info->modelName, $id);

        return back()->with($result);
    }

    public function insert(Request $request, $id = null)
    {
        $item = ClientRequest::findOrFail($id);
        if ($request->has('enable')) {
            $item->enable = true;
        } else {
            $item->enable = false;
        }
        $item->save();

        return redirect('/admin/'.$this->info->url)->with('message', 'Заявка обработана');
    }
}
