/* -> Main */
// Выбранный файл
var selected_file = {};
var selected_punct = 0;

// Возвращать картину в ckeeditor
var editor_returned = false;

// Текстовый контейнер ckeditor
var ckeditor;

// Индентификатор файл манеджера
var basic_id;

// Сборщик обновленных картин. Здесь записываются id картин которые которые динамический изменяются c js (обрезать, размер, заменить)
var dinamic_images = [];

// Вызовы модалки для загрузки изображение
$(document).on('click', '.filemanager_open', function () {

    basic_id = $(this).data('basic_id');

    // Вызов модалки
    editor_returned = false;
    $('#image_manager').modal('toggle');
    load_files();
});

// Вызовы модалки для загрузки изображение в ckeeditor
window.call_filemanager = function (editor) {

    // Вызов модалки
    editor_returned = true;
    ckeditor = editor;
    $('#image_manager').modal('toggle');
    load_files();
};

// Загрузка файлов
$(document).on('click', '#image_manager .upload_file', function () {

    $('#image_manager #upload_block').addClass('active');
    $('#image_manager .overlay_modal').css('display', 'block');
});

// Просмотр картины
$(document).on('click', '#image_manager .right .act .js_view', function (event) {
    var image = event.target.dataset.image;
    $('#image_manager .view_block').addClass('active');
    $('#image_manager .overlay_modal').css('display', 'block');
    $('#image_manager .view_block .view').attr('style', 'background: url(/files/'+image+')');
});

// Открыть окно crop
$(document).on('click', '#image_manager .right .act .js_crop', function (event) {

    var image = event.target.dataset.image;
    $('#image_manager .cropper_block').addClass('active');
    $('#image_manager .overlay_modal').css('display', 'block');
    $('#image_manager .cropper_block .crop .left img').attr('src','/files/'+image);

    var id = $(this).data('id'),
        type = $(this).data('type');
    setTimeout(function () {
        crop(id, type);
    }, 200);
});

// Открыть окно resize
$(document).on('click', '#image_manager .right .act .js_resize', function (event) {

    var width = event.target.dataset.width;
    var height = event.target.dataset.height;
    var image = event.target.dataset.image;
    $('#image_manager .resize_block').addClass('active');
    $('#image_manager .overlay_modal').css('display', 'block');
    $('#image_manager .resize_block .resize .js_width').html(width+'px');
    $('#image_manager .resize_block .resize .js_heigth').html(height+'px');
    $('#image_manager #js_resizend [name="id"]').val($(this).data('id'));
    $('#image_manager #js_resizend [name="image"]').val(image);
});

// Замена файла
$(document).on('click', '#image_manager .right .js_replace', function () {

    var id = event.target.dataset.id;
    filemanager_fileid = id;
    $('#image_manager #replace_block').addClass('active');
    $('#image_manager .overlay_modal').css('display', 'block');
});

// Закрыть панель подсказок
$(document).on('click', '#image_manager .js_alert', function () {

    $(this).remove();
});

// Overlay
cropper = null;
$(document).on('click', '#image_manager .overlay_modal', function () {

    $('#image_manager #upload_block').removeClass('active');
    $('#image_manager .view_block').removeClass('active');
    $('#image_manager .cropper_block').removeClass('active');
    $('#image_manager .resize_block').removeClass('active');
    $('#image_manager .delete_block').removeClass('active');
    $('#image_manager .replace_block').removeClass('active');
    $('#image_manager .overlay_modal').css('display', 'none');

    if(cropper !== null) {
        cropper.destroy();
    }
});

