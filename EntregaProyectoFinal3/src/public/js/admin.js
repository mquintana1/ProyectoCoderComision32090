// Formulario para agregar producto
const formAddProduct = document.querySelector('#formAddProduct');
formAddProduct.addEventListener('submit', (event) => {
    event.preventDefault();
    const messageBox = document.querySelector('#messageBox');
    const data = new FormData(formAddProduct);
    const obj = {
        title: data.get('title'),
        price: data.get('price'),
        thumbnail: data.get('thumbnail'),
        description: data.get('description'),
        stock: data.get('stock')
    }
    fetch('/api/products/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('Authorization') 
        },
        body: JSON.stringify(obj)
    })
        .then(res => res.json())
        .then(data => {
            if (messageBox.firstChild) {
                cleanRender(messageBox);
            }
            if (data.error === -2) return createMessage(messageBox, 'Usted no cuenta con permisos para crear un producto.')
            createMessage(messageBox, 'Producto creado con éxito.')
            location.replace('/admin');
        })

    setTimeout(() => {
        cleanRender(messageBox);
    }, 5000);
})


const listOfProductsDashboard = document.querySelector('#listOfProductsDashboard');
fetch('templates/productsList.handlebars')
    .then(res => res.text())
    .then(template => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                if(!data) return console.log('No hay productos guardados.')
                const productsTemplate = Handlebars.compile(template);
                const templateObject = {
                    productos: data
                }
                listOfProductsDashboard.innerHTML = productsTemplate(templateObject);
            })
            .catch(error => console.log(error))

    })
    .catch(error => console.log(error))



function click (e) {
    e.preventDefault()
    console.log(e.target)
}

const cleanRender = (zone) => {
    while (zone.firstChild) {
        zone.removeChild(zone.firstChild)
    }
}

const createMessage = (zone, message) => {
    const p = document.createElement('p');
    p.innerText = message
    p.setAttribute('class', 'lead')
    zone.appendChild(p);
} 