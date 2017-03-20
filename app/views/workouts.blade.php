@extends('layouts.base')

@section('body')
<div class="wods">
    <ul class="wods__list" id="wodsList"></ul>
</div>
@stop

@section('footer')
    <script src="{{ asset('js/home.js') }}"></script>
@stop
