const { Router } = require("express");
const router = Router();

const { mariadb } = require("../../ContenedorMariaDB/mariadb");

router.get("/", (req, res) => {
  res.render("form.handlebars", { products: mariadb.getAll() });
});

router.get("/productos", (req, res) => {
  res.render("products.handlebars", { products: mariadb.getAll() });
});

router.post("/productos", (req, res) => {
  mariadb.save(req.body);
  res.redirect("/productos");
});

module.exports = router;