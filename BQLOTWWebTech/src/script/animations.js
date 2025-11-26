// animations.js - Animation-related functionality

function initializeAnimations() {
    // Fade in main content
    $('main').hide().fadeIn(1000);

    // Animate navigation links on hover
    $('.main-nav a').hover(
        function () {
            $(this).animate({
                paddingLeft: '35px',
                paddingRight: '35px'
            }, 200);
        },
        function () {
            $(this).animate({
                paddingLeft: '30px',
                paddingRight: '30px'
            }, 200);
        }
    );

    // Button click animations
    $('.btn').click(function () {
        $(this).animate({ scale: '0.95' }, 100, function () {
            $(this).animate({ scale: '1' }, 100);
        });
    });
}
