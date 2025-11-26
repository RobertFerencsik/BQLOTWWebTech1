// jQuery Document Ready
$(document).ready(function () {
    // Initialize animations and functionality
    initializeAnimations();
    initializeFormValidation();
    initializeVideoControls();
    loadSequenceData();
});

// jQuery Animations
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

    // Animate component cards on scroll
    $(window).scroll(function () {
        $('.component-card').each(function () {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).css('opacity', '0').animate({ opacity: 1 }, 800);
            }
        });
    });

    // Animate history items on scroll
    $('.history-item').each(function (index) {
        $(this).css('opacity', '0').delay(index * 200).animate({ opacity: 1 }, 800);
    });

    // Button click animations
    $('.btn').click(function () {
        $(this).animate({ scale: '0.95' }, 100, function () {
            $(this).animate({ scale: '1' }, 100);
        });
    });
}

// Form Validation
function initializeFormValidation() {
    const form = $('#contact-form');

    if (form.length === 0) return;

    form.on('submit', function (e) {
        e.preventDefault();

        let isValid = true;

        // Clear previous errors
        $('.form-element').removeClass('error');
        $('.error-message').removeClass('show').text('');

        // Validate Name
        const name = $('#name');
        if (!name.val().trim() || name.val().trim().length < 2) {
            showError(name, 'name-error', 'Name must be at least 2 characters long');
            isValid = false;
        }

        // Validate Email
        const email = $('#email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.val().trim() || !emailRegex.test(email.val())) {
            showError(email, 'email-error', 'Please enter a valid email address');
            isValid = false;
        }

        // Validate Experience (Radio buttons)
        const experience = $('input[name="experience"]:checked');
        if (experience.length === 0) {
            showError($('input[name="experience"]').first(), 'experience-error', 'Please select your experience level');
            isValid = false;
        }

        // Validate Interests (Checkboxes)
        const interests = $('input[name="interests"]:checked');
        if (interests.length === 0) {
            showError($('input[name="interests"]').first(), 'interests-error', 'Please select at least one area of interest');
            isValid = false;
        }

        // Validate Message
        const message = $('#message');
        if (!message.val().trim() || message.val().trim().length < 10) {
            showError(message, 'message-error', 'Message must be at least 10 characters long');
            isValid = false;
        }

        // Validate Date (if provided, should be future date)
        const date = $('#date');
        if (date.val()) {
            const selectedDate = new Date(date.val());
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDate < today) {
                showError(date, 'date-error', 'Please select a future date');
                isValid = false;
            }
        }

        if (isValid) {
            // Success animation
            form.css('opacity', '0.5').animate({ opacity: 1 }, 500);
            alert('Form submitted successfully! Thank you for your inquiry.');
            form[0].reset();
        } else {
            // Shake animation on error
            form.animate({ marginLeft: '-10px' }, 100)
                .animate({ marginLeft: '10px' }, 100)
                .animate({ marginLeft: '-10px' }, 100)
                .animate({ marginLeft: '10px' }, 100)
                .animate({ marginLeft: '0px' }, 100);
        }
    });

    // Real-time validation on blur
    $('#name, #email, #message').on('blur', function () {
        validateField($(this));
    });
}

function showError(element, errorId, message) {
    element.addClass('error');
    $('#' + errorId).text(message).addClass('show');

    // Scroll to first error
    if (!$('.form-element.error').first().offset()) return;
    $('html, body').animate({
        scrollTop: $('.form-element.error').first().offset().top - 100
    }, 500);
}

function validateField(field) {
    const fieldId = field.attr('id');
    field.removeClass('error');
    $('#' + fieldId + '-error').removeClass('show').text('');

    if (fieldId === 'name' && field.val().trim().length < 2) {
        showError(field, fieldId + '-error', 'Name must be at least 2 characters long');
    } else if (fieldId === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.val())) {
            showError(field, fieldId + '-error', 'Please enter a valid email address');
        }
    } else if (fieldId === 'message' && field.val().trim().length < 10) {
        showError(field, fieldId + '-error', 'Message must be at least 10 characters long');
    }
}

// Video Controls
function initializeVideoControls() {
    const video = $('#lstm-video');

    if (video.length === 0) return;

    $('#play-btn').click(function () {
        video[0].play();
        $(this).fadeOut(200).fadeIn(200);
    });

    $('#pause-btn').click(function () {
        video[0].pause();
        $(this).fadeOut(200).fadeIn(200);
    });

    $('#mute-btn').click(function () {
        video[0].muted = true;
        $(this).fadeOut(200).fadeIn(200);
    });

    $('#unmute-btn').click(function () {
        video[0].muted = false;
        $(this).fadeOut(200).fadeIn(200);
    });

    $('#fullscreen-btn').click(function () {
        if (video[0].requestFullscreen) {
            video[0].requestFullscreen();
        } else if (video[0].webkitRequestFullscreen) {
            video[0].webkitRequestFullscreen();
        } else if (video[0].msRequestFullscreen) {
            video[0].msRequestFullscreen();
        }
        $(this).fadeOut(200).fadeIn(200);
    });
}

