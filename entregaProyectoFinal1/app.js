import express from 'express'

import { productsApi, cartsApi } from './src/routes/index.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', productsApi);
app.use('/api/carritos', cartsApi)
app.get('/', (req, res)=>{
  res.redirect('/api/productos')
})
app.all('*', (req, res) => {
  res.json({error: `404 Not Found`, desc: `Lo sentimos! No encontramos resultados para tu busqueda`})
})


export default app