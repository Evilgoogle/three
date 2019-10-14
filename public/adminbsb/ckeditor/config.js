/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
    /*
     |--------------------------------------------------------------------------
     | Libs
     |--------------------------------------------------------------------------
     */
    config.language = 'ru';
    CKEDITOR.config.allowedContent = true;
    // config.enterMode = CKEDITOR.ENTER_BR;
    //config.filebrowserUploadUrl = '/file-uploads?_token='+$("[name^='csrf-token']").attr("content");
    config.filebrowserUploadUrl = 'http://'+location.hostname+'/file.php?_token='+$("[name^='csrf-token']").attr("content");

    // Toolbar configuration generated automatically by the editor based on config.toolbarGroups.
    config.toolbar = [
        { name: 'document', groups: [ 'mode', 'document', 'doctools' ], items: [ 'Source', /*'-', 'Save', 'NewPage', 'Preview', 'Print', '-', 'Templates'*/ ] },
        // { name: 'clipboard', groups: [ 'clipboard', 'undo' ], items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
        // { name: 'editing', groups: [ 'find', 'selection', 'spellchecker' ], items: [ 'Find', 'Replace', '-', 'SelectAll', '-', 'Scayt' ] },
        // { name: 'forms', items: [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ] },
        // '/',
        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat' ] },
        { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ], items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', /*'CreateDiv',*/ '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', /*'Language'*/ ] },
        { name: 'links', items: [ 'Link', 'Unlink', /*'Anchor'*/ ] },
        { name: 'insert', items: [ /*'Image', 'Flash',*/ /*'Table',*/ 'HorizontalRule', 'Smiley', 'SpecialChar', 'Youtube', 'Embed', 'emot_filemanager'/*'PageBreak', 'Iframe'*/ ] },
        '/',
        { name: 'styles', items: [ 'Styles', 'Format', /*'Font,'*/ 'FontSize' ] },
        { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
        { name: 'tools', items: [ 'Maximize', 'ShowBlocks' ] },
        // { name: 'others', items: [ '-' ] },
        // { name: 'about', items: [ 'About' ] }
    ];

    /*
     |--------------------------------------------------------------------------
     | WebSite
     |--------------------------------------------------------------------------
     */

    config.extraPlugins = 'youtube,emot_filemanager';
    config.youtube_responsive = true;
    //config.extraPlugins = 'embed';
    config.colorButton_colors = '000000,1D1D1E,E83F8B,F1F1F1,848484';
    config.contentsCss = ["/css/text_editor.css"];
    config.enterMode = CKEDITOR.ENTER_P;
    config.height = 300;
};
