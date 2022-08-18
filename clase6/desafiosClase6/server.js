const http = require('http')

const getMensaje = ()=>{
    const hora = new Date().getHours()
    if (hora>= 6 && hora <=12){
        return 'Buenos dias';
    } else if (hora>= 13 && hora <=19){
        return 'Buenos tardes';
    } else if (hora>= 20 && hora <=23 || hora>= 0 && hora <=5){
        return 'Buenos noches';
    }
}

const server = http.createServer((request,response)=>{
    if (request.method=="GET"){
        response.end(getMensaje);
    }
})

const puerto = 8080

const connectedServer = server.listen(puerto,()=>{
    console.log(`Servidor escuchando por puerto ${puerto}`);
})
