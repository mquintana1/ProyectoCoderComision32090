class Cliente {
    constructor (nombre,apellido,fechaNacimiento){
        this.nombre=nombre;
        this.apellido=apellido;
        this.fechaNacimiento=fechaNacimiento;
    }
    mostrarDatos(){
        return `Nombre: ${this.nombre}, Fecha Nacimiento: ${this.fechaNacimiento}`
    }
}

let persona1 = new Cliente("Jose","Gomez","20/6/2022")

console.log(persona1);

console.log(persona1.nombre,persona1.fechaNacimiento)

console.log(persona1.mostrarDatos())