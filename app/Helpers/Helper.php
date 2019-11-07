<?php
/*
  |--------------------------------------------------------------------------
  | Libs
  |--------------------------------------------------------------------------
*/

if(!function_exists('wtf')) {
    /**
     * @param $var
     */
    function wtf($var) {
        echo '<pre>'.print_r($var, 1).'</pre>';
    }
}

if (!function_exists('getBlock')) {

    function getBlock($key) {
        return \App\Block::where('key', $key)->where('enable', true)->pluck('desc')->first();
    }
}

if (!function_exists('configKey')) {
    function configKey($key) {
        return App\Config::where('key', $key)->pluck('value')->first();
    }
}

if(!function_exists('isJSON')) {
    /**
     * isJSON - Проверяет не является ли данные в формате json
     * @param $string
     * @return bool
     */
    function isJSON($string) {
        return ((is_string($string) && (is_object(json_decode($string)) || is_array(json_decode($string))))) ? true : false;
    }
}

// для админки
if(!function_exists('lang_filter')) {
    /**
     * lang_filter - проверяет не является ли данная json массивом,
     * если да то возвращает значение из массива у которого ключ равна языку по умолчанию
     * @param $item
     * @param $json
     * @return mixed
     */
    function lang_filter($item, $json = false)
    {
        if($json) {
            $lang = \App\EmotionsGroup\Language\LangDb::getInstance();
            $lang->get();
            $item = (array)$item['set_lang'];

            //Тут делается isset на тот случай - в $item иногда может не быть языка установленного по умолчанию в $lang->default_lang. Такое может получится если добавили записи в базу и потом добавили новый язык. А этого нового языка нету в массиве запися.
            return isset($item[$lang->default_lang]) ? $item[$lang->default_lang] : '';
        } else {
            if (isJSON($item)) {
                $item = (array)json_decode($item);
                $lang = \App\EmotionsGroup\Language\LangDb::getInstance();
                $lang->get();
                $item = (array)$item['set_lang'];

                //Тут делается isset на тот случай - в $item иногда может не быть языка установленного по умолчанию в $lang->default_lang. Такое может получится если добавили записи в базу и потом добавили новый язык. А этого нового языка нету в массиве запися.
                return isset($item[$lang->default_lang]) ? $item[$lang->default_lang] : '';
            } else {
                return $item;
            }
        }
    }
}

if(!function_exists('langFilter')) {
    /*
     | langFilter - вытаскивает значение из JSON массива запися по языку что идет по умолчанию или по языку что был выбран.
     | @param $item
     | @return mixed
     */
    function langFilter($array, $lang = null) {
        $get_lang = \App\EmotionsGroup\Language\LangDb::getInstance();
        $get_lang->get();

        $def_lang = $get_lang->default_lang;

        if (!empty($lang) && !is_null($lang))
            $get_lang->switch_lang = $lang;

        if (isJSON($array)) {
            $array = json_decode($array);
            foreach ($array as $is_lang=>$langs) {
                foreach ($langs as $lang=>$item) {
                    if($lang == $get_lang->switch_lang) {
                        if (!empty($item))
                            return $item;
                        else {
                            return $langs->$def_lang;
                        }
                    }
                }
            }
        }
    }
}

if(!function_exists('getTexti')) {
    /*
     | getTexti - это функция возвращает ответ от класса TextInterface. Был создан чтоб не писать большой путь к классу
     | @param $item
     | @return mixed
     */
    function getTexti($key) {
        $var = \App\EmotionsGroup\Basic\TextInterface::getInstance();
        return $var->get($key);
    }
}

if(!function_exists('getRoute')) {
    /*
     | getRoute - это функция возвращает путь от $_ENV['routing'] что определяется в /route/web.php
     | @return mixed
     */
    function getRoute() {
        if(empty($_ENV['routing'])) {
            return '';
        } else {
            return '/'.$_ENV['routing'];
        }
    }
}

if(!function_exists('getActiveLang')) {
    /*
     | getActiveLang - это функция возвращает загаловок активного языка
     | @return mixed
     */
    function getActiveLang() {
        $lang = \App\EmotionsGroup\Language\LangDb::getInstance();
        $lang->get();
        $item = \App\Language::where('url', $lang->switch_lang)->first();
        return $item->title;
    }
}