// Загрузка изображений на сервер
document.getElementById('select_init').addEventListener('change', select_init, false);
function select_init(evt) {

    var alerts = $('#image_manager .alerts'),
        load = $('#image_manager #upload_block .load'),
        blue = $('#image_manager .ajax_content .bn .rubber'),
        content = $('#image_manager .ajax_content .flex');

    //clear
    alerts.empty();

    //init
    var files = evt.target.files;
    [].forEach.call(files, function(file, i) {
        if (!file.type.match('image.*')) {
            alerts.append('<button class="alert alert-danger js_alert" role="alert"><span class="badge">'+i+'</span> '+ file.name + ' - не является изображением (jpg, png, gif)</button>');
            close_modal();
        } else {
            var reader = new FileReader();
            reader.onload = function(e) {

                $.ajax({
                    url: '/admin/admin/filemanager',
                    method: 'POST',
                    data: {name: file.name, image: e.target.result, size: file.size, type: file.type},
                    headers: {
                        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                    },
                    // выполнить до отправки запроса
                    beforeSend: function() {
                        load.addClass('loading')
                    },
                    // Ответ от сервера
                    success: function(msg){
                        content.prepend(msg);
                    },
                    // Ошибка AJAX
                    error: function(result){
                        alerts.append('<button class="alert alert-danger js_alert" role="alert"><span class="badge">'+i+'</span> '+ file.name +' - '+result.responseJSON+'</button>');
                        load.removeClass('loading');
                        close_modal();
                    }
                    // сразу после выполнения запроса
                }).done(function(data){
                    load.removeClass('loading');
                    blue.removeClass('blue');
                    close_modal();
                });
            };
            reader.readAsDataURL(file);
        }
    });

}

// Замена изображений
document.getElementById('replace_init').addEventListener('change', replace_init, false);
function replace_init(evt) {

    var alerts = $('#image_manager .alerts'),
        load = $('#image_manager #replace_block .load');

    //clear
    alerts.empty();

    //init
    var files = evt.target.files;
    if (!files[0].type.match('image.*')) {
        alerts.append('<button class="alert alert-danger js_alert" role="alert">'+ files[0].name + ' - не является изображением (jpg, png, gif)</button>');
        close_modal();
    } else {
        var reader = new FileReader();
        reader.onload = function(e) {

            $.ajax({
                url: '/admin/admin/filemanager_replace',
                method: 'POST',
                data: {id: filemanager_fileid, image: e.target.result, size: files[0].size, type: files[0].type},
                headers: {
                    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                },
                // выполнить до отправки запроса
                beforeSend: function() {
                    load.addClass('loading')
                },
                // Ответ от сервера
                success: function(msg){

                    update_elements(msg);
                    $('#image_manager .ajax_content .bn .column [data-id="'+selected_punct+'"]').trigger('click');
                    close_modal();
                },
                // Ошибка AJAX
                error: function(result){
                    alerts.append('<button class="alert alert-danger js_alert" role="alert">'+ files[0].name +' - '+result.responseJSON+'</button>');
                    load.removeClass('loading');
                    close_modal();
                }
                // сразу после выполнения запроса
            }).done(function(data){
                load.removeClass('loading');
                close_modal();
            });
        };
        reader.readAsDataURL(files[0]);
    }

}

// Закрывает модал
function close_modal() {
    $('#image_manager #upload_block').removeClass('active');
    $('#image_manager .cropper_block').removeClass('active');
    $('#image_manager .resize_block').removeClass('active');
    $('#image_manager .delete_block').removeClass('active');
    $('#image_manager .replace_block').removeClass('active');
    $('#image_manager .overlay_modal').css('display', 'none');
}

