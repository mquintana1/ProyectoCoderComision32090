const {promises:fs} = require('fs')
class Contenedor {
    static newId=0;//contenedor de memoria
    constructor(ruta){
        this.ruta=ruta;
    }
    //Crea un nuevo registro dentro del archivo
    async guardar(obj){
        let objs = await this.capturarTodo();
        if(objs.length == 0){
            Contenedor.newId=1;
        }else{
            Contenedor.newId++;
        }
        obj={id:Date.now(),...obj}//milisegundos 1/01/1971
        // {nombre:"Marcelo",apellido:"Quintana"}
        let datos = [...objs,obj]
        try {
            await fs.writeFile(this.ruta,JSON.stringify(datos,null,2))
        } catch (error) {
            throw new Error(`Error al guardar los datos ${error}`)
        }
    }
    //Devuelve los datos del objeto por busqueda de ID
    async capturarPorId(id){
        let objs = await this.capturarTodo();
        let obj = objs.filter(o=>o.id==id)
        if(obj.length==0){
            return `No se puede obtener el dato con el id: ${id}`
        }
        return obj
    }
    //Devuelve todos los datos escritos en el archivo
    async capturarTodo(){
        try {
            const objs = await fs.readFile(this.ruta)
            return JSON.parse(objs)
        } catch (error) {
            return []
        }
    }
    //Recibe un objeto para modificar algun dato del objeto mediante el id
    async modificarDatos(obj){
        let objs = await this.capturarTodo();
        let index = objs.findIndex(o =>o.id==obj.id);
        objs[index]=obj;
        try {
            await fs.writeFile(this.ruta,JSON.stringify(objs,null,2))
        } catch (error) {
            `No se puede modificar los datos`
        }
    }
    //Elimina un objeto mediante el id
    async eliminarUno(id){
        let objs = await this.capturarTodo();
        let obj = objs.filter(o=>o.id!=id)
        try {
            await fs.writeFile(this.ruta,JSON.stringify(obj,null,2))
        } catch (error) {
            return `No se puede borrar ese registro`
        }
        
    }
    //Elimina todos los objetos del archivo
    async eliminarTodo(){
        try {
            await fs.writeFile(this.ruta,JSON.stringify([],null,2))
        } catch (error) {
            return `No se pueden borrar los datos`
        }
    } 

}

let alumno = new Contenedor('./alumnos.json')