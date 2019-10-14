<!DOCTYPE html>
<html>
<body>
    <b>Есімі:</b> {{ $data['name'] or '' }}<br>
    <b>Телефоны:</b> {{ $data['phone'] or '' }}<br>
    <b>Почтасы:</b> {{ $data['email'] or '' }}<br>
    <b>Сауал:</b> {!! $data['quest'] or '' !!}
</body>
</html>