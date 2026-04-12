document.addEventListener('click', (event) => {
    let currentEl = event.target.closest('.edit-tools-delete-item');
    
    if (currentEl) {
        let currentParentEl = event.target.closest('.shell');
        const currentId = currentParentEl.getAttribute('data-id');
        console.log(currentId)

        function removeItemFromBD(id) {
            fetch(`/api/cart/${id}`, {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    id: id
                 })
            })
            .then((response) => response.json())
            .then(data => {
                if (data.success) {
                    console.log('товар удален');
                }
            })
        }
        removeItemFromBD(currentId);
    }
})