document.addEventListener('click', (event) => {
    let currentEl = event.target.closest('.edit-tools-delete-item');
    
    if (currentEl) {
        let currentParentEl = event.target.closest('.grids-zakaz2');
        const currentId = currentParentEl.getAttribute('data-cart-id');
        console.log(currentId)

        function removeItemFromBD(id) {
            localStorage.removeItem(`${id}`)
            location.reload()
        }
        removeItemFromBD(currentId);
    }
})