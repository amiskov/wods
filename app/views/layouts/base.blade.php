<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">

    <title>WODS — your effective and fun fitness routine</title>

    @section( 'head' )
        <link rel="stylesheet" href="{{ asset('css/all.css') }}">
    @show

    <script src="{{ asset('js/jquery-2.1.1.js') }}"></script>
    <script src="{{ asset('js/wods.js') }}"></script>
</head>
<body>

@yield( 'body' )

@yield('footer')

</body>
</html>
