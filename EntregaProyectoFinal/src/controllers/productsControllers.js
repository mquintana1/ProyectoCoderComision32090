import { products } from "../../../containers/containers.js";
import isAdmin from "../../isAdmin/index.js";

const del = async (req, res) => {
    if (isAdmin) {
      try {
        const isDeleted = await products.deleteById(req.params.id);
        isDeleted ? res.json({status: `200 OK`, desc: `Producto eliminado exitosamente`}) : res.json({error: 404, desc: `Ups! No encontramos el producto que busca eliminar...`});
      } catch (error) {
        console.error(error);
      }
    } else {
      res.json({ error: `403 Forbidden`, desc: `No tiene los permisos sufiecientes para ejecutar esta acción` });
    }
  }

const getAllProducts = async (req, res, next) => {
    try {
      const data = await products.getAll();
      res.json(data);
    } catch (err) {
      console.error(err);
    }
 }

 const getById = async (req, res) => {
    try {
      const item = await products.getById(req.params.id);
      item ? res.json(item) : res.json({error: `404 Not Found`, desc: `Ups! No encontramos la producto que buscas...`});
    } catch (err) {
      console.error(err);
    }
  }


  const post = async (req, res) => {
    const TITLE = req.body.nombre;
    const DESCRIPTION = req.body.descripcion;
    const URL_IMG = req.body.foto;
    const PRICE = req.body.precio;
    if (isAdmin) {
      try {
        products.save(TITLE, DESCRIPTION, URL_IMG, PRICE);
        res.json({ status: `200 OK`, desc: `Producto creado exitosamente =)` });
      } catch (err) {
        console.error(err);
      }
    } else {
      res.json({ error: `403 Forbidden`, desc: `POST reservado para admins` });
    }
  }

  const  put = async (req, res) => {
    const ID = req.params.id;
    const NOMBRE = req.body.nombre;
    const DESCRIPTION = req.body.descripcion;
    const URL_IMG = req.body.foto;
    const PRICE = req.body.precio;
    const STOCK = req.body.stock;
  
    if (isAdmin) {
      try {
        const update = await products.updateProduct(ID, NOMBRE, DESCRIPTION, URL_IMG, PRICE, STOCK);
        update ? res.json({status:`200 OK`, desc: `Producto modificado exitosamente =)`}) : res.json({error: `404 Not Found`, desc: `Ups! No encontramos el producto a modificar =O`});
      } catch (err) {
        console.error(err);
      }
    } else {
      res.json({ error: `403 Forbidden`, desc: `PUT reservado para admins` });
    }
  }

  export { put, post, getById, getAllProducts, del };