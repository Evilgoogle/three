// FuncyBox 3
require('@fancyapps/fancybox');

require('./filemanager');

//FuncyBox 3
$('[data-fancybox="gallery"]').fancybox({
    zoom: true
});

$(".button-logout").on( "click", function(event) {
    event.preventDefault();
    document.getElementById('logout-form').submit();
});

//Table
$('.js-table').each(function (key, index) {
    $this = $(this);
    var $table = 'table_' + key;

    $table = $('.js-table').DataTable({
        // dom: 'Bfrltip',
        dom: 'Bfrtip',
        pageLength: 100,
        // bPaginate: false,
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });

    if (typeof $this.data('order-column') !== 'undefined' && typeof $this.data('order-type') !== 'undefined') {
        $table.order([$this.data('order-column') - 1, $this.data('order-type')]).draw();
    }
});


CKEditorLaunch();
// CKEDITOR редактор
function CKEditorLaunch() {
    $(".text-editor").each(function (key, index) {
        var $this = $(this);
        $this.prop("id", "ckedit" + key + "x");
        CKEDITOR.replace("ckedit" + key + "x");
    });

    $(".text-editor-simple").each(function (key, index) {
        var $this = $(this);
        $this.prop("id", "ckedit-simple" + key + "x");
        CKEDITOR.replace("ckedit-simple" + key + "x", {
            customConfig: '/adminbsb/ckeditor/config-simple.js'
        });
    });

    $(".text-editor-table").each(function (key, index) {
        var $this = $(this);
        $this.prop("id", "ckedit-table" + key + "x");
        CKEDITOR.replace("ckedit-table" + key + "x", {
            customConfig: '/adminbsb/ckeditor/config-table.js'
        });
    });

    $(".text-editor-content").each(function (key, index) {
        var $this = $(this);
        $this.prop("id", "ckedit-content" + key + "x");
        CKEDITOR.replace("ckedit-content" + key + "x", {
            customConfig: '/adminbsb/ckeditor/config-content.js'
        });
    });
}


// включить/выключить
$(document).on('click', '.enable', function(){
    var $this = $(this),
        id = $this.data('id'),
        name = $this.attr('name'),
        check = $this.val(),
        ajaxUrl = $('#ajaxUrl').val();

    $.ajax({
        url: '/admin/' + ajaxUrl + '/'+ name,
        method: 'POST',
        data: {id: id, check: check},
        headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        dataType: 'json',
        success: function(result) {
            if (result.status == 'ok'){
                console.log(result.message);
                $this.val(result.value);
            }
        }
    });
});

// удалить запись
$(document).on('click', '.item-remove', function(e){
    e.preventDefault();
    var $this = $(this).closest('tr'),
        id = $this.attr('item-id'),
        ajaxUrl = $('#ajaxUrl').val();

    $.ajax({
        url: '/admin/' + ajaxUrl + '/remove',
        method: 'POST',
        data: {id:id},
        headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        dataType: 'json',
        success: function(result){
            if (result.status == 'ok') {
                console.log(result.message);
                $this.remove();
            }
        }
    });
});

$(document).on('change', '[name="is_category_check"]', function () {
    var $new_this = $('[name="is_category"]'),
        check = $new_this.val(),
        id = $new_this.data('id'),
        ajaxUrl = $('#ajaxUrl').val();

    $.ajax({
        url: '/admin/' + ajaxUrl + '/is-category',
        method: 'POST',
        data: {id: id, check: check},
        headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        success: function(result){
            if (check == 1)
                check = 0;
            else
                check = 1;
            $new_this.val(check);
            $('.category-block').html(result);
            $('select').selectpicker('refresh');
            if (check == 0)
                CKEditorLaunch();
        }
    });
});

// Модалка удалени записей
data_delete = '';
$(document).on('click', '.js_del_data', function(e) {
    data_delete = this;
    e.preventDefault();
    $(this).removeClass('js_del_data');
    $('#modal_delete').modal('show');
});
$(document).on('click', '.js_confirm_delete', function () {
    data_delete.click();
    $('#modal_delete').modal('hide');
});

