<?php

namespace App\Http\Controllers\Admin;

use App\EmotionsGroup\Basic\Uploader;
use App\Http\Controllers\Controller;
use App\Subscribe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Filemanager;

class AdminController extends Controller
{

    public function __construct()
    {
        $this->middleware('role:superadmin|editor');
    }

    public function index()
    {
        $subscribes = Subscribe::all();

        return view('admin.dashboard', compact(['subscribes']));
    }

    public function addParam(Request $request)
    {
        $rules = [
            'param' => 'required',
        ];

        $v = Validator::make($request->all(), $rules);

        if ($v->fails()) return response()->json($v->errors(), 422);

        return view('admin.params.'. $request->param);
    }

    public function removeArrJson(Request $request)
    {
        $rules = [
            'id' => 'required',
            'column' => 'required',
            'model' => 'required',
            'arr' => 'required'
        ];

        $model = $request->model;
        $column = $request->column;
        $id = $request->id;
        $arr = $request->arr;
        $index = $request->index;

        $v = Validator::make($request->all(), $rules);

        if ($v->fails()) return response()->json($v->errors(), 422);

        try {
            try {
                $item = eval('return \\App\\'. $model .'::findOrFail($id);');
            } catch (\Exception $e) {
                return $result = [
                    'status' => 'errors',
                    'message' => $e->getMessage()
                ];
            }

            $itemNew = json_decode($item->$column);
            if (empty($index))
                eval('return $itemNew->$arr = null;');
            else
                eval('return $itemNew[$index]->$arr = null;');
            $item->$column = json_encode($itemNew, JSON_UNESCAPED_UNICODE);
            $item->save();

            $result = [
                'status' => 'ok',
                'message' => 'Аргумент удален',
            ];
        } catch (\Exception $e) {
            return $result = [
                'status' => 'errors',
                'message' => $e->getMessage()
            ];
        }

        return response()->json($result);
    }

    // FILEMANGER
    public function filemanager(Request $request) {

        try {

            $set = new Filemanager();
            $set->name = preg_replace('#\.[a-z]{3}#ui', '', $request->name);

            $set->image = new Uploader('pic');
            $set->image->rootUpload = 'files';
            $set->image->minwidth = 50;
            $set->image->minheight = 50;
            $set->image = $set->image->filemanagerUpload($request->image);

            $set->type = $request->type;
            $set->size = $request->size;
            $set->save();

            return view('admin._input.filemanager.item', compact('set'));

        } catch (\Exception $e) {
            return response()->json($e->getMessage(), 422);
        }
    }

    public function filemanager_load(Request $request) {

        $dinamic_images = [];
        if(isset($request->dinamic_images) || count($request->dinamic_images)) {
            $dinamic_images = $request->dinamic_images;
        }

        $limit = 24;
        $paginate = new \App\EmotionsGroup\Basic\Paginator();

        if ($request->ajax() && $request->page) {

            $paginate->ajax($limit, $request->page, null, 'filemanager');
            $get = Filemanager::orderBy('created_at', 'desc')->offset($paginate->start)->limit($limit)->get();

            return response()->json([
                'page' => $request->page,
                'total'  => $paginate->paginate['total'],
                'view'  => view('admin._input.filemanager.ajax', compact('get'))->render()
            ]);
        } else {

            $paginate->go('Item', $limit, null, null, 'filemanager');
            $paginate_view = $paginate->paginate;

            $get = Filemanager::orderBy('created_at', 'desc')->offset($paginate->start)->limit($limit)->get();
        }

        return response()->json([
            'page' => $paginate_view['page'],
            'total'  => $paginate_view['total'],
            'view'  => view('admin._input.filemanager.items', compact('get', 'paginate_view', 'dinamic_images'))->render()
        ]);
    }

    public function filemanager_crop(Request $request) {

        try {

            $set = Filemanager::where('id', $request->id)->first();
            $image = $set->image;

            $set->image = new Uploader('pic');
            $set->image->rootUpload = 'files';
            $set->image->minwidth = 50;
            $set->image->minheight = 50;
            $get_image = $set->image->filemanagerUpload($request->image, null, $image);
            $width = $set->image->new_width;
            $height = $set->image->new_height;
            $set->size = $set->image->filesize;
            $set->image = $get_image;

            $set->save();

            $set['width'] = $width;
            $set['height'] = $height;
            $set['rand'] = md5(rand(1,100));

            return response()->json($set);
        } catch (\Exception $e) {
            return response()->json($e->getMessage(), 422);
        }

    }

    public function filemanager_resize(Request $request) {

        $data = json_decode($request->data);
        if($data[2]->value < 200) {

            return response()->json('Нельзя делать изображение меньше 200px', 422);
        } elseif($data[2]->value > 4096) {

            return response()->json('Нельзя делать изображение больше 4096px', 422);
        } else {

            try {

                $set = Filemanager::where('id', $data[0]->value)->first();
                $image = $set->image;

                // Полная картина
                $set->image = new Uploader('pic');
                $set->image->minwidth = 50;
                $set->image->minheight = 50;
                $set->image->resize_width = (int)$data[2]->value;
                $set->image->rootUpload = 'files';
                $get_image = $set->image->upload(preg_replace('#\?id\=.*#ui', '', $data[1]->value), true, $image);
                $width = $set->image->new_width;
                $height = $set->image->new_height;
                $set->size = $set->image->filesize;
                $set->image = $get_image;

                $set->save();

                $set['width'] = $width;
                $set['height'] = $height;
                $set['rand'] = md5(rand(1,100));

                return response()->json($set);

            } catch (\Exception $e) {
                return response()->json($e->getMessage(), 422);
            }
        }
    }

    public function filemanager_namealt(Request $request) {

        $data = json_decode($request->data);
        try {
            $set = Filemanager::find($data[0]->value);
            $set->name = $data[1]->value;
            $set->alt = $data[2]->value;
            $set->save();

            return response()->json($set);

        } catch (\Exception $e) {
            return response()->json($e->getMessage(), 422);
        }
    }

    public function filemanager_del(Request $request) {

        try {
            $set = Filemanager::find($request->id);
            @unlink('./files/'.$set->image);
            $set->delete();

            return response()->json('ok');

        } catch (\Exception $e) {
            return response()->json($e->getMessage(), 422);
        }
    }

    public function filemanager_replace(Request $request) {

        try {

            $set = Filemanager::find($request->id);
            $image = $set->image;

            // Полная картина
            $set->image = new Uploader('pic');
            $set->image->minwidth = 50;
            $set->image->minheight = 50;
            $set->image->rootUpload = 'files';
            $get_image = $set->image = $set->image->filemanagerUpload($request->image, null, $image);
            $set->image = $get_image;

            $set->type = $request->type;
            $set->size = $request->size;
            $set->save();

            $set['rand'] = md5(rand(1,100));

            return response()->json($set);

        } catch (\Exception $e) {
            return response()->json($e->getMessage(), 422);
        }
    }

    public function filemanager_search(Request $request) {

        $data = json_decode($request->data);
        $get = Filemanager::where('name', 'like', '%'.$data[0]->value.'%')->orderBy('created_at', 'desc')->limit(18)->get();

        return view('admin._input.filemanager.ajax', compact('get'));
    }

    public function filemanager_paginator(Request $request) {

        $page = $request->page;
        $total = $request->total;
        $active = $request->active;

        return view('admin._input.filemanager.paginator', compact('page', 'total', 'active'));
    }
}