const letras = 'abcdefghijklmnñopqrstuvwxyz'

export default class Texto { 
    constructor(texto){
        this.texto = texto
    }
    
    obtenerFormato() {

        if (this.texto === '') {
        return ''}

        let primeraLetra = this.texto[0]

        if (letras.includes(primeraLetra))
        primeraLetra = primeraLetra.toUpperCase()

        return primeraLetra  + this.texto.slice(1)
}
}