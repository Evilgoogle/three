(function () {
    CKEDITOR.plugins.add('emot_filemanager', {
        init: function( editor ) {
//console.log(editor);
            editor.addCommand('openModal', {
                exec: function(editor) {

                    window.call_filemanager(editor);
                }
            });

            editor.ui.addButton( 'emot_filemanager', {
                label: 'Открыть файловый менеджер',
                command: 'openModal',
                toolbar: 'insert',
                icon : this.path + 'icons/folder.png'
            });
        }
    });
})();