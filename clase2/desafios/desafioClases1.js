class Contador {
    static cuentaGlobal=0;
    constructor(responsable){
        this.responsable=responsable;
        this.cuentaIndividual=0;
    }
    obtenerResponsable(){
        return this.responsable
    }
    obtenerCuentaIndividual(){
        return this.cuentaIndividual
    }
    obtenerCuentaGlobal(){
        return Contador.cuentaGlobal;
    }
    contar(){
    this.cuentaIndividual ++
    Contador.cuentaGlobal ++
    }
}

const persona1 = new Contador("Jose")
const persona2 = new Contador("Pepe")

persona1.contar()
persona1.contar()

persona2.contar()
persona2.contar()
persona2.contar()
persona2.contar()

console.log(`persona1 individual : ${persona1.obtenerCuentaIndividual}`);
console.log(`persona1 global : ${persona1.obtenerCuentaGlobal}`);

console.log(`persona2 individual : ${persona2.obtenerCuentaIndividual}`);
console.log(`persona2 global : ${persona2.obtenerCuentaGlobal}`);