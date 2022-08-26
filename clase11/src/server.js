const express = require ('express')
const {Server:Httpserver} = require('http')
const {Server:IOServer} = require('socket.io')

const app = express();
const httpserver = new httpserver(app)
const io = new IOServer(httpserver)

app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.send('Ok')
})