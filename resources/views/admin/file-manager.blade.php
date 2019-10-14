<!-- Modal filemanager -->
<div class="modal fade image_manager" id="image_manager" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <div class="modal-title">Менеджер файлов</div>
            </div>
            <div class="modal-body">
                <div class="images_content">
                    {{-- Основа --}}
                    <div class="filecontent">
                        <div class="overlay_modal"></div>
                        <div class="top">
                            <form id="filemanager_search" class="panel panel-default">
                                <div class="panel-body">
                                    <div class="input-group">
                                        <input type="text" name="name" class="form-control" placeholder="Введите загаловок..">
                                        <span class="input-group-btn">
                                            <button class="btn btn-default" type="submit">Искать!</button>
                                        </span>
                                    </div>
                                </div>
                            </form>
                            <div class="js_reload"><i class="fas fa-sync-alt"></i></div>
                        </div>
                        <div class="alerts"></div>
                        <div class="ajax_content">
                            <div class="paginate_block"></div>
                            <div class="load_block">
                                <div class="load"></div>
                            </div>
                            <div class="flex"></div>
                        </div>
                        <form id="upload_block">
                            <div class="main_block">
                                <div class="title">Загрузить изображение</div>
                                <div class="line"></div>
                                <div class="button_block">
                                    <input id="select_init" type="file" class="btn btn-primary btn-lg" name="download" multiple>
                                    <div class="load"></div>
                                    <div class="info">Выберите одно или несколько изображений</div>
                                </div>
                            </div>
                        </form>
                        <div class="view_block">
                            <div class="main_block">
                                <div class="title">Просмотр</div>
                                <div class="line"></div>
                                <div class="view" style=""></div>
                            </div>
                        </div>
                        <div class="cropper_block">
                            <div class="main_block">
                                <div class="title">Обрезка</div>
                                <div class="line"></div>
                                <div class="crop">
                                    <div class="left">
                                        <img id="file_cropImage" src="">
                                    </div>
                                    <div class="right">
                                        <div class="panel panel-default">
                                            <div class="panel-heading">Ширина</div>
                                            <div class="panel-body">
                                                <span class="crop_monitor_w">0</span> <span>px</span>
                                            </div>
                                        </div>
                                        <div class="panel panel-default">
                                            <div class="panel-heading">Высота</div>
                                            <div class="panel-body">
                                                <span class="crop_monitor_h">0</span> <span>px</span>
                                            </div>
                                        </div>
                                        <div class="panel panel-default">
                                            <div class="panel-heading">Поворот</div>
                                            <div class="panel-body">
                                                <span class="crop_monitor_r">0</span> <span>deg</span>
                                            </div>
                                        </div>
                                        <div class="buttons">
                                            <div class="btn-group" role="group">
                                                <button type="button" class="btn btn-default cropper_zoom_plus"><span class="fas fa-search-plus"></span></button>
                                                <button type="button" class="btn btn-default cropper_zoom_minus"><span class="fas fa-search-minus"></span></button>
                                            </div>
                                            <div class="btn-group" role="group">
                                                <button type="button" class="btn btn-default cropper_arr_left"><span class="fas fa-arrow-left"></span></button>
                                                <button type="button" class="btn btn-default cropper_arr_right"><span class="fas fa-arrow-right "></span></button>
                                            </div>
                                            <div class="btn-group" role="group">
                                                <button type="button" class="btn btn-default cropper_arr_up"><span class="fas fa-arrow-up"></span></button>
                                                <button type="button" class="btn btn-default cropper_arr_down"><span class="fas fa-arrow-down"></span></button>
                                            </div>
                                            <div class="btn-group" role="group">
                                                <button type="button" class="btn btn-default cropper_rotate_undo"><span class="fas fa-undo"></span></button>
                                                <button type="button" class="btn btn-default cropper_rotate_next"><span class="fas fa-redo"></span></button>
                                            </div>
                                            <div class="btn-group" role="group">
                                                <button type="button" class="btn btn-default cropper_arrows_h"><span class="fas fa-arrows-alt-h"></span></button>
                                                <button type="button" class="btn btn-default cropper_arrows_v"><span class="fas fa-arrows-alt-v"></span></button>
                                            </div>
                                            <div class="btn-group" role="group">
                                                <button type="button" class="btn btn-default cropper_frame_set"><span class="fas fa-check"></span></button>
                                                <button type="button" class="btn btn-default cropper_frame_remove"><span class="fas fa-power-off"></span></button>
                                            </div>
                                        </div>
                                        <button class="btn btn-primary js_cropend">Сохранить</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="resize_block">
                            <div class="main_block">
                                <div class="title">Изменение размеров</div>
                                <div class="line"></div>
                                <div class="resize">
                                    <div class="old">
                                        <div><u>Текущие размеры</u></div>
                                        <div class="panel panel-default">
                                            <div class="panel-heading">Ширина</div>
                                            <div class="panel-body">
                                                <span class="js_width"></span>
                                            </div>
                                        </div>
                                        <div class="panel panel-default">
                                            <div class="panel-heading">Высота</div>
                                            <div class="panel-body">
                                                <span class="js_heigth"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <form id="js_resizend" class="width">
                                        <div><u>Новый размер</u></div>
                                        <div class="panel panel-default">
                                            <div class="panel-heading">Ширина</div>
                                            <div class="panel-body">
                                                <input type="hidden" name="id">
                                                <input type="hidden" name="image">
                                                <input type="number" class="form-control" placeholder="Новая ширина ..." name="size">
                                            </div>
                                        </div>
                                        <button type="submit" class="btn btn-primary">Сохранить</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="delete_block">
                            <div class="main_block">
                                <div class="title">Если это изображение раставлена в товарах, то при удалнеий он в них исчезнеть. Продолжить?</div>
                                <div class="line"></div>
                                <div class="delete">
                                    <button class="btn btn-danger js_ok">Да</button>
                                    <button class="btn btn-primary js_no">Нет</button>
                                </div>
                            </div>
                        </div>
                        <form id="replace_block" class="replace_block">
                            <div class="main_block">
                                <div class="title">Заменить изображение</div>
                                <div class="line"></div>
                                <div class="button_block">
                                    <input id="replace_init" type="file" class="btn btn-primary btn-lg" name="download">
                                    <div class="load"></div>
                                    <div class="info">Выберите изображение</div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="right">
                        <div class="panel panel-default">
                            <div class="panel-heading">Параметры изображение</div>
                            <div class="panel-body">
                                <div class="act"> --- </div>
                                <div class="monitor"> --- </div>
                                <div class="info"> --- </div>
                                <div class="del"> --- </div>
                            </div>
                        </div>
                        <button class="js_file_set btn btn-primary btn-lg">Установить</button>
                    </div>
                    {{-- Кнопка загрузить --}}
                    <button class="upload_file"><span>+</span></button>
                </div>
            </div>
        </div>
    </div>
</div>