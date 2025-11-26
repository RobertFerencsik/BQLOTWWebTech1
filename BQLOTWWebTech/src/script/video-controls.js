// video-controls.js - Video control functionality

$(document).ready(function () {
    const video = $('#lstm-video')[0];
    const playBtn = $('#playBtn');
    const pauseBtn = $('#pauseBtn');
    const muteBtn = $('#muteBtn');
    const speedSelect = $('#speedSelect');
    const fullscreenBtn = $('#fullscreenBtn');

    // Play button
    playBtn.on('click', function () {
        video.play();
        playBtn.addClass('active');
        pauseBtn.removeClass('active');
    });

    // Pause button
    pauseBtn.on('click', function () {
        video.pause();
        pauseBtn.addClass('active');
        playBtn.removeClass('active');
    });

    // Mute/Unmute button
    muteBtn.on('click', function () {
        video.muted = !video.muted;
        if (video.muted) {
            muteBtn.text('🔇 Unmute').addClass('active');
        } else {
            muteBtn.text('🔊 Mute').removeClass('active');
        }
    });

    // Speed control
    speedSelect.on('change', function () {
        video.playbackRate = parseFloat($(this).val());
    });

    // Fullscreen button
    fullscreenBtn.on('click', function () {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen();
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
        }
    });

    // Update button states when video plays/pauses
    video.addEventListener('play', function () {
        playBtn.addClass('active');
        pauseBtn.removeClass('active');
    });

    video.addEventListener('pause', function () {
        pauseBtn.addClass('active');
        playBtn.removeClass('active');
    });

    // Update mute button state when muted
    video.addEventListener('volumechange', function () {
        if (video.muted) {
            muteBtn.text('🔇 Unmute').addClass('active');
        } else {
            muteBtn.text('🔊 Mute').removeClass('active');
        }
    });
});
