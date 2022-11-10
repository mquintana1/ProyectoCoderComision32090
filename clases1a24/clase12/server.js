const express = require('express')
const {Server:HttpServer} = require('http')
const {Server:IOServer} = require('socket.io')

const app = express();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
app.use(express.static('public'))

let mensajes = [
    {author:"Juan",text:"Hola, que tal?"},
    {author:"Pedro",text:"Muy bien y vos?"},
    {author:"Juan",text:"Genial!"}
];

app.get('/',(req,res)=>{
    res.sendFile('index.html',{root:__dirname})
})

const server = httpServer.listen(8080,()=>{
    console.log(`El servidor está escuchando por el puerto 8080`);
})
server.on('error',(err)=>{
    console.log(err);
})
io.on('connection',(socket)=>{
    console.log('se conecto un cliente');
    socket.emit('mensajes',mensajes);

    socket.on('nuevoMensaje',(data)=>{
        mensajes=[...mensajes,data]
        io.sockets.emit('mensajes',mensajes);
    });
})
