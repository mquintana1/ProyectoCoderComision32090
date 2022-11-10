/**
>> Consigna: 
1) Declarar una clase Usuario

2) Hacer que Usuario cuente con los siguientes atributos:
nombre: String
apellido: String
libros: Object[]
mascotas: String[]

Los valores de los atributos se deberán cargar a través del constructor, al momento de crear las instancias.
*/

class User{
  constructor(name, lastName, books, pets) {
    this.name = name
    this.lastName = lastName
    this.books = books
    this.pets = pets
  }

  getFullName(){
    //retorna el nombre completo del usuario. Utilizar template strings
    return `"${this.name} ${this.lastName}"`
  }

  addPets(petName){
    //Recibe un nombre de mascota y lo agrega al array de mascotas.
    this.pets.push(petName)
    return this.pets
  }

  countPets(){
    //Retorna la cantidad de mascotas que tiene el usuario
    return this.pets.length
    //Se me ocurre que debo contar sobre el arreglo del metodo addPets
  }

  addBooks(name,author){
    //Recibe un string 'nombre' y un string 'autor' y debe agregar un objeto: { nombre: String, autor: String } al array de libros
    const newObj = {
      name:name,
      author:author
    }
    this.books.push(newObj)
    return this.books
  }
  getBookNames(){
    //Retorna un array[] con sólo los nombres del array de libros del usuario.
    return [...this.books].map(name => name.name)
  }
}

const user = new User('Elon', 'Musk', [{name: 'El señor de las moscas',author: 'William Golding'}, {name: 'Fundacion', author: 'Isaac Asimov'}], ['dog', 'cat'])

console.log(user)
console.log(user.getFullName())
console.log(user.addPets('bird'))
console.log(user.countPets())
console.log(user.addBooks('El Cumpleaños Secreto', 'Kate Morton'))
console.log(user.getBookNames())


/**
>> Ejemplos:

countMascotas: Suponiendo que el usuario tiene estas mascotas: ['perro', 'gato'] usuario.countMascotas() debería devolver 2.

getBooks: Suponiendo que el usuario tiene estos libros: [{nombre: 'El señor de las moscas',autor: 'William Golding'}, {nombre: 'Fundacion', autor: 'Isaac Asimov'}] usuario.getBooks() debería devolver ['El señor de las moscas', 'Fundacion'].

getFullName: Suponiendo que el usuario tiene: nombre: 'Elon' y apellido: 'Musk' usuario.getFullName() deberia devolver 'Elon Musk'

*/