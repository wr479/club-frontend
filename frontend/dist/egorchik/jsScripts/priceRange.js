const rangeSlider = document.querySelector('#range-slider');
const inputMin = document.querySelector('#min-input');
const inputMax = document.querySelector('#max-input');
const allInputs = [inputMin, inputMax];

let debounceTimer;

if (rangeSlider) {
    noUiSlider.create(rangeSlider, {
        start: [2199, 9390],
        connect: true,
        step: 10,
        range: {
            'min': [2199],
            'max': [9390]
        },
        cssPrefix: 'noUi-',
    });

    rangeSlider.noUiSlider.on('update', function(values, handle) {
        allInputs[handle].value = Math.round(values[handle]);

        clearTimeout(debounceTimer)
        debounceTimer = setTimeout(() => {
            const currentValues = rangeSlider.noUiSlider.get();
            const minPrice = Math.round(currentValues[0]);
            const maxPrice = Math.round(currentValues[1]);
            
            if (window.filterProductsByPrice) {
                window.filterProductsByPrice(minPrice, maxPrice);
            }
        }, 300)
    });

    const setRangeSlider = (i, value) => {
        let arr = [null, null];
        arr[i] = value;

        rangeSlider.noUiSlider.set(arr);
    };

    allInputs.forEach((i, index) => {
        i.addEventListener('change', (e) => {
            let value = parseInt(e.currentTarget.value);
            if (isNaN(value)) return;
            
            const min = 2199;
            const max = 9390;
            value = Math.min(max, Math.max(min, value));
            
            setRangeSlider(index, value);
            
            const currentValues = rangeSlider.noUiSlider.get();
            const minPrice = Math.round(currentValues[0]);
            const maxPrice = Math.round(currentValues[1]);
            
            if (window.filterProductsByPrice) {
                window.filterProductsByPrice(minPrice, maxPrice);
            }
        })
    })
}

window.filterProductsByPrice = filterProductsByPrice;