class Usuario{
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    //retorna el nombre y apellido del usuario creado
getFullName(){
    return `Nombre y Apellido: ${this.nombre}, ${this.apellido}`;
}

    //recibe el nombre de una mascota nuevo y lo agrega al array de mascotas
addMascotas(nombreMascota){
this.mascotas.push(nombreMascota)
console.log(`Se agregaron las siguientes mascotas: ${nombreMascota}`)
return this.mascotas
}

    //retorna la cantidad de mascotas del usuario
countMascotas(){
    return this.mascotas.length
}

//recibe 2 string 'nombre' y 'autor' y agrega 1 objeto al array "libros"
addBooks(nombre,autor){
    const nuevoLibro = {
        nombre:nombre,
        autor:autor
    }
    this.libros.push(nuevoLibro)
    console.log(`Se agregaron los siguientes libros: ${nuevoLibro.nombre}, ${nuevoLibro.autor}`)
    return this.libros
}

//retorna el nombre de los libros de un usuario
getBookNames(){
    return [...this.libros].map(nombre => nombre.nombre)
}
}

let persona1 = new Usuario ('Marcelo', 'Perez', [{nombre: 'The lord of the rings',autor: 'John Morris'}, {nombre: 'Origenes', autor: 'Leronardo Di Caprio'}], ['Loro', 'Hamster'] )

console.log(persona1)
console.log(persona1.getFullName())
console.log(persona1.addMascotas('gato'))
console.log(persona1.countMascotas())
console.log(persona1.addBooks('El principito', 'Antoine Exsupery'))
console.log(persona1.getBookNames())
