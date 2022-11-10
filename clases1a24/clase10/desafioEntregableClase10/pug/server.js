const app = require('./app.js')

const PORT =  process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
  });

server.on('error', (error) => console.error(`Error en Servidor ${error}`));