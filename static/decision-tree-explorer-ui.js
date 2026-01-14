/**
 * Decision Tree Explorer - UI Functions
 * Handles tabs, sliders, checkboxes, metrics display, and feature importance visualization
 */

// Initialize tab switching functionality
function initTabs() {
    document.querySelectorAll('.main-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.main-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
        });
    });
}

// Initialize feature checkboxes for automated tree
function initCheckboxes(availableFeatures, state) {
    const container = document.getElementById('feature-checkboxes');
    container.innerHTML = availableFeatures.map(f => `
        <label class="checkbox-item"><input type="checkbox" value="${f}" checked> ${f}</label>
    `).join('');
    
    // Sync state.selectedFeatures with checkbox state
    state.selectedFeatures = [...container.querySelectorAll('input:checked')].map(c => c.value);
    
    container.querySelectorAll('input').forEach(cb => {
        cb.addEventListener('change', () => {
            state.selectedFeatures = [...container.querySelectorAll('input:checked')].map(c => c.value);
        });
    });
}

// Initialize parameter sliders
function initSliders() {
    [['max-depth', 'max-depth-val', ''], ['min-samples', 'min-samples-val', ''], ['min-leaf', 'min-leaf-val', '']].forEach(([id, valId, suf]) => {
        const slider = document.getElementById(id);
        const display = document.getElementById(valId);
        if (slider && display) {
            slider.addEventListener('input', () => display.textContent = slider.value + suf);
        }
    });
    // Special handling for min impurity (scale 0-10 to 0-0.1)
    const impSlider = document.getElementById('min-impurity');
    const impDisplay = document.getElementById('min-impurity-val');
    if (impSlider && impDisplay) {
        impSlider.addEventListener('input', () => impDisplay.textContent = (impSlider.value / 100).toFixed(2));
    }
}

// Update metrics display
function updateMetrics(m, prefix = '') {
    document.getElementById(prefix + 'accuracy').textContent = (m.accuracy * 100).toFixed(1) + '%';
    document.getElementById(prefix + 'precision').textContent = (m.precision * 100).toFixed(1) + '%';
    document.getElementById(prefix + 'recall').textContent = (m.recall * 100).toFixed(1) + '%';
    document.getElementById(prefix + 'f1').textContent = (m.f1 * 100).toFixed(1) + '%';
}

// Update feature importance bars
function updateImportance(imp) {
    const container = document.getElementById('feature-importance');
    const sorted = Object.entries(imp).sort((a,b) => b[1] - a[1]);
    if (!sorted.length) { container.innerHTML = '<p class="info-text">No data</p>'; return; }
    const max = Math.max(...sorted.map(s => s[1]));
    container.innerHTML = sorted.map(([name, val]) => `
        <div class="imp-row">
            <span class="fname">${name}</span>
            <div class="bar-bg"><div class="bar-fill" style="width:${(val/max)*100}%"></div></div>
            <span class="pct">${(val*100).toFixed(0)}%</span>
        </div>
    `).join('');
}

// Setup automated tree tab visibility based on config
function setupAlgoTabVisibility(showAlgoTab) {
    const algoTab = document.querySelector('.main-tab[data-tab="algo"]');
    const algoPanel = document.getElementById('tab-algo');
    
    if (!showAlgoTab) {
        if (algoTab) algoTab.classList.add('hidden');
        if (algoPanel) algoPanel.classList.add('hidden');
        
        // If algo tab was active, switch to manual
        if (algoTab && algoTab.classList.contains('active')) {
            algoTab.classList.remove('active');
            algoPanel.classList.remove('active');
            const manualTab = document.querySelector('.main-tab[data-tab="manual"]');
            const manualPanel = document.getElementById('tab-manual');
            if (manualTab) manualTab.classList.add('active');
            if (manualPanel) manualPanel.classList.add('active');
        }
    } else {
        if (algoTab) algoTab.classList.remove('hidden');
        if (algoPanel) algoPanel.classList.remove('hidden');
    }
}

// Parse URL parameters
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        dataset: params.get('dataset'),
        showAlgo: params.get('showAlgo')
    };
}

// Get dataset filename from URL or default
function getDatasetFilename(defaultDataset) {
    const params = getUrlParams();
    return params.dataset || defaultDataset;
}

// Get showAlgo setting from URL or default
function getShowAlgoSetting(defaultShowAlgo) {
    const params = getUrlParams();
    if (params.showAlgo === null) return defaultShowAlgo;
    return params.showAlgo === 'true' || params.showAlgo === '1';
}

// Get features from URL or default
function getFeaturesFromUrl(defaultFeatures) {
    const params = new URLSearchParams(window.location.search);
    const featuresParam = params.get('features');
    if (!featuresParam) return defaultFeatures;
    
    // Parse comma-separated feature names and validate
    const requested = featuresParam.split(',').map(f => f.trim()).filter(f => f);
    const valid = requested.filter(f => ALL_VALID_FEATURES.includes(f));
    return valid.length > 0 ? valid : defaultFeatures;
}
