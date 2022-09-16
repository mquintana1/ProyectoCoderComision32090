const Contenedor = require("./Contenedor.js");
const options = require("./options/sqlite3.js");

const sqlite3 = new Contenedor(options);

module.exports = { sqlite3 };