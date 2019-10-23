<?php

namespace App\Http\Controllers;

use App\Http\FileClass;
use App\Subscribe;
use Carbon\Carbon;
use ElForastero\Transliterate\Transliteration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use App;
use Symfony\Component\HttpFoundation\Cookie;

class MainController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Libs
    |--------------------------------------------------------------------------
    */

    public function fileUploads(Request $request)
    {
        $rules = [
            'upload' => 'required',
        ];

        $v = Validator::make($request->all(), $rules);

        if ($v->fails()) return response()->json($v->errors(), 422);

        $file = new FileClass();
        $file_name = $file->uploadFile($request->upload);

        $message = 'Файл загружен';

        $callback = $_REQUEST['CKEditorFuncNum'];
        return '<script type="text/javascript">window.parent.CKEDITOR.tools.callFunction("' . $callback . '", "/uploads/'.$file_name.'", "' . $message . '" );</script>';
    }

    public function subscribe(Request $request)
    {
        $rules = [
            'email' => 'required',
        ];

        $v = Validator::make($request->all(), $rules);

        if ($v->fails()) return response()->json($v->errors(), 422);

        if  ($request->has('email')) {
            Subscribe::updateOrCreate(['email' => $request->email], ['email' => $request->email]);
        }

        return response()->json(['status' => 'ok', 'message' => 'Подписка оформлена']);
    }

    public function unSubscribe()
    {
        return view('pages.unsubscribing');
    }

    public function unSubscribing(Request $request)
    {
        $rules = [
            'email' => 'required',
        ];

        $v = Validator::make($request->all(), $rules);

        if ($v->fails()) return back()->withErrors($v->errors());

        if  ($request->has('email')) {
            Subscribe::where('email', $request->email)->delete();
        }

        return back()->with('status', 'Вы отписаны от рассылки');
    }

    public function request(Request $request)
    {
        $rules = [
            'name' => 'required',
            'phone' => 'required',
            'captcha' => 'required|captcha',
        ];

        $messages = [
            'name' => 'Не заполенна имя',
            'phone' => 'Не заполнен телефон',
            'email' => 'Не правильно набран E-mail',
        ];

        $v = Validator::make($request->all(), $rules, $messages);
        if ($v->fails()) return back()->withErrors($v->errors())->withInput();

        $data = $request->all();

        Mail::send('email.request', ['data' => $data], function($message) {
            $message->from('stan-poral@yandex.kz', 'Stan Info');
            $message->subject('Stan.kz | Жаңа сауал түсті');
            $message->to('evilgoogle@mail.ru');
        });

        return back()->with('message', 'Заявка принята. Ждите нашего звонка!');
    }

    /*
    |--------------------------------------------------------------------------
    | WebSite
    |--------------------------------------------------------------------------
    */

    public function index() {

        $main = App\Product::orderBy('position', 'ASC')->get();

        return view('pages.main', compact('main'));
    }

    public function industries() {

        $items = App\Industry::where('enable', 1)->orderBy('position', 'ASC')->get();

        return view('pages.industries', compact('items'));
    }

    public function about() {

        $about = App\About::find(1);
        $main = App\Product::orderBy('position', 'ASC')->get();

        return view('pages.about', compact('about', 'main'));
    }

    public function catalog($url = null) {

        if(isset($url)) {

            $active = $url;
            return view('pages.catolog', compact('active'));
        }
        return view('pages.catolog', compact(''));
    }

    public function contacts() {

        return view('pages.contacts', compact(''));
    }

    // Sitemaps
    public function sitemap() {
        $last_news_time = $this->last_news_time();

        return response()->view('sitemap.sitemap', compact('last_news_time'))->header('Content-Type', 'application/xml');
    }

    public function sitemap_items() {
        $items = App\Item::select('url', 'created_at')
            ->where('enable', 1)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->view('sitemap.items', compact('items'))->header('Content-Type', 'application/xml');
    }

    public function sitemap_main() {
        $last_news_time = $this->last_news_time();

        $articles = App\Article::where('enable', true)->orderBy('created_at', 'desc')->get();
        $stocks = App\Stock::where('enable', true)->orderBy('created_at', 'desc')->get();

        return response()->view('sitemap.main', compact('last_news_time', 'articles', 'stocks'))->header('Content-Type', 'application/xml');
    }

    public function sitemap_category() {
        $category = App\Category::select('id', 'url', 'updated_at')->where('enable', 1)->where('parent', 0)->get();

        $cat_data = [];
        foreach($category as $cat) {
            $news = App\Item::get_LastNewsByCat($cat->id);

            $cat_data[] = (object)[
                'url' => $cat->url,
                'created_at' => (count($news) > 0) ? $news[0]->created_at : $cat->created_at
            ];
        }

        return response()->view('sitemap.category', compact('cat_data'))->header('Content-Type', 'application/xml');
    }

}