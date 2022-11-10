import Texto from '../src/texto.js'


// si no recibe nada no tiene dato para formatear
function test1(){

    const texto = new Texto('')

const resultado = texto.obtenerFormato()

if ( resultado !== '') throw new Error('string vacio deberia devolver string vacio')
}

// si recibe numero no hace modificaciones dejandolo iguales
function test2(){
    const texto = new Texto(0)

const resultado = texto.obtenerFormato('123')

if ( resultado !== '123') throw new Error('string de numeros deberia quedar igual')
}

// si recibe string modifica
function test3(){
    const texto = new Texto(0)

const resultado = texto.obtenerFormato('abc')

if ( resultado !== 'Abc') throw new Error('la primera deberia ser mayuscula')
}

// si recibe string modifica
function test4(){
    const texto = new Texto(0)

const resultado = texto.obtenerFormato('ABC')

if ( resultado !== 'Abc') throw new Error('la primera deberia ser mayuscula')
}

const tests = [
    test1,
    test2,
    test3,
    test4
]

for(const test of tests){
    test()
}