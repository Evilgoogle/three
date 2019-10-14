<?php
function public_path($path = '') {
    return $_SERVER['DOCUMENT_ROOT'].'/'.$path;
}
function str_random($num) {
    return random_bytes($num);
}
include '../app/EmotionsGroup/Basic/Uploader.php';

if($_POST['ckCsrfToken'] == $_COOKIE['ckCsrfToken']) {

    try {
        $upl = new \App\EmotionsGroup\Basic\Uploader('news');
        $upl->rootUpload = 'uploads';
        $upl->minwidth = 200;
        $upl->resize_width = 420;
        $upl = $upl->filemanagerUpload($_FILES['upload']['tmp_name'], true);

        $message = 'Файл загружен';

        $callback = $_REQUEST['CKEditorFuncNum'];
        echo '<script type="text/javascript">window.parent.CKEDITOR.tools.callFunction("' . $callback . '", "/uploads/'.$upl.'", "' . $message . '" );</script>';

    } catch (\Exception $e) {

        $message = $e->getMessage();
        $callback = $_REQUEST['CKEditorFuncNum'];
        $upl = '';
        echo '<script type="text/javascript">window.parent.CKEDITOR.tools.callFunction("' . $callback . '", "/uploads/'.$upl.'", "' . $message . '" );</script>';
    }
} else {

    $message = 'Не соответствует токен';
    $callback = $_REQUEST['CKEditorFuncNum'];
    $upl = '';
    echo '<script type="text/javascript">window.parent.CKEDITOR.tools.callFunction("' . $callback . '", "/uploads/'.$upl.'", "' . $message . '" );</script>';
}