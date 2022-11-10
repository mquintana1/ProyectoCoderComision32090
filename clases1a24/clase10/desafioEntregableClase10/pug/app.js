const express = require('express');

const app = express();

const route = require('./src/routes/routeProducts.js')

app.set('views', './views');
app.set('view engine', '.pug');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', route)



module.exports = app