import logger from "../utils/loggers/Log4jsLogger.js";
import "../configs/db.config.js";

export class BaseDao {

    constructor() {
        this.logger = logger;
        if (this.constructor === BaseDao) {
            throw new Error('Class "BaseDao" no puede ser instanciada')
        }
    }

    create() {
        throw new Error('Metodo create() tiene que estar implementado')
    }

    getAll() {
        throw new Error('Metodo getAll() tiene que estar implementado')
    }

    deleteById() {
        throw new Error('Metodo deleteById() tiene que estar implementado')
    }
}