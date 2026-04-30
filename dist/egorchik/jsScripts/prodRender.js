const neededFiieldOfProducts = document.querySelector('.pages-grid');

function addProductToCart(el) {
    const id = el.getAttribute('data-js-id')

    const name = el.querySelector('.accum-info > h1').textContent
    console.log(name)
    const price = el.querySelector('.price-cont > h1').textContent
    console.log(price)
    const quantity = el.querySelector('#counter').textContent
    console.log(quantity)

    const sum = parseInt(price) * Number(quantity)
    console.log(sum)

    localStorage.setItem(`${id}`, 
        JSON.stringify({
            quantity: quantity,
            price: price,
            name: name,
            sum: sum
        })
    )
}

fetch('http://localhost:3000/api/admin/products')
    .then(response => response.json())
    .then(json => {
        console.log(json);

        for (let prop of json) {
            const capacity_ah = prop.capacity_ah.slice(0, 3)
            const voltage = prop.voltage_v.slice(0, 3)
            const height = prop.height_mm.slice(0, 3)
            const length = prop.length_mm.slice(0, 3)
            const width = prop.width_mm.slice(0, 3)
            const price = prop.price.slice(0, -3)

            let newElement = document.createElement('div');

            if (prop.in_stock === true) {
                newElement.innerHTML = `
                    <div class="sortpages-page in-availebility" in-stock=${prop.in_stock} data-js-id=${prop.id} in-availebility>
                        <img loading="lazy" class="accum-main-pic" src="../allAssets/catalog-content/fromto-page-pic.png" alt="">
                        <div class="accum-info">
                            <h1 class="1">${prop.title}</h1>
                            <p>Цена действительна при сдаче старого аккумулятора аналогичной емкости в лом</p>
                            <div>
                                <p id="emkost" class="info-black" data-val="60">Емкость, Ач: <span class='info-grey'>${capacity_ah}</span></p>
                                <p class="info-black">Пусковой ток, А: <span class='info-grey'>${voltage}</span></p>
                                <p class="info-black">Полярность: <span class='info-grey'>${prop.polarity}</span></p>
                                <p class="info-black">Клеммы: <span class='info-grey'>${prop.terminal_type}</span></p>
                                <p class="info-black">Pазмеры (ДхШхВ), мм: <span class='info-grey'>${length}x${width}x${height}</span></p>
                                <p class="info-black">Производитель: <span class='info-grey'>${prop.brand}</span></p>
                                <p class="info-black">Bес, кг: <span class='info-grey'>14.5</span></p>
                            </div>
                        </div>
                        <div class="price-and-order">
                            <div class="price-cont">
                                <h1>${price} руб.</h1>
                                <p>2900 руб.</p>
                            </div>
                            <div class="choosen-addItem-btn-cont">
                                <img class="decrement" id="minusCount" src="../allAssets/catalog-content/removeItem.svg">
                                <button id="counter">00</button>
                                <img class="increment" id="plusCount" src="../allAssets/catalog-content/addItem.svg">
                            </div>
                            <div class="choosen-bucket-btn-cont">
                                <button id="bucketPurchase" class="purchase-btn-in-btn-cont" type="button">В КОРЗИНУ</button>
                                <img src="../allAssets/catalog-content/choosen-bucket.svg">
                            </div>
                            <div class="choosen-bucket-btn-cont-hidden">
                                <button>В КОРЗИНЕ</button>
                                <img src="../allAssets/catalog-content/unhidden-buck.svg">
                            </div>
                            <button class="more-info-btn">
                                <a href="../html's/chosen-item-catalog.html">ПОДРОБНЕЕ</a>
                            </button>
                            <div class="in-availebility-check">
                                <p>В НАЛИЧИИ</p>
                            </div>
                        </div>
                    </div>
                `
            } else {
                newElement.innerHTML = `
                    <div class="sortpages-page for-order" in-stock=${prop.in_stock} data-js-id=${prop.id}>
                        <img loading="lazy" class="accum-main-pic" src="../allAssets/catalog-content/fromto-page-pic.png" alt="">
                        <div class="accum-info">
                            <h1 class="1">${prop.title}</h1>
                            <p>Цена действительна при сдаче старого аккумулятора аналогичной емкости в лом</p>
                            <div>
                                <p id="emkost" class="info-black" data-val="60">Емкость, Ач: <span class='info-grey'>${capacity_ah}</span></p>
                                <p class="info-black">Пусковой ток, А: <span class='info-grey'>${voltage}</span></p>
                                <p class="info-black">Полярность: <span class='info-grey'>${prop.polarity}</span></p>
                                <p class="info-black">Клеммы: <span class='info-grey'>${prop.terminal_type}</span></p>
                                <p class="info-black">Pазмеры (ДхШхВ), мм: <span class='info-grey'>${length}x${width}x${height}</span></p>
                                <p class="info-black">Производитель: <span class='info-grey'>${prop.brand}</span></p>
                                <p class="info-black">Bес, кг: <span class='info-grey'>14.5</span></p>
                            </div>
                        </div>
                        <div class="price-and-order">
                            <div class="price-cont">
                                <h1>${price} руб.</h1>
                                <p>2900 руб.</p>
                            </div>
                            <div class="choosen-addItem-btn-cont">
                                <img class="decrement" id="minusCount" src="../allAssets/catalog-content/removeItem.svg">
                                <button id="counter">00</button>
                                <img class="increment" id="plusCount" src="../allAssets/catalog-content/addItem.svg">
                            </div>
                            <div class="choosen-bucket-btn-cont">
                                <button id="bucketPurchase" class="purchase-btn-in-btn-cont" type="button">В КОРЗИНУ</button>
                                <img src="../allAssets/catalog-content/choosen-bucket.svg">
                            </div>
                            <div class="choosen-bucket-btn-cont-hidden">
                                <button>В КОРЗИНЕ</button>
                                <img src="../allAssets/catalog-content/unhidden-buck.svg">
                            </div>
                            <button class="more-info-btn">
                                ПОДРОБНЕЕ
                            </button>
                            <div class="for-order-check">
                                <p>ПОД ЗАКАЗ</p>
                            </div>
                        </div>
                    </div>
                `
            }

            neededFiieldOfProducts.insertAdjacentElement('beforeend', newElement)
        }

        const hideBtn = document.querySelectorAll('.choosen-bucket-btn-cont');

        hideBtn.forEach((btn) => {
            btn.addEventListener('click', () => {
                const cont = btn.closest('.sortpages-page');
                if (cont) {
                    const hideTheContent = cont.querySelector('.choosen-addItem-btn-cont');
                    const btnAfterClick = cont.querySelector('.choosen-bucket-btn-cont');
                    const contAfterClick = cont.querySelector('.choosen-bucket-btn-cont-hidden');
                    hideTheContent.style.visibility = 'hidden';
                    btnAfterClick.style.display = 'none';
                    contAfterClick.style.display = 'flex';
                } else {
                    console.log('error')
                }

                addProductToCart(cont)

            }, false);
        });
    })