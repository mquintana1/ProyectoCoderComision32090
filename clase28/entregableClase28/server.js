import express from "express";
import productRouter from './src/routes/product.js';
import cartRouter from './src/routes/cart.js';
import userRouter from './src/routes/user.js';
import otherRouter from './src/routes/other.js';
import session from 'express-session';
import mongoStore from 'connect-mongo';
import minimist from 'minimist';

const app = express();


// ----------- middlewares-------------------

app.use(express.static('public'));
app.set('views', './public/views');
app.set('view engine', 'ejs');


app.use(
    session({
        store: mongoStore.create({
            mongoUrl: process.env.MONGO_URI,
            options: {
                userNewParser: true,
                useUnifiedTopology: true,
            }
        }),
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: {maxAge: 600000} //10 min.
        
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/productos', productRouter);
app.use('/api/carrito', cartRouter);
app.use('/api/usuario', userRouter);
app.use('/test', otherRouter);

/* --------------- Leer el puerto por consola o setear default -------------- */

const options = {
    alias: {
        "p": "PORT"
    },
    default: {
        "PORT": 8080
    }
};

const { PORT } = minimist(process.argv.slice(2), options);

const server = app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
    })
    
server.on('error', (err) => console.log(err));