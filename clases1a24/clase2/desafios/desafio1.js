// funciones arrow

const saludo = (nombre) =>{
    return `Hola ${nombre}, como estas?
    Te damos la bienvenida`
}

console.log(saludo('Marcelo'))

function mostrarLista(...lista) {
    if (lista.lenght === 0) {
        console.log('Lista vacia')
    } else {
        console.log(lista)
    };
};

mostrarLista()
mostrarLista([1,2,3])

// spread operator
let alumnos = ["jose","Pedro"]
alumnos.push("Luis");

// Ejercicio 1 - 2 
// funcion anonima definicion () ()

(function mostrarLista(...lista) {
    if (lista.lenght === 0) {
        console.log('Lista vacia')
    } else {
        console.log(lista)
    };
})([1,2,3]);

// Ejercicio 1- 3

function crearMultiplicador (a){
    return a 
    
}
crearMultiplicador (10)

const duplicar=crearMultiplicador(2)
const triplicar=crearMultiplicador(3)