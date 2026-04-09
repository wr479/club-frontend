const postBtn = document.querySelectorAll('.purchase-btn-in-btn-cont');

postBtn.forEach((el) => {
    el.addEventListener('click', (event) => {
        event.preventDefault();

        let currentProduct = event.target.closest('.sortpages-page');

        const priceOfItem = currentProduct.querySelector('.price-cont > h1');
        const titleOfItem = currentProduct.querySelector('.accum-info > h1');
        const emkostOfItem = currentProduct.querySelector('#emkost');
        const quantityOfItem = currentProduct.querySelector('#counter');

        let obj = {
            name: titleOfItem.textContent,
            emkost: Number(emkostOfItem.getAttribute('data-val')),
            price: parseInt(priceOfItem.textContent),
            sum: parseInt(priceOfItem.textContent) * Number(quantityOfItem.textContent),
            quantity: Number(quantityOfItem.textContent),
        }

        fetch('http://localhost:3000/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj),
        })
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            console.log(json)
        })
    })
})










