$(document).ready(function() {
    
    // Store initial state
    var initialState = {
        left: '300px',
        width: '300px',
        fontSize: '12pt',
        height: '100px',
        opacity: 1
    };
    
    var boxCollapsed = false;
    var paragraphsHidden = false;
    
    // a.) Animáció indítása
    $('#startAnimBtn').on('click', function() {
        var speed = parseInt($('#animSpeed').val());
        
        // Reset to initial state
        $('#animBox').css({
            left: '300px',
            width: '300px',
            fontSize: '12pt',
            height: '100px',
            opacity: 1
        });
        
        // Jobbra elindul - növekszik a szélesség és font size
        $('#animBox').animate({
            left: '600px',
            width: '400px',
            fontSize: '30pt'
        }, speed, function() {
            
            // Lefelé elindul - csökken a szélesség, növekszik a magasság
            $(this).animate({
                top: '200px',
                width: '200px',
                fontSize: '16pt',
                height: '110px'
            }, speed, function() {
                
                // Balra elindul - bal sarokba érve opacity 0.4
                $(this).animate({
                    left: '0px',
                    opacity: 0.4
                }, speed, function() {
                    
                    // Visszaér a kiindulási állapotba
                    $(this).animate({
                        left: '300px',
                        top: '0px',
                        width: '300px',
                        height: '100px',
                        fontSize: '12pt',
                        opacity: 1
                    }, speed, function() {
                        // Animáció vége
                        alert('VÉGE');
                    });
                });
            });
        });
    });
    
    // b.) Bekezdés elrejtése
    $('#hideParaBtn').on('click', function() {
        if (!paragraphsHidden) {
            $('#paragraphsContainer').hide();
            $('#animBox').css({
                position: 'relative',
                top: '20px',
                left: '20px'
            });
            alert('Bekezdések elrejtése');
            paragraphsHidden = true;
        } else {
            $('#paragraphsContainer').show();
            $('#animBox').css({
                top: '0px',
                left: '300px'
            });
            paragraphsHidden = false;
        }
    });
    
    // c.) Összecsuk / Kinyit
    $('#toggleBoxBtn').on('click', function() {
        if (!boxCollapsed) {
            // Összecsuk
            $('#animBox').animate({
                height: '0px',
                opacity: 0
            }, 300, function() {
                boxCollapsed = true;
                
                // Jobbra elindul
                $('#animBox').animate({
                    left: '500px',
                    opacity: 1,
                    height: '100px'
                }, 800);
            });
        } else {
            // Kinyit
            $('#animBox').animate({
                left: '300px',
                height: '100px'
            }, 800, function() {
                boxCollapsed = false;
            });
        }
    });
});
