function deleteProduct(id) {
    const response = confirm('Are you sure want to delete this item?');
    if (response) {
        fetch('/delete-item/' + id, {
            method: 'POST'
        }).then((res) => {
            window.location.href = "/";
        })
    }
}
