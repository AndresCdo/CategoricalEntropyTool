class EntropyVisualization {
    constructor(numSliders = 5) {
        this.numSliders = numSliders;
        this.config = {
            minValue: 0.0001,
            maxValue: 1.0,
            step: 0.0001,
            epsilon: 1e-8
        };
        
        this.initializeUI();
        this.bindEvents();
        this.updateVisualization();
    }

    initializeUI() {
        this.initializeSliders();
        this.initializeBarChart();
    }

    initializeSliders() {
        const slidersContainer = document.getElementById('sliders');
        const initialValue = 1 / this.numSliders;

        for (let i = 1; i <= this.numSliders; i++) {
            const sliderBox = document.createElement('div');
            sliderBox.className = 'slider-box';
            sliderBox.innerHTML = `
                <input id="slider-${i}" 
                       class="slider" 
                       type="range" 
                       min="${this.config.minValue}" 
                       max="${this.config.maxValue}" 
                       value="${initialValue}" 
                       step="${this.config.step}"/>
                <div id="slider-num-${i}" class="slider-num">${this.round(initialValue)}</div>
            `;
            slidersContainer.appendChild(sliderBox);
        }
    }

    initializeBarChart() {
        const barChart = document.getElementById('barChart');
        barChart.innerHTML = Array(this.numSliders)
            .fill('')
            .map((_, i) => `<div id="bar-${i + 1}" class="bar"></div>`)
            .join('');
    }

    bindEvents() {
        for (let i = 1; i <= this.numSliders; i++) {
            document.getElementById(`slider-${i}`)
                .addEventListener('input', () => this.handleSliderChange(i));
        }
    }

    handleSliderChange(movedId) {
        const values = this.getSliderValues();
        const normalizedValues = this.normalize(values, movedId);
        this.updateUI(normalizedValues);
        this.updateVisualization();
    }

    getSliderValues() {
        return Array.from({length: this.numSliders}, (_, i) => 
            parseFloat(document.getElementById(`slider-${i + 1}`).value)
        );
    }

    normalize(values, movedIndex) {
        const movedValue = values[movedIndex - 1];
        const total = values.reduce((sum, val) => sum + val, 0);
        const scalar = (1 - movedValue) / (total - movedValue + this.config.epsilon);

        return values.map((val, i) => 
            i === movedIndex - 1 ? val : val * scalar
        );
    }

    calculateEntropy(values) {
        return values
            .filter(x => x > this.config.minValue)
            .reduce((acc, p) => acc - p * Math.log2(p), 0);
    }

    updateUI(values) {
        values.forEach((value, index) => {
            const id = index + 1;
            document.getElementById(`slider-${id}`).value = value;
            document.getElementById(`slider-num-${id}`).textContent = 
                this.round(value);
            document.getElementById(`bar-${id}`).style.height = 
                `${value * 100}%`;
        });
    }

    updateVisualization() {
        const values = this.getSliderValues();
        const entropy = this.calculateEntropy(values);
        const probability = this.round(Math.pow(2, -entropy));

        document.getElementById('entropy').textContent = 
            `Entropy: ${this.round(entropy)} bits`;
        document.getElementById('distribution').textContent = 
            `Probability Distribution: ${probability}`;

        // Actualizar gráfico de barras
        values.forEach((value, index) => {
            document.getElementById(`bar-${index + 1}`).style.height = 
                `${value * 100}%`;
        });
    }

    round(num, precision = 100) {
        return Math.round((num + Number.EPSILON) * precision) / precision;
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    const numSliders = parseInt(new URLSearchParams(window.location.search)
        .get('n_sliders')) || 5;
    new EntropyVisualization(numSliders);
});