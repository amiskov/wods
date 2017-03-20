@extends('layouts.base')

@section('body')
<script>
    var ytID = '{{ $ytID }}',
            WODInfo;

    WODs.forEach(function (wod, index) {
        if(wod.youtubeID == ytID) {
            WODInfo = wod;
        }
    });
</script>

<div class="page-wrap">
    <div class="wod">
        <div class="wod__list">
            <hgroup class="wod__title">
                <h2 id="wodTitle"></h2>
            </hgroup>
            <ol id="wodList">
            </ol>
            <div class="buttons">
                <div class="total-time">
                    <span id="totalTime">0:00</span>
                </div>
                <button disabled id="btnStart" class="btn btn_start">Get it done!</button>
                <button id="btnStop" class="btn btn_stop">Stop</button>
            </div>
        </div>
        <div class="wod__video">
            <div id="player"></div>
        </div>
    </div>
</div>


@stop

@section('footer')
    <footer class="site-footer">
        <h1 class="action-title" id="actionTitle"></h1>

        <div class="progress" id="progress">
            <div id="progressTime" class="progress__time">0:00</div>
            <div id="progressBar" class="progress__bar"></div>
        </div>

        <audio id="bell" autostart="false" src="{{ asset('sounds/bell.mp3') }}" preload="auto">Your browser does not support
            HTML5 sounds.
            You will not hear any sounds! Please use <a href="https://www.google.com/intl/en/chrome/browser/">Chrome</a> or
            <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a></audio>
        <audio id="gong" autostart="false" src="{{ asset('sounds/gong.mp3') }}" preload="auto"></audio>
        <audio id="ten" autostart="false" src="{{ asset('sounds/alert.mp3') }}" preload="auto"></audio>
    </footer>
    <script src="{{ asset('js/player.js') }}"></script>
    <script src="{{ asset('js/timers.js') }}"></script>
@stop