// Обновление манеджера
function load_files() {

    file_inProgress = false;
    file_count = 2;
    file_count_paginate = 2;
    var content = $('#image_manager .ajax_content .flex');
    var load = $('#image_manager .ajax_content .load');

    $('#image_manager .right .act').html(' --- ');
    $('#image_manager .right .monitor').html(' --- ');
    $('#image_manager .right .info').html(' --- ');
    $('#image_manager .right .del').html(' --- ');
    $('#image_manager #filemanager_search input').val('');

    $('#image_manager .ajax_content .bn').remove();
    $('#image_manager .ajax_content .pagination').remove();
    $('#image_manager .ajax_content .load').addClass('loading');

    $.ajax({
        url: '/admin/admin/filemanager_load',
        method: 'GET',
        data: { dinamic_images: dinamic_images },
        // выполнить до отправки запроса
        beforeSend: function() {
            load.addClass('loading')
        },
        // Ответ от сервера
        success: function(msg){
            content.prepend(msg.view);
            set_paginator(msg.page, msg.total);
        },
        // Ошибка AJAX
        error: function(result){
            console.log(result);
        }
        // сразу после выполнения запроса
    }).done(function(data){
        load.removeClass('loading');
    });
}

// Загрузка пагинатора
function set_paginator(page, total, active) {

    if(active === undefined) {
        active = 1;
    }
    var paginate_block = $('#image_manager .ajax_content .paginate_block');

    $.ajax({
        url: '/admin/admin/filemanager_paginator',
        method: 'POST',
        data: {'page': page, 'total': total, active: active},
        headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        // Ответ от сервера
        success: function (msg) {
            paginate_block.html(msg);
        },
        // Ошибка AJAX
        error: function (result) {
            console.log(result);
        }
    });
}

/* -> Загрузка картин из базы */
//scroll версия
var file_inProgress = false; //флаг для отслеживания того, происходит ли в данный момент ajax-запрос
var file_count = 2; //начинать пагинацию со 2 страницы, т.к. первая выводится сразу
$('#image_manager .ajax_content').on('scroll', function () {

    var $this = $(this)[0],
        top = $this.scrollTop,
        height = $this.scrollHeight - $this.clientHeight,
        content = $('#image_manager .ajax_content .flex');
    if(height - top === 0) {

        var countPage = $('#id-paginate').attr("data-last-page");
        if(!file_inProgress && file_count<=countPage ) {
            $.ajax({
                url: '/admin/admin/filemanager_load',
                method: 'POST',
                data: {'page': file_count},
                headers: {
                    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                },
                // Ответ от сервера
                success: function (msg) {
                    content.append(msg.view);
                },
                // Ошибка AJAX
                error: function (result) {
                    console.log(result);
                }
                // сразу после выполнения запроса
            }).done(function (data) {
                file_inProgress = false;
                file_count++;
            });
        }
    }
});
// paginator версия
var file_count_paginate = 2;
$(document).on('click', '#image_manager .ajax_content .pagination .page-link', function () {

    var item = $(this).text(),
        content = $('#image_manager .ajax_content .flex');
    file_count = Number(item) +1;

    $('#image_manager .ajax_content .bn').remove();

    var countPage = $('#id-paginate').attr("data-last-page");
    if(!file_inProgress && file_count_paginate<=countPage ) {
        $.ajax({
            url: '/admin/admin/filemanager_load',
            method: 'POST',
            data: {'page': item},
            headers: {
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            },
            // Ответ от сервера
            success: function (msg) {
                content.append(msg.view);
                set_paginator(msg.page, msg.total, item);
            },
            // Ошибка AJAX
            error: function (result) {
                console.log(result);
            }
            // сразу после выполнения запроса
        }).done(function (data) {
            file_inProgress = false;
        });
    }
});

