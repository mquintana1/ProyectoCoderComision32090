const socket = io.connect();

const render=(data)=>{
    const html = data.map((elem,index)=>{
        return(
            `<div>
            <strong>${elem.author}</strong>:
            <em>${elem.text}</em>
            </div>`)
    }).join(" ")
    document.getElementById("mensajes").innerHTML=html;
}
const agregarMensaje=(e)=>{
    const mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };
    socket.emit('nuevoMensaje',mensaje);
    return false;
}
socket.on('mensajes',(data)=>{render(data)})
