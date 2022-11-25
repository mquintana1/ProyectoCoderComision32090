const socket = io();
// UPDATE PRODUCTS
socket.on('updateProducts', data => {
    const listOfProducts = document.querySelector('#listOfProducts');
    const productos = data.payload;
    fetch('templates/Cards.handlebars')
        .then(res => res.text())
        .then(template => {
            console.log(template)
            const productsTemplate = Handlebars.compile(template);
            const templateObject = {
                productos: productos
            }
            const html = productsTemplate(templateObject);
            listOfProducts.innerHTML = html;
        })
})

// Carrito
function addCart(target) {
    const cartId = localStorage.getItem('CartID')
    const prodId = {
        pid: target.name
    };

    fetch(`/api/cart/${cartId}/product`, {
        method: 'POST',
        body: JSON.stringify(prodId),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(data => {
            if (data.status != 'Error') {
                const storage = JSON.parse(localStorage.getItem('Cart'));
                const title = target.parentNode.parentNode.firstElementChild.firstElementChild.textContent;
                const price = target.parentNode.previousElementSibling.firstElementChild.children[3].textContent;
                const stock = target.parentNode.previousElementSibling.firstElementChild.children[5].textContent;

                const newProduct = {
                    title,
                    price,
                    stock,
                    id: prodId.pid
                }
                const newStorage = [
                    ...storage,
                    newProduct
                ]
                localStorage.setItem('Cart', JSON.stringify(newStorage))
            } 
        })
}
