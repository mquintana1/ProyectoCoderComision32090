const app = require('./app.js')
const PORT =  process.env.PORT || 8080;
const {Server:HttpServer} = require('http')
const {Server:IOServer} = require('socket.io')
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const products = require('./src/contenedor')
let messages = []


app.get('/mensaje', (req,res) => {
  res.send("Hola bienvenido a la nube Heroku");
})

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
  });

server.on('error', (error) => console.error(`Error en Servidor ${error}`));

server.on('error',(err)=>{
  console.log(err);
})
io.on('connection',(socket)=>{
  console.log('se conecto un cliente');
  //para enviar 
  socket.emit('messages',{messages,products:products.getAll()})

  socket.on('new-message',(data)=>{
      // Agregado de nuevos mensajes ingresados. Otro metodo podria ser messages.push(data);
      messages=[...messages,data]
      // Muestra de mensaje. Otro metodo a utilizar console.log(products.getAll());
      console.log(messages);
      let todo ={messages:messages,products:products.getAll()}
      io.sockets.emit('messages',todo)
  })
  socket.on('new-product',(data)=>{
    console.log(data);
    products.save(data);
    console.log(products.getAll());
      let todo ={messages:messages,products:products.getAll()}
    io.sockets.emit('messages',todo)
  })
  
})