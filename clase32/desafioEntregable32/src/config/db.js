import dotenv from "dotenv";
import mongoose from "mongoose";
import logger from '../loggers/logger.js';


dotenv.config();

mongoose.connect(process.env.MONGO_URI, (err) => {
    err
        ? logger.error("Error al conectarse a MongoDB")
        : logger.info("Conectado a MongoDB")
})

export default mongoose;
