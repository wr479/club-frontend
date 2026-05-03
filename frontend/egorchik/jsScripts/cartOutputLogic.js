const pagesFieldAfter = document.querySelector('.grids-zakaz1');

function outputItem() {
    let total = []

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i)
        let val = localStorage.getItem(key)
        console.log(`${key}, ${val}`)

        try {
            storageData = JSON.parse(val);
        } catch (e) {
            console.error(`Ошибка парсинга для ключа ${key}:`, e);
            continue;
        }

        let newEl = document.createElement('div');
        newEl.innerHTML = `
            <div class="grids-zakaz2" data-cart-id=${key}>
                <div class="grids-zakaz2_text">
                    <span1>${storageData.name}</span1>
                    <span>${storageData.quantity} шт. х ${storageData.price}</span>
                </div>
                <div class="cont-for_second-text">
                    <span>${storageData.sum} руб.</span>
                </div>
                <div class="edit-tools">
                    <p class="edit-tools-delete-item">×</p>
                    <div class="edit-tools-wrapper">
                        <span>+</span>
                        <span>-</span>
                    </div>
                </div>
            </div>
        `
        newEl.classList.add('shell');
        pagesFieldAfter.after(newEl)
        total.push(storageData.sum)
    }

    let sumOfTotalJSON = total.reduce((prev, curr) => prev + curr, 0)

    const visibleForGuestSum = document.querySelector('.grids-zakaz1 > p');
    visibleForGuestSum.textContent = `${sumOfTotalJSON} руб.`; 
}

outputItem()