/* -> Создание елементов панеля */
function getDinamic_images(id) {
    for (var key in dinamic_images) {
        if(dinamic_images[key].id == id) {
            return '?id='+dinamic_images[key].rand
        }
    }
}
function typeFile_text($text) {

    if($text == 'image/jpeg') {
        return 'jpeg'
    } else if($text == 'image/png') {
        return 'png'
    } else if($text == 'image/gif') {
        return 'gif'
    } else if($text == 'image/svg+xml') {
        return 'svg'
    }
}
function get_size(size) {

    if(String(size).length > 6) {

        var get = (size/1024)/1024;
        return get.toFixed(1)+'Мб';
    } else if(String(size).length <= 6) {

        var get = size/1024;
        return get.toFixed(1)+'Кб';
    }
}
function create_panel(act, data) {

    if(act == 'act') {

        return '<div class="file_title">Действие</div>' +
            '<div>' +
            '<button class="btn btn-primary js_view" data-image="'+data.image+'">Посмотреть</button>' +
            '<button class="btn btn-default js_crop" data-id="'+data.id+'" data-image="'+data.image+'" data-type="'+data.type+'">Обрезать</button>' +
            '<button class="btn btn-default js_resize" data-id="'+data.id+'" data-width="'+data.width+'" data-height="'+data.height+'" data-image="'+data.image+'">Изменить размер</button>' +
            '<button class="btn btn-default js_replace" data-id="'+data.id+'">Заменить</button>' +
            '</div>';
    } else if(act == 'monitor') {

        return '<div class="file_monitor">' +
            '<div class="file_title">Монитор</div>' +
            '<div>' +
            '<div class="param"><b>Формат:</b> '+typeFile_text(data.type)+'</div>' +
            '<div class="param"><b>Ширина:</b> <span class="js_monitor_w">'+data.width+'</span>px</div>' +
            '<div class="param"><b>Высота:</b> <span class="js_monitor_h">'+data.height+'</span>px</div>' +
            '<div class="param"><b>Размер:</b> <span class="js_monitor_s">'+data.mass+'</span></div>' +
            '<div class="param"><b>Дата:</b> '+data.created_at+'</div>' +
            '</div>' +
            '</div>';
    } else if(act == 'info') {

        return '<div class="file_altblock">' +
            '<div class="file_title">Инфо</div>' +
            '<form id="filemanager_name_alt">' +
            '<div class="col-sm-12">' +
            '<div class="form-group">' +
            '<div class="form-line">' +
            '<input type="hidden" name="id" value="'+data.id+'">' +
            '<input type="text" class="form-control" name="name" placeholder="Заголовок..." value="'+data.name+'">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="col-sm-12">' +
            '<div class="form-group">' +
            '<div class="form-line">' +
            '<input type="text" class="form-control" name="alt" placeholder="Alt..." value="'+data.alt+'">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<button type="submit" class="btn btn-primary">Сохранить</button>' +
            '</form>' +
            '</div>';
    } else if(act == 'del') {

        return '<div class="file_title">Удалить изображение</div>' +
            '<button class="btn btn-danger js_delete" data-id="'+data.id+'">Удалить</button>';
    }
}
function update_elements(msg) {

    // Динамическое обновление. Сохранение id картины
    if(dinamic_images.length == 0) {
        dinamic_images.push({
            'id': msg.id,
            'rand': msg.rand
        });
    } else {

        var add = true;
        for(var dr in dinamic_images) {
            if(dinamic_images[dr].id == msg.id) {
                add = false;
                dinamic_images[dr].rand = msg.rand
            }
        }
        if(add) {
            dinamic_images.push({
                'id': msg.id,
                'rand': msg.rand
            });
        }
    }
    var js_select = $('#image_manager .bn [data-id='+msg.id+']');

    // Select bn
    $('#image_manager .ajax_content .bn [data-id='+msg.id+'] .image').attr('style', 'background-image: url(/files/'+msg.image+getDinamic_images(msg.id)+')');
    js_select.attr('data-image', msg.image+getDinamic_images(msg.id));
    js_select.attr('data-type', msg.type);
    js_select.attr('data-mass', msg.size);

    // data
    var resize = $('#image_manager .js_resize');
    resize.attr('data-width', Math.round(msg.width));
    resize.attr('data-height', Math.round(msg.height));
    resize.attr('data-image', msg.image+getDinamic_images(msg.id));

    // Показатели
    $('#image_manager .file_monitor .js_monitor_w').text(Math.round(msg.width));
    $('#image_manager .file_monitor .js_monitor_h').text(Math.round(msg.height));
    $('#image_manager .file_monitor .js_monitor_s').text(get_size(msg.size));
}

