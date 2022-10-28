import MongoStore from 'connect-mongo'
import { config } from 'dotenv';

config()

const mongoUrl = process.env.MONGODB_STRING

export const sessionConfig = {
    store: MongoStore.create({mongoUrl, ttl: 600}),
    secret: process.env.SESSION,
    resave: false,
    saveUninitialized: false,
}

export default mongoUrl