// AJAX - Load JSON Data
function loadSequenceData() {
    const container = $('#sequence-container');

    if (container.length === 0) return;

    $.ajax({
        url: 'data.json',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            displaySequenceData(data);
        },
        error: function (xhr, status, error) {
            console.error('Error loading JSON data:', error);
            container.html('<p>Error loading sequence data. Please try again later.</p>');
        }
    });
}

function displaySequenceData(data) {
    const container = $('#sequence-container');
    let html = '';

    // Display sequences with enhanced visual design
    html += '<div class="sequences-showcase">';
    data.sequences.forEach(function (sequence, index) {
        const colors = [
            { gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', accent: '#764ba2' },
            { gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', accent: '#f5576c' },
            { gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', accent: '#00f2fe' }
        ];
        const color = colors[index % colors.length];

        html += `
            <div class="sequence-card-enhanced" data-index="${index}">
                <div class="sequence-header" style="background: ${color.gradient};">
                    <div class="sequence-icon">⚡</div>
                    <h3>${sequence.type}</h3>
                    <p class="sequence-subtitle">${sequence.description}</p>
                </div>
                <div class="sequence-body">
                    <div class="sequence-flow">
                        <div class="flow-section input-section">
                            <div class="flow-label">INPUT</div>
                            <div class="input-items">
                                ${sequence.input.map((item, i) => `
                                    <div class="sequence-item input-item" data-order="${i}">
                                        <span class="item-content">${item}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        <div class="flow-arrow">
                            <svg viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient id="arrowGradient${index}" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" style="stop-color:${color.accent};stop-opacity:1" />
                                        <stop offset="100%" style="stop-color:${color.accent};stop-opacity:0.5" />
                                    </linearGradient>
                                    <marker id="arrowhead${index}" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                                        <polygon points="0 0, 10 3, 0 6" fill="${color.accent}" />
                                    </marker>
                                </defs>
                                <path d="M 10 25 L 85 25" stroke="url(#arrowGradient${index})" stroke-width="3" fill="none" marker-end="url(#arrowhead${index})" class="arrow-path"/>
                            </svg>
                            <div class="processing-badge">
                                <span>LSTM</span>
                            </div>
                        </div>
                        <div class="flow-section output-section">
                            <div class="flow-label">OUTPUT</div>
                            <div class="output-item">
                                <span class="item-content highlight">${sequence.output}</span>
                            </div>
                        </div>
                    </div>
                    <div class="sequence-description">
                        <div class="desc-icon">🧠</div>
                        <p>${sequence.processing}</p>
                    </div>
                </div>
            </div>
        `;
    });
    html += '</div>';

    // Display LSTM Info with enhanced design
    html += '<div class="lstm-info-enhanced">';
    html += `<div class="lstm-info-header">
        <div class="lstm-icon">🔬</div>
        <h3>About ${data.lstmInfo.fullName}</h3>
    </div>`;
    html += `<div class="lstm-info-content">
        <div class="lstm-meta">
            <span class="meta-item">
                <strong>Invented by:</strong> ${data.lstmInfo.inventors}
            </span>
            <span class="meta-item">
                <strong>Year:</strong> ${data.lstmInfo.year}
            </span>
        </div>
        <div class="lstm-features">
            <h4>Key Features</h4>
            <div class="features-grid">`;
    data.lstmInfo.keyFeatures.forEach(function (feature) {
        html += `<div class="feature-badge">${feature}</div>`;
    });
    html += `</div></div></div></div>`;

    container.html(html);

    // Enhanced animations
    container.find('.sequence-card-enhanced').each(function (index) {
        const $card = $(this);
        $card.css({
            opacity: 0,
            transform: 'translateY(30px) scale(0.95)'
        }).delay(index * 300).animate({
            opacity: 1
        }, 800, function () {
            $card.css('transform', 'translateY(0) scale(1)');

            // Animate input items sequentially
            $card.find('.input-item').each(function (i) {
                const $item = $(this);
                $item.css('display', 'block');
                $item.delay(i * 150).animate({
                    opacity: 1
                }, 400);
            });

            // Animate arrow
            setTimeout(function () {
                $card.find('.arrow-path').css('stroke-dasharray', '1000').css('stroke-dashoffset', '1000')
                    .animate({ 'stroke-dashoffset': 0 }, 1000, 'swing');
            }, 500);

            // Animate output
            setTimeout(function () {
                const $output = $card.find('.output-item');
                $output.css('display', 'block');
                $output.animate({
                    opacity: 1
                }, 400).css('transform', 'scale(1.1)').animate({
                    transform: 'scale(1)'
                }, 300);
            }, 1500);
        });
    });

    // Animate LSTM info card
    container.find('.lstm-info-enhanced').css({
        opacity: 0,
        transform: 'translateY(20px)'
    }).delay(data.sequences.length * 300).animate({
        opacity: 1,
        transform: 'translateY(0)'
    }, 800);
}

// DOM Manipulation Examples
$(document).ready(function () {
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
});

// Element Selection Examples
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

// Call demonstration on page load
$(document).ready(function () {
    // Demonstrate element selection on contact page
    if ($('#contact-form').length) {
        setTimeout(demonstrateElementSelection, 1000);
    }
});