if(!function_exists('issetImg')) {

    /**
     * issetImg - провереят приходит ли от базы значение где может стоять изображение. Если нету, то устанавливает изображение по умолчанию
     * @param $img
     * @return string
     */
    function issetImg($img = null) {
        if(isset($img)) {
            if(file_exists('files/'.$img)) {
                return asset('files/'.preg_replace('#\s#ui', '%20', $img));
                //return asset('files/'.$img);
            } else {
                return asset('images/default.jpg');
            }
        } else {
            return asset('images/default.jpg');
        }
    }
}

if(!function_exists('escape_string')) {

    /**
     * escape_string - работает как mysqli_real_escape_string
     * @param $term
     * @return string
     */
    function escape_string($term) {

        // removing symbols used by MySQL
        $reservedSymbols = ['+', '<', '>', '@', '(', ')', '~', '\'', '\"', '/*', '*/'];
        $term = str_replace($reservedSymbols, '', $term);

        $words = explode(' ', $term);

        foreach($words as $key => $word) {
            /*
             * applying + operator (required word) only big words
             * because smaller ones are not indexed by mysql
             */
            if(strlen($word) >= 3) {
                $words[$key] = '+' . $word . '*';
            }
        }

        $searchTerm = implode( ' ', $words);

        return $searchTerm;
    }
}

if(!function_exists('escape_string_clear')) {

    function escape_string_clear($term) {

        $reservedSymbols = ['+', '<', '>', '@', '(', ')', '~', '\'', '\"', '/*', '*/'];
        return str_replace($reservedSymbols, '', $term);
    }
}

// Нужен для файлманеждер
if(!function_exists('date_vk')) {

    /*
     * date_vk - отдает дату как на vk
     */
    function date_vk($value)
    {

        $time = strtotime($value);
        $d = new \DateTime($value);
        $months = ['Ян', 'Фб', 'Мр', 'Ап', ' Ма', 'Ин', 'Ил', 'Ав', 'Сн', 'Ок', 'Но', 'Де'];

        if ($time > strtotime('-10 seconds')) {

            return 'Пару секунд';
        } elseif ($time > strtotime('-1 minutes')) {

            return floor((strtotime('now') - $time)) . ' секунд';
        } elseif ($time > strtotime('today')) {

            return 'Сегодня '.$d->format('G:i');
        } elseif ($time > strtotime('yesterday')) {

            return 'Вчера '.$d->format('G:i');
        } else {
            return $d->format('j') . ' ' . $months[$d->format('n') - 1] . ', ' . $d->format('G:i');
        }
    }
}

if(!function_exists('create_tegCat')) {

    /**
     * @param $cat
     */
    function create_tegCat($cat) {
        $cats = explode(',', $cat);

        foreach ($cats as $s) {
            echo '<div class="display_block">'.htmlspecialchars($s).'</div>';
        }
    }
}

if(!function_exists('setDinamic_image')) {

    function setDinamic_image($id, $arr = []) {

        foreach ($arr as $item) {
            if($item['id'] == $id) {
                return '?id='.$item['rand'];
            }
        }
    }
}

if(!function_exists('downloadZip')) {

    function downloadZip($files, $name) {

        $zip = new ZipArchive;
        $zip_name = public_path('/uploads/'.$name.'.zip');
        if ($zip->open($zip_name, ZipArchive::CREATE) === TRUE) {

            foreach ($files as $f) {
                $patch = public_path('/uploads/' . $f);
                if (is_file($patch)) {
                    $zip->addFile($patch, $f);
                }
            }
            $zip->close();

            if (file_exists($zip_name)) {
                header('Content-Description: File Transfer');
                header('Content-Type: application/octet-stream');
                header('Content-Disposition: attachment; filename="' . basename($zip_name) . '"');
                header('Expires: 0');
                header('Cache-Control: must-revalidate');
                header('Pragma: public');
                header('Content-Length: ' . filesize($zip_name));
                readfile($zip_name);
                unlink($zip_name);
            }
        }
    }
}
