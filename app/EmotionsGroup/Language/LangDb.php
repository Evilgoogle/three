<?php
namespace App\EmotionsGroup\Language;

/**
 * Class LangDb
 * Этот класс выдает список всех языков из таблицы Language и определяет язык по умолчанию.
 * @package App\Language
 */
class LangDb {

    /**
     * @var
     * Все языки вытащенные из базы
     */
    public $lang;

    /**
     * @var
     * Язык по умолчанию
     */
    public $default_lang;
    public $default_lang_id;
    public $default_lang_title;

    /**
     * @var
     * || Тут сохраняется язык на которого переключились ||
     *
     * Язык сюда надо установить извне, в иделае в файле /routes/web.php
     * Живой пример кода установки c настройкой роутинга -
     | $get_allLanguage = \App\EmotionsGroup\Language\LangDb::getInstance();
     | $language = $get_allLanguage->get();
     | $get_allLanguage->switch_lang = $get_allLanguage->default_lang;
     | foreach ($language as $lang) {
     |   $urls[] = $lang->url;
     | }
     |
     | $patch = Request::segment(1);
     | if(in_array($patch, $urls)) {
     |   $get_allLanguage->switch_lang = $patch;
     | }
     |
     | if($get_allLanguage->switch_lang == $get_allLanguage->default_lang) {
     |
     |   if($get_allLanguage->switch_lang == $patch) {
     |       $routing = $get_allLanguage->switch_lang;
     |   } else {
     |       $routing = '';
     |   }
     | } else {
     |   $routing = $get_allLanguage->switch_lang;
     | }
     |
     | $_ENV['routing'] = $routing;

     | Route::group(['prefix' => $routing], function () {
     |   Route::get('', 'MainController@index');
     |   Route::get('history', 'MainController@history');
     |   Route::get('activity', 'MainController@activity');
     |   Route::get('structure', 'MainController@structure');
     |   Route::get('docs', 'MainController@docs');
     |   Route::get('partners', 'MainController@partners');
     |   Route::get('vacancy', 'MainController@vacancy');
     |   Route::get('presentations', 'MainController@presentations');
     |   Route::get('cases', 'MainController@cases');
     |   Route::get('news/{url?}', 'MainController@news');
     |   Route::get('contacts', 'MainController@contacts');
     |   Route::get('services/{url?}', 'MainController@services');
     | });
     */
    public $switch_lang = '';

    /**
     * LangDb constructor.
     * Делаем запрос в базу
     */
    public function __construct() {
        $this->lang = \Illuminate\Support\Facades\DB::select('SELECT * FROM `languages` WHERE enable = TRUE ');
    }

    /* Шаблон проектирование - Singleton */
    static $instance = false;
    static public function getInstance() {
        if(!self::$instance) {
            self::$instance = new self;
        }
        return self::$instance;
    }

    /**
     * @return array
     * Это функция устанавливает языки по умолчанию и передает список языков вытащенный из базы. За счет функций getInstance запрос в базу по несколько раз не даелается. Это функция передает ранее сохраненый результат.
     */
    public function get() {

        /* Получаю язык которая по умолчанию */
        foreach ($this->lang as $item) {
            if($item->default == 1) {
                $this->default_lang = $item->url;
                $this->default_lang_id = $item->id;
                $this->default_lang_title = $item->title;
            }
        }

        return $this->lang;
    }
}