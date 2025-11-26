// data-loader.js - AJAX data loading and sequence display

function loadSequenceData() {
    const container = $('#sequence-container');

    if (container.length === 0) return;

    $.ajax({
        url: 'src/data/data.json',
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
