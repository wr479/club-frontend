const rangeSlider = document.querySelector('#range-slider');
const inputMin = document.querySelector('#min-input');
const inputMax = document.querySelector('#max-input');
const allInputs = [inputMin, inputMax];

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
    });

    const setRangeSlider = (i, value) => {
        let arr = [null, null];
        arr[i] = value;

        rangeSlider.noUiSlider.set(arr);
    };

    allInputs.forEach((i, index) => {
        i.addEventListener('change', (e) => {
            setRangeSlider(index, e.currentTarget.value);
        })
    })
}