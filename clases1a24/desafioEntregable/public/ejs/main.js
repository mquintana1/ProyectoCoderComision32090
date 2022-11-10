const socket = io();

socket.on('products', (products) => handleProducts(products));
socket.on('messages', (messages) => handleMessages(messages));

async function handleProducts(products) {
  const recursoRemoto = await fetch(`views/products.ejs`);
  const layoutText = await recursoRemoto.text();
  const functionTemplate = ejs.compile(layoutText);
  const html = functionTemplate({ products });
  document.getElementById('products').innerHTML = html;
}

async function handleMessages(messages) {
  const recursoRemoto = await fetch(`views/messages.ejs`);
  const layoutText = await recursoRemoto.text();
  const functionTemplate = ejs.compile(layoutText);
  const html = functionTemplate( {messages});
  document.getElementById('messages').innerHTML = html;
}

const addProductForm = document.getElementById('formAddProduct');
addProductForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const product = {
    title: addProductForm[0].value,
    price: addProductForm[1].value,
    thumbnail: addProductForm[2].value,
  };

  socket.emit('newProduct', product);

  addProductForm.reset();
});

const addMessageForm = document.getElementById('formAddMessage');

addMessageForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const newMessage = {
    author: {
      id: addMessageForm[0].value,
      nombre: addMessageForm[1].value,
      apellido: addMessageForm[2].value,
      edad: addMessageForm[3].value,
      alias: addMessageForm[4].value,
      avatar: addMessageForm[5].value,
      date: `${('0' + new Date().getDate()).slice(-2)}/${('0' + (new Date().getMonth() + 1)).slice(
        -2
      )}/${new Date().getFullYear()} ${('0' + new Date().getHours()).slice(-2)}:${('0' + new Date().getMinutes()).slice(
        -2
      )}:${('0' + new Date().getSeconds()).slice(-2)}`,
    },
    text: addMessageForm[6].value,
  };

  socket.emit('newMessage', newMessage);
});


const bye = document.getElementById('logout-button');

bye.addEventListener('click',()=>{
  window.location.assign('/logout')
})