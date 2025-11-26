// form-validation.js - Form validation and error handling

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
