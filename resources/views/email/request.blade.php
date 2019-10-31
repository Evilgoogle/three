<!DOCTYPE html>
<html>
<body>
    <b>Имя:</b> {{ $data['name'] or '' }}<br>
    <b>Телефоны:</b> {{ $data['phone'] or '' }}<br>
    <b>Почта:</b> {{ $data['email'] or '' }}<br>
    <b>Текст:</b> {!! $data['message'] or '' !!}
</body>
</html>