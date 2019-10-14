<?php
namespace App\EmotionsGroup\Crud;

use App\EmotionsGroup\Basic\Uploader;
use App\Http\FileClass;
use Illuminate\Support\Facades\Validator;
use App\EmotionsGroup\Language\LangDb;
use ElForastero\Transliterate\Transliteration;
use Illuminate\Support\Facades\Schema;

/**
 * Class EvilCrud
 * Этот расширенная версия Crud вводящий в метод insert некоторые коректировки
 *
 * @package App\EmotionsGroup\EvilCrud
 */
class EvilCrud extends \App\Http\CrudClass {

    public function __construct()
    {
        $this->fileClass = new FileClass('download/previews');
    }

    public function insert($modelName, $id = null, $request, $exceptions = null, $boolean_exceptions = null, $file_exceptions = null, $upload_url = null) {

        if (!empty($exceptions) && isset($exceptions))
            $exceptions_new = array_merge(['_token'], $exceptions);
        else
            $exceptions_new = ['_token'];

        $bools = [];
        if (!empty($boolean_exceptions) && isset($boolean_exceptions))
            $bools = $boolean_exceptions;

        $files = [];
        if (!empty($file_exceptions) && isset($file_exceptions))
            $files = $file_exceptions;

        $requestNew = (object)$request->except($exceptions_new);

        $item = eval('return new \\App\\'. $modelName .';');
        $tableName = $item->getTable();
        if (Schema::hasTable($tableName)) {
            $tableColumns = Schema::getColumnListing($tableName);
            if (isset($id) && !empty($id)) {
                try {
                    $item = eval('return \\App\\' . $modelName . '::findOrFail($id);');
                } catch (\Exception $e) {
                    return $result = [
                        'status' => 'errors',
                        'message' => $e->getMessage()
                    ];
                }
            }

            try {
                foreach ($requestNew as $key => $value) {
                    if (!in_array($key, $bools) && !in_array($key, $files) && !isset($_FILES[$key]) && in_array($key, $tableColumns)) {
                        /*
                        | Если попадется массив что указывает на наличие языков то идет упаковка в json
                        */
                        if(is_array($value)) {
                            $item->$key = json_encode($value, JSON_UNESCAPED_UNICODE);
                        } else {
                            $item->$key = $value;

                            /*
                            | Если придет данная со значением в формате base64, то сработает cropUpload
                            */
                            if(preg_match('#base64#ui', $value)) {
                                try {
                                    $item->$key = (new Uploader($modelName))->cropUpload($key, $value);
                                } catch (\Exception $e) {
                                    return $result = [
                                        'status' => 'errors',
                                        'message' => $e->getMessage()
                                    ];
                                }
                            }
                        }

                    }

                    if (in_array($key, $bools) && in_array($key, $tableColumns)) {
                        $item->$key = true;
                    }

                    if (isset($_FILES[$key]) && (!is_array($_FILES[$key]['tmp_name']) || is_object(!$_FILES[$key]['tmp_name'])) && in_array($key, $tableColumns)) {
                        $this->fileClass->removeFile($key);
                        $this->fileClass->putFile($value, $key, $item, false, $upload_url);
                    }

               }

               if (!empty($bools)) {
                   foreach ($bools as $value) {
                       if (array_key_exists($value, $requestNew) === false && in_array($value, $tableColumns)) {
                           $item->$value = false;
                       }
                   }
               }
            } catch (\Exception $e) {
               return $result = [
                   'status' => 'errors',
                   'message' => $e->getMessage()
               ];
            }

            $item->save();

            $array_map = [
                "&amp;" => "&",
                "amp;" => "&",
                "&nbsp;" => " ",
                "nbsp;" => " ",
                "&laquo;" => "«",
                "laquo;" => "«",
                "&raquo;" => "»",
                "raquo;" => "»",
                "&ndash;" => "–",
                "ndash;" => "–",
                "&mdash;" => "—",
                "mdash;" => "—",
                "&lsquo;" => "‘",
                "lsquo;" => "‘",
                "&rsquo;" => "’",
                "rsquo;" => "’",
                "&sbquo;" => "‚",
                "sbquo;" => "‚",
                "&ldquo;" => "“",
                "ldquo;" => "“",
                "&rdquo;" => "”",
                "rdquo;" => "”",
                "&bdquo;" => "„",
                "bdquo;" => "„",
                "&hellip;" => "…",
                "hellip;" => "…",
                "&prime;" => "′",
                "prime;" => "′",
                "&Prime;" => "″",
                "Prime;" => "″"
            ];

            if (in_array('order', $tableColumns) || in_array('url', $tableColumns)) {
                if (in_array('url', $tableColumns) /*&& !array_key_exists('url', (array)$requestNew)*/) {
                    if (in_array('title', $tableColumns) /*&& empty($item->url)*/) {
                        /*
                        | Если попадется массив c ключом set_lang что указывает на наличие языков,
                        | то в Transliteration пойдет title того языка который идет по умолчанию
                        */
                        if(isset($requestNew->url)) {
                            if($requestNew->url == null) {
                                if(is_array($requestNew->title)) {
                                    if(array_key_exists('set_lang', $requestNew->title)) {
                                        foreach ($requestNew->title as $title_array) {
                                            foreach ($title_array as $language => $setTitle) {
                                                $lang = LangDb::getInstance();
                                                $lang->get();
                                                if ($lang->default_lang == $language) {
                                                    $item->url = Transliteration::make(strip_tags(trim(str_replace(array_keys($array_map), array_values($array_map), htmlentities($setTitle, null, 'utf-8')))).' '.$item->id, ['type' => 'url', 'lowercase' => true]);
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    $item->url = Transliteration::make(strip_tags(trim(str_replace(array_keys($array_map), array_values($array_map), htmlentities($requestNew->title, null, 'utf-8')))).' '.$item->id, ['type' => 'url', 'lowercase' => true]);
                                }
                            } else {
                                $item->url = Transliteration::make(strip_tags(trim(str_replace(array_keys($array_map), array_values($array_map), htmlentities($requestNew->url, null, 'utf-8')))), ['type' => 'url', 'lowercase' => true]);
                            }
                        } else {
                            $item->url = Transliteration::make(strip_tags(trim(str_replace(array_keys($array_map), array_values($array_map), htmlentities($requestNew->title, null, 'utf-8')))).' '.$item->id, ['type' => 'url', 'lowercase' => true]);
                        }
                    }
                }
                $item->save();
            }

            if (!empty($files)) {
                $this->filesInsert($modelName, $request->only($files), $item->id);
            }

            $result = [
                'status' => 'ok',
                'message' => $item
            ];
        } else
            $result = [
                'status' => 'errors',
                'message' => 'Таблица не существует!'
            ];

        return $result;

    }

    public function enable($modelName, $request, $column = null)
    {
        $rules = [
            'id' => 'required',
            'check' => 'required'
        ];

        $v = Validator::make($request->all(), $rules);

        if ($v->fails())
            return $result = [
                'status' => 'errors',
                'message' => $v->errors()
            ];

        $id = $request->id;
        $check = $request->check;

        try {
            try {
                $item = eval('return \\App\\'. $modelName .'::findOrFail($id);');
            } catch (\Exception $e) {
                return $result = [
                    'status' => 'errors',
                    'message' => $e->getMessage()
                ];
            }

            $check = $check == 1 ? 0 : 1;
            if($column === null) {
                $item->enable = $check;
            } else {
                $item->$column = $check;
            }
            $item->save();

            $tableName = $item->getTable();
            if (Schema::hasTable($tableName)) {
                $tableColumns = Schema::getColumnListing($tableName);
                if (in_array('parent', $tableColumns)) {
                    eval('\\App\\'. $modelName .'::where("parent", $id)->update(["enable" => $check]);');
                }
            }

            return $result = [
                'status' => 'ok',
                'message' => 'Состояние изменено',
                'value' => $check
            ];
        } catch (\Exception $e) {
            return $result = [
                'status' => 'errors',
                'message' => $e->getMessage()
            ];
        }
    }

    public function remove($modelName, $id)
    {
        try {
            $item = eval('return \\App\\'. $modelName .'::findOrFail($id);');
            @unlink('./download/previews/'.$item->image);

        } catch (\Exception $e) {
            return $result = [
                'status' => 'errors',
                'message' => $e->getMessage()
            ];
        }

        if (eval('return \\App\\'. $modelName .'::destroy($id);')) {
            return $result = [
                'status' => 'ok',
                'message' => 'Запись удалена'
            ];
        } else
            return $result = [
                'status' => 'errors',
                'message' => 'Ошибка, попробуйте снова'
            ];
    }
}