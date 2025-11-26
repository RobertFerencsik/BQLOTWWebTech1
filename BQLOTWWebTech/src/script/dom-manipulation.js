// dom-manipulation.js - DOM manipulation and dynamic content creation

function demonstrateElementSelection() {
    // Select by tag name
    const paragraphs = $('p');

    // Select by class
    const formElements = $('.form-element');

    // Select by ID
    const contactForm = $('#contact-form');

    // Select by attribute
    const requiredFields = $('[required]');

    // Modify existing elements
    paragraphs.each(function (index) {
        if (index % 2 === 0) {
            $(this).css('font-weight', 'bold');
        }
    });
}

function initializeDOMManipulation() {
    // Add dynamic content to component cards on architecture page
    $('.component-card').each(function (index) {
        const card = $(this);

        // Add click handler to highlight cards
        card.on('click', function () {
            $('.component-card').removeClass('highlighted');
            card.addClass('highlighted');

            // Create and append a highlight effect
            const highlight = $('<div>').css({
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                background: 'rgba(74, 144, 226, 0.1)',
                borderRadius: '10px',
                pointerEvents: 'none',
                zIndex: '-1'
            });

            if (!card.find('.highlight-overlay').length) {
                card.css('position', 'relative').append(highlight.addClass('highlight-overlay'));
                setTimeout(function () {
                    highlight.fadeOut(500, function () {
                        highlight.remove();
                    });
                }, 1000);
            }
        });
    });

    // Create and modify elements dynamically
    if ($('#sequence-container').length) {
        const loadingIndicator = $('<div>').attr('id', 'loading-indicator')
            .html('<p>Loading sequence data...</p>')
            .css({
                textAlign: 'center',
                padding: '20px',
                color: '#555'
            });
        $('#sequence-container').prepend(loadingIndicator);

        // Remove loading indicator after data loads
        setTimeout(function () {
            $('#loading-indicator').fadeOut(300, function () {
                $(this).remove();
            });
        }, 1000);
    }
}
