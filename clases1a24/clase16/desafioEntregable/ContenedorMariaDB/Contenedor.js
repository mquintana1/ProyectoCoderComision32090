class Contenedor {
    constructor(config) {
      this.knex = require("knex")(config);
      this.crearTabla();
    }
  
    crearTabla() {
      return this.knex.schema.dropTableIfExists("products").finally(() => {
        return this.knex.schema.createTable("products", (table) => {
          table.increments("id").primary();
          table.string("title", 50).notNullable();
          table.float("price");
          table.string("thumbnail");
        });
      });
    }
  
    save(products) {
      return this.knex("products").insert(products);
    }
  
    getAll() {
      return this.knex.select("*").from("products");
    }
  
    getById(id) {
      return this.knex("products").select("*").where({ id }).first();
    }
  
    deleteById(id) {
      const products = this.getById(id);
  
      if (Object.entries(products).length < 0) {
        return false;
      }
  
      this.knex("products").where("id", id).del();
  
      return true;
    }
  
    update(obj, id) {
      return this.knex("products").where("id", id).update(obj);
    }
  
    close() {
      this.knex.destroy();
    }
  }
  
  module.exports = Contenedor;