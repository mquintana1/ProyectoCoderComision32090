class Contenedor {
    constructor(config) {
      this.knex = require("knex")(config);
      this.crearTabla();
    }
  
    crearTabla() {
      return this.knex.schema.dropTableIfExists("messages").finally(() => {
        return this.knex.schema.createTable("messages", (table) => {
          table.increments("id").primary();
          table.string("author", 20);
          table.string("text", 50);
          table.string("date", 20);
        });
      });
    }
  
    save(messages) {
      return this.knex("messages").insert(messages);
    }
  
    getAll() {
      return this.knex.select("*").from("messages");
    }
  
    close() {
      this.knex.destroy();
    }
  }
  
  module.exports = Contenedor;