/* -> Выборка картин */
$(document).on('click', '#image_manager .ajax_content .bn .js_select', function (event) {

    $('#image_manager .js_select').removeClass('active');
    $(this).addClass('active');

    var id = event.target.dataset.id,
        name = event.target.dataset.name,
        image = event.target.dataset.image,
        alt = event.target.dataset.alt,
        mass = event.target.dataset.mass,
        type = event.target.dataset.type,
        created_at = event.target.dataset.created_at;

    var act = $('#image_manager .right .act'),
        monitor = $('#image_manager .right .monitor'),
        info = $('#image_manager .right .info'),
        del = $('#image_manager .right .del');

    var size = new Image();
    size.onload = function () {

        var data = {
            'id' : id,
            'name' : name,
            'image' : image,
            'alt' : alt,
            'mass' : get_size(mass),
            'created_at' : created_at,
            'width' : Math.round(size.width),
            'height' : Math.round(size.height),
            'type' : type
        };

        //panel
        act.empty();
        monitor.empty();
        info.empty();
        del.empty();

        act.html(create_panel('act', data));
        monitor.html(create_panel('monitor', data));
        info.html(create_panel('info', data));
        del.html(create_panel('del', data));

        selected_punct = id;

        selected_file = {
            'image': image,
            'alt': alt,
            'width': data.width,
            'height': data.height,
        };
    };
    size.src = '/files/'+image;
});

/* -> Cropper */
require('cropperjs');
filemanager_fileType = 'image/jpg';
function crop(id, type) {

    filemanager_fileid = id;
    filemanager_fileType = type;

    var image = document.getElementById('file_cropImage');
    if(cropper !== null) {
        cropper.destroy();
    }

    cropper = new Cropper(image, {
        viewMode: 2,
        ready() {
            this.cropper.clear();
        },
        crop(event) {
            $('#image_manager .crop_monitor_w').text(Math.round(event.detail.width));
            $('#image_manager .crop_monitor_h').text(Math.round(event.detail.height));
            $('#image_manager .crop_monitor_r').text(Math.round(event.detail.rotate));
        },
    });
    cropper_zoom = 0;
    cropper_move_x = 0;
    cropper_move_y = 0;
    cropper_rotate = 0;
    cropper_scale_x = true;
    cropper_scale_y = true;
}

// Cropper control
// frame
$(document).on('click', '.cropper_frame_set', function () {
    if(cropper !== null) {
        cropper.crop();
    }
});
$(document).on('click', '.cropper_frame_remove', function () {
    if(cropper !== null) {
        cropper.clear();
    }
});
// zoom
$(document).on('click', '.cropper_zoom_plus', function () {
    if(cropper !== null) {
        cropper.zoom(cropper_zoom + 0.1)
    }
});
$(document).on('click', '.cropper_zoom_minus', function () {
    if(cropper !== null) {
        cropper.zoom(cropper_zoom - 0.1)
    }
});
// arrow
$(document).on('click', '.cropper_arr_left', function () {
    if(cropper !== null) {
        cropper.move(cropper_move_x + 4, cropper_move_y);
    }
});
$(document).on('click', '.cropper_arr_up', function () {
    if(cropper !== null) {
        cropper.move(cropper_move_x, cropper_move_y + 4);
    }
});
$(document).on('click', '.cropper_arr_right', function () {
    if(cropper !== null) {
        cropper.move(cropper_move_x - 4, cropper_move_y);
    }
});
$(document).on('click', '.cropper_arr_down', function () {
    if(cropper !== null) {
        cropper.move(cropper_move_x, cropper_move_y - 4);
    }
});
// rotate
$(document).on('click', '.cropper_rotate_undo', function () {
    if(cropper !== null) {
        cropper.rotate(cropper_rotate + 45);
    }
});
$(document).on('click', '.cropper_rotate_next', function () {
    if(cropper !== null) {
        cropper.rotate(cropper_rotate - 45);
    }
});
/* scale */
$(document).on('click', '.cropper_arrows_h', function () {
    if(cropper !== null) {
        if(cropper_scale_x === true) {
            cropper_scale_x = false;
            cropper.scale(-1, 1);
        } else if(cropper_scale_x === false) {
            cropper_scale_x = true;
            cropper.scale(1, 1);
        }

    }
});
$(document).on('click', '.cropper_arrows_v', function () {
    if(cropper !== null) {
        if(cropper_scale_y === true) {
            cropper_scale_y = false;
            cropper.scale(1, -1);
        } else if(cropper_scale_y === false) {
            cropper_scale_y = true;
            cropper.scale(1, 1);
        }
    }
});