// добавление параметра
$(document).on('click', 'button.addParam', function () {
    var $this = $(this),
        param = $this.data('param'),
        ajaxUrl = $('#ajaxUrl').val(),
        url = '/admin/param/add-param';

    if ($this.hasClass('changeParam'))
        var action = $this.data('action'),
            url = '/admin/'+ ajaxUrl +'/'+ action;

    $.ajax({
        url: url,
        method: "POST",
        data: {param: param},
        headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        success: function($block){
            $this.closest('.params').find('.params-items').append($block);
            $('select').selectpicker('refresh');

            if($('*').hasClass('params-items')) {
                $(".params-item.unique").each(function (index) {
                    var $this = $(this);
                    $("input", $this).attr("name", "unique["+ index +"][title]");
                    $("textarea", $this).attr("name", "unique["+ index +"][desc]");
                });

                $(".params-item.p-price").each(function (index) {
                    var $this = $(this);
                    $("input.title", $this).attr("name", "price["+ index +"][title]");
                    $("input.price", $this).attr("name", "price["+ index +"][price]");
                    $("input.amount", $this).attr("name", "price["+ index +"][amount]");
                });

                $(".params-item.p-service").each(function (index) {
                    var $this = $(this);
                    $("input.title", $this).attr("name", "service["+ index +"][title]");
                });

                $(".params-item.p-place").each(function (index) {
                    var $this = $(this);
                    $("input.title", $this).attr("name", "place["+ index +"][title]");
                });
            }
        }
    });
});

// удаление параметра
$(document).on('click', 'button.removeButton', function(){
    var $this = $(this),
        $rm = $this.closest('.params-item'),
        url = $('#ajaxUrl').val();

    if ($this.hasClass('removeArrJson')) {
        var $this = $(this).closest('.thumbnail'),
            url = '/admin/removeArrJson',
            id = $this.attr('id'),
            column = $this.data('column'),
            model = $this.data('model'),
            arr = $this.data('arr'),
            index = $this.data('index');

        if (id && column && model && arr) {
            if (!index) index = '';
            $.ajax({
                url: url,
                method: 'POST',
                data: {id: id, column: column, model: model, arr: arr, index: index},
                headers: {
                    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                },
                dataType: 'json',
                success: function (result) {
                    if (result.status == 'ok') {
                        console.log(result.message);
                        $this.remove();
                    }
                }
            });
        }
    } else if ($this.hasClass('removeImage')) {
        var $this = $(this).closest('.thumbnail'),
            id = $this.attr('id'),
            column = $this.data('column'),
            model = $this.data('model'),
            remove = $this.data('remove');

        $.ajax({
            url: '/admin/' + url + '/remove-image',
            method: 'POST',
            data: {id: id, column: column, model: model, remove: remove},
            headers: {
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            },
            dataType: 'json',
            success: function(result){
                if (result.status == 'ok') {
                    console.log(result.message);
                    if ($this.closest('.images-table').length == 1) {
                        $this = $this.closest('tr');
                    }
                    $this.remove();
                }
            }
        });
    } else if ($this.hasClass('designWork')) {
        var id = $this.data('id'),
            index = $this.data('index');

        $.ajax({
            url: '/admin/' + url + '/remove-work-image',
            method: 'POST',
            data: {id: id, index: index},
            headers: {
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            },
            dataType: 'json',
            success: function (result) {
                if (result.status == 'ok') {
                    console.log(result.message);
                    $rm.remove();
                }
            }
        });
    } else {
        // if(id && item_id){
        //     $.ajax({
        //         url: '/admin/param/remove-param',
        //         method: 'POST',
        //         data: {},
        //         headers: {
        //             'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        //         },
        //         dataType: 'json',
        //         success: function(result){
        //             if (result.status == 'ok') {
        //                 console.log(result.message);
        //                 $rm.remove();
        //             }
        //         }
        //     });
        // } else {
        $rm.remove();
        // }
    }
});

