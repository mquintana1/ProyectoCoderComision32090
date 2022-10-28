import http from 'http';
import {Server} from 'socket.io' 
import parseArgs from 'minimist'
import {app} from './app.js';
import { products, messages } from './src/containers/MongodbContainer.js';

const options = { default: {PORT: 8080}, alias: {p: "PORT"}}

const PORT = parseArgs(process.argv.slice(2), options).PORT

const httpServer = http.createServer(app);
const io = new Server(httpServer);

io.on('connection', async (socket) => {
  socket.emit('products', await products.getAll());
  socket.emit('messages', await messages.getAll());
  
  socket.on('newProduct', async (newProduct) => {
    await products.save(newProduct);
    io.sockets.emit('products', await products.getAll());
  });

  socket.on('newMessage', async (newMessage) => {
    await messages.save(newMessage);
    io.sockets.emit('messages', await messages.getAll());
  });
});

const server = httpServer.listen(PORT, () => {
  console.log(`Servidor express escuchando en el puerto ${server.address().port}`);
  
});

server.on('error', (error) => console.error(`Error en Servidor ${error}`));