$(document).on('click', '.js_cropend', function () {

    var image = cropper.getCroppedCanvas().toDataURL(filemanager_fileType, 1);
    var button = $('#image_manager .js_cropend');
    var alerts = $('#image_manager .alerts');

    $.ajax({
        url: '/admin/admin/filemanager_crop',
        method: 'POST',
        data: {'id': filemanager_fileid, 'image': image},
        headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        // выполнить до отправки запроса
        beforeSend: function() {
            button.html('<div class="load loading"></div>');
        },
        // Ответ от сервера
        success: function (msg) {

            update_elements(msg);
            $('#image_manager .ajax_content .bn .column [data-id="'+selected_punct+'"]').trigger('click');
            close_modal();
        },
        // Ошибка AJAX
        error: function (result) {

            alerts.append('<button class="alert alert-danger js_alert" role="alert">'+result.responseJSON+'</button>');
            button.html('Сохранить');
        }
    }).done(function(data){
        button.html('Сохранить');
    });
});

/* -> Resize */
var js_resizend = $("#js_resizend");
js_resizend.submit(function(e){
    e.preventDefault();

    var button = $('#image_manager #js_resizend button');
    var alerts = $('#image_manager .alerts');

    $.ajax({
        url: '/admin/admin/filemanager_resize',
        method: 'POST',
        data: {'data': JSON.stringify(js_resizend.serializeArray())},
        headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        // выполнить до отправки запроса
        beforeSend: function() {
            button.html('<div class="load loading"></div>');
        },
        // Ответ от сервера
        success: function (msg) {

            update_elements(msg);
            $('#image_manager .ajax_content .bn .column [data-id="'+selected_punct+'"]').trigger('click');
            close_modal();
        },
        // Ошибка AJAX
        error: function (result) {

            alerts.append('<button class="alert alert-danger js_alert" role="alert">'+result.responseJSON+'</button>');
            button.html('Сохранить');
        }
    }).done(function(data){
        button.html('Сохранить');
    });
});

/* -> Name-Alt */
$(document).on('submit', '#filemanager_name_alt', function (event) {
    event.preventDefault();

    var button = $(event.target[3]);
    var alerts = $('#image_manager .alerts');

    $.ajax({
        url: '/admin/admin/filemanager_namealt',
        method: 'POST',
        data: {'data': JSON.stringify($(event.target).serializeArray())},
        headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        // выполнить до отправки запроса
        beforeSend: function() {
            button.html('<div class="load loading"></div>');
        },
        // Ответ от сервера
        success: function (msg) {

            var js_select = $('#image_manager .bn [data-id='+msg.id+']');
            js_select.attr('data-name', msg.name);
            js_select.attr('data-alt', msg.alt);
            $('#image_manager .bn [data-id='+msg.id+'] .title').text(msg.name);

            $(event.target[1]).val(msg.name);
            $(event.target[2]).val(msg.alt);

            $('#image_manager .ajax_content .bn .column [data-id="'+selected_punct+'"]').trigger('click');
            close_modal();
        },
        // Ошибка AJAX
        error: function (result) {

            alerts.append('<button class="alert alert-danger js_alert" role="alert">'+result.responseJSON+'</button>');
            button.html('Сохранить');
        }
    }).done(function(data){
        button.html('Сохранить');
    });
});

