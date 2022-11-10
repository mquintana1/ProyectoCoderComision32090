const express = require('express');

const app = express();

const router = require('./src/routes/routeProducts.js');


app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use('/', router)

module.exports = app