<ul class="pagination">
    @if($total != 1)
        <li class="page-item prev">
            <a class="page-link" href="{{ ($patch === null) ? Request::url().'/?page='.($_GET['page']-1) : $patch.'&page='.($_GET['page']-1) }}" rel="prev">Назад</a>
        </li>
    @endif

    <li class="page-item one_element<?php echo ($page == 1) ? 'active' : ''?>">
        <a class="page-link" href="{{ ($patch === null) ? Request::url().'/?page=1' : $patch.'&page=1' }}">1</a>
    </li>

    @if($page == 1 || $page == 2 || $page == 3 || $page == 4)
        <?php
        if($total > 8) {
            $set = 9;
        } else {
            $set = $total;
        }
        ?>
        @for($count = 2; $count < $set; $count++)
            <li class="page-item <?php echo ($count == $page) ? 'active' : ''?>">
                <a class="page-link" href="{{ ($patch === null) ? Request::url().'/?page='.($count) : $patch.'&page='.($count)}} ">{{ $count }}</a>
            </li>
        @endfor
    @elseif($page > 4)
        <?php
        if($page == 5) {
            $num = 4;
        } else {
            $num = 3;
        }
        if(($page+3) > $total) {
            $sum = $total - $page;
        } else {
            $sum = 3;
        }
        ?>
        <li class="page-item disabled"><a class="page-link" href="">...</a></li>
        @for($count = $num; $count >= 1; $count--)
            @if(($page-$count) != 1)
                <li class="page-item"><a class="page-link" href="{{ ($patch === null) ? Request::url().'/?page='.($page-$count) : $patch.'&page='.($page-$count) }}">{{ $page-$count }}</a></li>
            @endif
        @endfor
        <li class="page-item active"><a class="page-link" href="{{ ($patch === null) ? Request::url().'/?page='.($page) : $patch.'&page='.($page) }}">{{ $page }}</a></li>
        @for($count = 1; $count <= $sum; $count++)
            <li class="page-item"><a class="page-link" href="{{ ($patch === null) ? Request::url().'/?page='.($page+$count) : $patch.'&page='.($page+$count) }}">{{ $page+$count }}</a></li>
        @endfor
    @endif

    @if($total != 1)
        <li class="page-item disabled"><a class="page-link" href="">...</a></li>
        <li class="page-item last_element<?php echo ($page == $total) ? 'active' : ''?>">
            <a class="page-link" href="{{ ($patch === null) ? Request::url().'/?page='.$total : $patch.'&page='.$total }}">{{ $total }}</a>
        </li>

        <li class="page-item next">
            <a class="page-link" href="{{ ($patch === null) ? Request::url().'/?page='.($_GET['page']+1) : $patch.'&page='.($_GET['page']+1) }}" rel="next">Вперед</a>
        </li>
    @endif
</ul>