/* -> Удаление */
$(document).on('click', '#image_manager .js_delete', function (event) {

    var id = event.target.dataset.id;

    $('#image_manager .delete_block').addClass('active');
    $('#image_manager .delete_block .js_ok').attr('data-id', id);
    $('#image_manager .overlay_modal').css('display', 'block');
});
$(document).on('click', '#image_manager .delete_block .js_ok', function (event) {

    var button = $(event.target);
    var alerts = $('#image_manager .alerts');

    $.ajax({
        url: '/admin/admin/filemanager_del',
        method: 'POST',
        data: {'id': event.target.dataset.id},
        headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        // выполнить до отправки запроса
        beforeSend: function() {
            button.html('<div class="load loading"></div>');
        },
        // Ответ от сервера
        success: function (msg) {

            $('#image_manager .right .act').html(' --- ');
            $('#image_manager .right .monitor').html(' --- ');
            $('#image_manager .right .info').html(' --- ');
            $('#image_manager .right .del').html(' --- ');
            $('#image_manager #filemanager_search input').val('');

            $('#image_manager .bn [data-id='+event.target.dataset.id+']').closest('.bn').remove();
            close_modal();
        },
        // Ошибка AJAX
        error: function (result) {

            alerts.append('<button class="alert alert-danger js_alert" role="alert">'+result.responseJSON+'</button>');
            button.html('Да');
        }
    }).done(function(data){
        button.html('Да');
    });
});
$(document).on('click', '#image_manager .delete_block .js_no', function (event) {

    $('#image_manager .delete_block .js_ok').removeAttr('data-id');
    close_modal();
});

/* -> Обновление */
$('#image_manager .js_reload').click(function () {

    load_files();
});

/* -> Поиск картин */
$(document).on('submit', '#filemanager_search', function (event) {
    event.preventDefault();

    var button = $(event.target[1]);
    var alerts = $('#image_manager .alerts');
    var content = $('#image_manager .ajax_content .flex');

    $.ajax({
        url: '/admin/admin/filemanager_search',
        method: 'POST',
        data: {'data': JSON.stringify($(event.target).serializeArray())},
        headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        // выполнить до отправки запроса
        beforeSend: function() {
            button.html('<div class="load loading"></div>');
        },
        // Ответ от сервера
        success: function (html) {

            $('#image_manager .ajax_content .flex').empty();
            content.html(html);
        },
        // Ошибка AJAX
        error: function (result) {

            alerts.append('<button class="alert alert-danger js_alert" role="alert">'+result.responseJSON+'</button>');
            button.html('Искать!');
        }
    }).done(function(data){
        button.html('Искать!');
    });
});

/* -> Установить картину в сайт */
$(document).on('click', '#image_manager .js_file_set', function (event) {

    if(Object.keys(selected_file).length != 0) {

        if(editor_returned) {
console.log(22);
            ckeditor.insertHtml('<p><img src="'+location.protocol+'//'+location.hostname+'/files/'+selected_file.image+'" alt="'+selected_file.alt+'" style="width: '+selected_file.width+'px; height: '+selected_file.height+'px;"></p>');
        } else {

            $('#filemanager_create_'+basic_id).html('<img src="'+location.protocol+'//'+location.hostname+'/files/'+selected_file.image+'">');
            $('#filemanager_server_image_'+basic_id).val(selected_file.image);
        }
        $('#image_manager').modal('hide');
    } else {
        $('#image_manager .alerts').append('<button class="alert alert-danger js_alert" role="alert">Вы не выбрали изображение!</button>');
    }
});