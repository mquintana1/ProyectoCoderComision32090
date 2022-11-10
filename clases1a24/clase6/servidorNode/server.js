const http = require('http')

const server = http.createServer((request,response)=>{
    if (request.method=="GET"){
        response.end('Hola Mundo!, usando el metodo GET');
    } else if(request.method=="POST"){
        response.end('Hola Mundo!, usando el metodo POST');
    }
})

const puerto = 8080

const connectedServer = server.listen(puerto,()=>{
    console.log(`Servidor escuchando por puerto ${puerto}`);
})

