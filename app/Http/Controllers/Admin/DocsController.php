<?php

namespace App\Http\Controllers\Admin;

use App\Doc;
use App\Http\CrudClass;
use App\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class DocsController extends Controller
{
    protected $crudClass;
    protected $info;

    public function __construct()
    {
        $this->crudClass = new CrudClass();
        $this->info = (object)[];
        $this->info->head = 'Каталог';
        $this->info->url = 'catalog';
        $this->info->modelName = 'Doc';
        $this->info->product = Product::select('id', 'title')->get();
        $this->middleware('role:superadmin');
    }

    public function index()
    {
        $products = $this->info->product;
        $items = Doc::orderBy('created_at', 'DESC')->paginate(30);
        $info = $this->info;

        return view('admin.docs.index', compact('items', 'info', 'products'));
    }

    public function filter(Request $request) {

        $info = $this->info;
        if(isset($request->product)) {

            $items = Doc::where('product_id', $request->product)->orderBy('created_at', 'DESC')->paginate(30);
        } else {

            $items = Doc::orderBy('created_at', 'DESC')->paginate(30);
        }

        // filter
        $products = $this->info->product;

        // Дополнительная встака для пагинатора
        $patch = $request->all();

        // filter - значений для selected
        $filter_form = [
            'cats' => $request->product
        ];

        return view('admin.docs.index', compact(['items', 'info', 'products', 'filter_form', 'patch']));
    }

    public function add()
    {
        $info = $this->info;
        $products = $this->info->product;

        return view('admin.docs.insert', compact('items', 'info', 'products'));
    }

    public function edit($id)
    {
        $info = $this->info;
        $products = $this->info->product;

        try {
            $item = Doc::findOrFail($id);
        } catch (\Exception $e) {
            return back()->withErrors($e->getMessage());
        }

        return view('admin.docs.insert', compact(['item', 'info', 'products']));
    }

    public function remove($id)
    {
        $result = $this->crudClass->remove($this->info->modelName, $id);

        return back()->with($result);
    }

    public function insert(Request $request, $id = null)
    {
        $arr = [];
        if (empty($id)) {
            $arr = [
                'title' => 'required',
                'product_id' => 'required'
            ];
        }

        $rules = ['file' => 'mimes:jpeg,gif,png,jpg,doc,docx,pdf,svg,xls,xml,xlsx,txt,zip,rar,mp4,mp3,avi,wav,flv'];
        $rules = array_merge($rules, $arr);

        $v = Validator::make($request->all(), $rules);
        if ($v->fails()) return back()->withErrors($v->errors())->withInput();

        $bool_exceptions = ['enable'];
        $result = $this->crudClass->insert($this->info->modelName, $id ,$request, null, $bool_exceptions, null, null, true);

        if ($result['status'] == 'ok')
            return redirect('/admin/'.$this->info->url)->with('message', 'Запись обновлена');
        else
            return back()->withErrors($result['message']);
    }

    public function enable(Request $request)
    {
        $result = $this->crudClass->enable($this->info->modelName, $request);

        return response()->json($result);
    }

    public function removeImage(Request $request)
    {
        dd($request->all());
        $result = $this->crudClass->removeImage($request);

        return response()->json($result);
    }
}