// Сортировка
var fixHelperModified = function(e, tr) {
    var $originals = tr.children();
    var $helper = tr.clone();
    $helper.children().each(function(index) {
        $(this).width($originals.eq(index).width())
    });

    return $helper;
};
var updateIndex = function(e, ui) {
    console.log($('td.index', ui.item.parent()));
    $('td.index', ui.item.parent()).each(function (i) {
        var position = i + 1;
        $(this).html(position);
        var id = $(this).parent('.order-table tbody tr').attr('id'),
            ajaxUrl = $('#ajaxUrl').val();
        if ($(this).closest('table').hasClass('images-table'))
            ajaxUrl = ajaxUrl + '/image';
        if ($(this).closest('table').hasClass('service-blocks'))
            ajaxUrl = $('#service_block_url').val();

        $.ajax({
            url: '/admin/' + ajaxUrl + '/change-position',
            method: 'POST',
            data: {id:id, position:position},
            headers: {
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            },
            success: function(res){},
            error: function(msg){
                console.log(msg);
            }
        });
    });
};
$(".order-table tbody").sortable({
    helper: fixHelperModified,
    stop: updateIndex
});

// Скрыть/Показать элемент
$(document).on('click', 'div.js_spoiler', function () {
    var $this = $(this);
    var id = $this.data('spoiler_id');
    var object = $('#'+id+'');
    if (object.css('display') == 'none') {
        object.slideDown(500);
    } else if (object.css('display') == 'block') {
        object.slideUp(400);
    }
});

/* Language switch */
$(document).on('click', 'button.js_switch', function() {
    var $this = $(this);

    //active lang
    $('.js_switch').removeClass('active');
    $this.addClass('active');

    //reset input
    $('.langActive_insert').removeClass('active_insert');
    //reset imageBlock history
    $('.history_gallery .title_hidden').removeClass('active');

    //set input
    $('.js_lang_'+$this.data('switch')).addClass('active_insert');

    //set imageBlock history
    $('.history_gallery .js_lang_bn_'+$this.data('switch')).addClass('active');
});

/* Установка языка по умолчанию */
$(document).on('click', '.js_default_lang', function(){
    var $this = $(this),
        id = $this.data('id'),
        default_lang = $('.js_default_lang');

    $.ajax({
        url: '/admin/language/default_lang',
        method: 'POST',
        data: {id: id},
        headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        success: function(result) {
            if (result == 'ok'){
                default_lang.removeClass('btn-primary');
                default_lang.addClass('btn-default');
                $this.removeClass('btn-default');
                $this.addClass('btn-primary');
            }
        }
    });
});

// Изображение товара
var js_add_image = 1;
$(document).on('click', '.js_add_image', function () {

    var content = $('.create_blocks .block');

    js_add_image = js_add_image +1;
    $.ajax({
        url: '/admin/item/image',
        method: 'POST',
        data: { id: js_add_image },
        headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        // Ответ от сервера
        success: function(html){
            content.append(html);
        }
    });
});

$(document).on('click', '.js_minus_image', function (e) {

    $(this).closest('.bn').remove();
});

$(document).on('click', '.js_minus_image_ajax', function (e) {

    var id = $(this).data('id');

    $.ajax({
        url: '/admin/item/image-delete',
        method: 'POST',
        data: { id: id},
        headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        // Ответ от сервера
        success: function(msg) {
            if(msg == 'ok') {
                $(e.target).closest('.bn').remove();
            }
        }
    });
});

// Выбор - с этим товаром также смотрят
$(document).on('click', '.js_select_goods', function () {
    var $this = $(this),
        id = $this.data('id'),
        main_id = $this.data('main_id');

    $.ajax({
        url: '/admin/item/view-goods/',
        method: 'POST',
        data: { id: id, main_id: main_id },
        headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        success: function(result) {
            console.log(result);
            if (result == 'del'){
                $this.removeClass('btn-primary');
                $this.addClass('btn-default');
            } else if(result == 'add') {
                $this.removeClass('btn-default');
                $this.addClass('btn-primary');
            }
        }
    });
});

// коментирвоание
$('.js_comment').click(function () {

    $('#modal_reviews .modal').addClass('modal_active');
});