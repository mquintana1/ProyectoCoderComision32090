import express from 'express';
import productsTest from './src/routes/products-test.js';

export const app = express();

app.set('views', '.public/views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/products-test', productsTest)