const mostrarLetras =(palabra,termine)=>{
    let inicioContador = 0;
    const timer=setInterval(()=>{
        if (inicioContador < palabra.length){
            console.log(palabra[inicioContador]);
            inicioContador ++;
        }else{
            clearInterval(timer);
            termine()
        }
    },1000)
}

const fin =()=> console.log('termine')

setTimeout(()=>{mostrarLetras('Hola!',fin)},0);
setTimeout(()=>{mostrarLetras('Hola!',fin)},250);
setTimeout(()=>{mostrarLetras('Hola!',fin)},500)