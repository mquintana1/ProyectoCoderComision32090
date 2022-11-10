function sumar (a,b) {
    return a+b;
//todo parametro por debajo del return no se ejecutara
    console.log("hola")

}

console.log(sumar(2+3));
//cuando envio un int + un string concatena los valores 
console.log(sumar(2+'Hola'));

//funciones flechas o arrow functions. 
// Si tiene 1 sola variable no son necesarios los parentesis

const restar=(a,b)=>{
    return a-b
};
console.log(restar(5,3))

//asignacion de funcion a una variable

const saludo=(nombre)=>`Hola, ${nombre}`
console.log(saludo("jose"));

//funciones con return implicito

const promediar=(a,b)=> (a+b) /2;

let num = 12
let num2 = 14
let promedio= promediar(num,num2)

console.log(`El promedio de los numeros ${num} y ${num2} es igual a ${promedio}`)

//cuando tiene varias instrucciones

const resta=(a,b)=>{
    let result = a-b;
    return `la resta de ${a} - ${b} es igual a ${result}`
}

/*callbacks: Son funciones que se envian como argumento a otra funcion
La intencion es que la funcion que hace de receptora ejecute la funcion que se le esta pasando como parametro
El callBack siempre es el ultimo parametro
- Suele ser una funcion que recibe 2 parametros o mas
*/

function escribirYLoguear(texto,callBackParaLoguear){
    console.log(texto);
    callBackParaLoguear('archivo escrito con exito!')
}

escribirYLoguear('Hola mundo de los callbacks!', (mensajeParaLoguear)=>{
    const fecha = new Date().toLocaleDateString();
    console.log(`${fecha}: ${mensajeParaLoguear}`)
})


/* Callback anidado
se utilizan para realizar operaciones anidadas 
en base al resultado de la primera funcion*/

//Promesas

function dividir(dividiendo,divisor){
    return new Promise((resolve,reject)=>{
        if (divisor == 0){
            reject('No se puede dividir por cero')
        }else{
            resolve(dividiendo/divisor)
        }
        })
}
        dividir(10,2)
        .then(resultado=>{
            console.log(`resultado: ${resultado}`);
        })
        .catch(error=>console.log(`error: ${error}`))

// Encadenamiento de promesas
// una promesa 

Promise.resolve(20)
.then (x=> x + 1)
.then (x=> x * 2)
.then (x=> {
    if(x == 22) throw 'error'
    else return 80 //dato sin sentido por que lo pisa el siguiente then
})
.then (x=>30)
.then (x=>x/2)
.then (console.log)
.catch(console.log)

// cuando es reject saltea todos los then y pasa al ultimo paso de promise
Promise.reject(20)
.then (x=> x + 1)
.then (x=> x * 2)
.then (x=> {
    if(x == 22) throw 'error'
    else return 80 //dato sin sentido por que lo pisa el siguiente then
})
.then (x=>30)
.then (x=>x/2)
.then (console.log)
.catch(console.log)

// Ejemplo sincronico (bloqueante) de funcion. Comienza a ejecutar una funcion dentro de otra sin antes terminar la interior

function funA (){
    console.log(1);
    funB();
    console.log(2)
}
function funB(){
    console.log(3);
    funC();
    console.log(4);
}

function funC(){
    console.log(5);
}

//Timers

/*setTimeout es funcion nativa. Recibe un callBack despues del tiempo establecido
setInterval es nativa. Recibe un callBack despues del tiempo establecido pero no finaliza. Solo finaliza utilizando
clearInterval para finalizar la misma.
*/
setTimeout(()=>{
    console.log('Hola ');
},1000)
let contador =0;
let time =setInterval(() => {
    contador++;
    console.log(contador);
    if(contador==5){
        clearInterval(time)
    }
}, 1000);
