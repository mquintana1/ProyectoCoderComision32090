const Contenedor = require("./Contenedor.js");
const options = require("./options/mariaDB.js");

const mariadb = new Contenedor(options);

module.exports = { mariadb };