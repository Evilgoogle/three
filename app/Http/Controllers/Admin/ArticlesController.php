<?php

namespace App\Http\Controllers\Admin;

use App\Article;
use App\Http\CrudClass;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class ArticlesController extends Controller
{
    protected $crudClass;
    protected $info;

    public function __construct()
    {
        $this->crudClass = new CrudClass();
        $this->info = (object)[];
        $this->info->head = 'Статьи';
        $this->info->url = 'articles';
        $this->info->modelName = 'Article';
        $this->middleware('role:superadmin');
    }

    public function index()
    {
        $items = Article::orderBy('created_at', 'DESC')->get();
        $info = $this->info;

        return view('admin.articles.index', compact('items', 'info'));
    }

    public function add()
    {
        $info = $this->info;

        return view('admin.articles.insert', compact('items', 'info'));
    }

    public function edit($id)
    {
        $info = $this->info;

        try {
            $item = Article::findOrFail($id);
        } catch (\Exception $e) {
            return back()->withErrors($e->getMessage());
        }

        return view('admin.articles.insert', compact(['item', 'info']));
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
                'image' => 'required',
            ];
        }

        $rules = [];
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
}
