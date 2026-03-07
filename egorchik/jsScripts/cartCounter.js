const cartCounter = document.querySelector('.counter-counter');

fetch('http://localhost:3000/cart')
    .then((response) => {
        console.log(response)

        return response.json()
    })
    .then((json) => {
        console.log(json)
        cartCounter.textContent = json.length;

        let totalJSON = []
        for(let item of json) {
            totalJSON.push(item.price)
        }
        let sumOfTotalJSON = totalJSON.reduce((prev, curr) => prev + curr, 0)
        console.log(sumOfTotalJSON);
    })
    .catch((e) => {
        console.log(e)
    })
