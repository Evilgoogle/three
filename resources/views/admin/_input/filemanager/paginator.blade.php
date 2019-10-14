<ul class="pagination">

    <li class="page-item {{ ($active == 1 ) ? 'active' : '' }}">
        <a class="page-link">1</a>
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
            <li class="page-item {{ ($active == $count ) ? 'active' : '' }}">
                <a class="page-link">{{ $count }}</a>
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
        <li class="page-item disabled"><a class="page-link">...</a></li>
        @for($count = $num; $count >= 1; $count--)
            @if(($page-$count) != 1)
                <li class="page-item {{ ($active == ($page-$count) ) ? 'active' : '' }}"><a class="page-link">{{ $page-$count }}</a></li>
            @endif
        @endfor
        <li class="page-item {{ ($active == $page ) ? 'active' : '' }}"><a class="page-link">{{ $page }}</a></li>
        @for($count = 1; $count <= $sum; $count++)
            <li class="page-item {{ ($active == ($page+$count) ) ? 'active' : '' }}"><a class="page-link">{{ $page+$count }}</a></li>
        @endfor
    @endif

    <li class="page-item disabled"><a class="page-link">...</a></li>
    <li class="page-item <?php echo ($page == $total) ? 'active' : ''?>">
        <a class="page-link">{{ $total }}</a>
    </li>
</ul>