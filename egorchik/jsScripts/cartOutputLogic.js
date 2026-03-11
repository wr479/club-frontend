const pagesFieldAfter = document.querySelector('.grids-zakaz1');

function addItemFromBd() {
    fetch('http://localhost:3000/cart')
        .then((response) => {
            console.log(response)

            return response.json()
        })
        .then((json) => {
            for (let i in json) {
                let newEl = document.createElement('div');
                newEl.innerHTML = `
                    <div class="grids-zakaz2">
                        <div class="grids-zakaz2_text">
                            <span1>${json[i].name}</span1>
                            <span>${json[i].quantity} шт. х ${json[i].price} руб.</span>
                        </div>
                        <div class="cont-for_second-text">
                            <span>${json[i].sum} руб.</span>
                        </div>
                        <div class="edit-tools">
                            <p class="edit-tools-delete-item">×</p>
                            <div class="edit-tools-wrapper">
                                <span>+</span>
                                <span>-<span>
                            </div>
                    </div>
                `
                newEl.classList.add('shell');
                newEl.setAttribute('data-id', `${json[i].id}`)
                pagesFieldAfter.after(newEl);

                let totalJSON = []
                for(let item of json) {
                    totalJSON.push(item.sum)
                }
                let sumOfTotalJSON = totalJSON.reduce((prev, curr) => prev + curr, 0)
                // console.log(sumOfTotalJSON);

                const visibleForGuestSum = document.querySelector('.grids-zakaz1 > p');
                visibleForGuestSum.textContent = `${sumOfTotalJSON} руб.`; 
            }
        })
}

addItemFromBd()
