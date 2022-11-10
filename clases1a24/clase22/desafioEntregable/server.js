import http from 'http';
import {Server} from 'socket.io' 
import { normalize, schema } from 'normalizr';

import {app} from './app.js';
import { products, messages} from './src/containers/MongodbContainer.js';

const PORT = process.env.PORT || 8080;
const httpServer = http.createServer(app);
const io = new Server(httpServer);

const authorsSchema = new schema.Entity('author');
const messageSchema = new schema.Entity('message', { author: authorsSchema });

io.on('connection', async (socket) => {
  socket.emit('products', await products.getAll());
  socket.emit('messages', normalize(await messages.getAll(), [messageSchema]));
  
  socket.on('newProduct', async (newProduct) => {
    await products.save(newProduct);
    io.sockets.emit('products', await products.getAll());
  });

  socket.on('newMessage', async (newMessage) => {
    await messages.save(newMessage);
    io.sockets.emit('messages', normalize(await messages.getAll(), [messageSchema]));
  });
});

const server = httpServer.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
  
});

server.on('error', (error) => console.error(`Error en Servidor ${error}`));