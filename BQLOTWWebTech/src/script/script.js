// script.js - Main jQuery initialization and module loader

// jQuery Document Ready
$(document).ready(function () {
    // Initialize all modules
    initializeAnimations();
    initializeFormValidation();
    loadSequenceData();
    initializeDOMManipulation();

    // Demonstrate element selection on contact page
    if ($('#contact-form').length) {
        setTimeout(demonstrateElementSelection, 1000);
    }
});

