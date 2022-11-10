const app = require("./app.js");
const PORT = process.env.PORT || 8080;
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const { mariadb } = require("./ContenedorMariaDB/mariadb");
const { sqlite3 } = require("./ContenedorSqlite3/Sqlite3");

const server = httpServer.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.error(`Error en Servidor ${error}`));

server.on("error", (err) => {
  console.log(err);
});

io.on("connection", async (socket) => {
  const products = await mariadb.getAll();
  const messages = await sqlite3.getAll();

  socket.emit("messages", { messages, products });

  socket.on("new-message", async (data) => {
    await sqlite3.save(data);
    let todo = {
      messages: await sqlite3.getAll(),
      products: await mariadb.getAll(),
    };
    io.sockets.emit("messages", todo);
  });

  socket.on("new-product", async (data) => {
    await mariadb.save(data);
    let todo = {
      messages: await sqlite3.getAll(),
      products: await mariadb.getAll(),
    };
    io.sockets.emit("messages", todo);
  });
});