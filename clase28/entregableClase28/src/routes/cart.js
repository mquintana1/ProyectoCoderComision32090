import express from "express";
import { CarritoDao } from "../dao/CarritoDao.js";
import { ProductoDao } from "../dao/ProductoDao.js";

const router = express.Router();
const carritoDao = new CarritoDao();

// POST /api/carrito
router.post('/', async (_req, res) => {
    const newCart = await carritoDao.createCart();
    
    newCart
        ? res.status(200).json({"success": "El producto se agrego con el ID " + newCart._id})
        : res.status(500).json({"error": "Lo sentimos, hubo un error"})
    
})

// DELETE /api/carrito/id
router.delete('/:id', async(req,res) => {
    const { id } = req.params;
    const wasDeleted = await carritoDao.deleteCartById(id);
    
    wasDeleted 
        ? res.status(200).json({"success": "El carrito fue removido"})
        : res.status(404).json({"error": "No se encontro el carrito"})
     
})

// POST /api/carrito/:id/productos

router.post('/:id/productos', async(req,res) => {
    const { id } = req.params;
    const { body } = req;
    
    const productExists = await ProductoDao.exists(body.productId);
    
    if(productExists) {
        await carritoDao.saveProductToCart(id, body)
    } else {
        res.status(404).json({"error": "Producto no encontrado"});
    }
    
})

// GET /api/carrito/:id/productos
router.get('/:id/productos', async(req,res)=>{
    const { id } = req.params;
    const cartProducts = await carritoDao.getAllProductsFromCart(id);
    
    cartProducts
        ? res.status(200).json(cartProducts)
        : res.status(404).json({"error": "Carrito no encontrado"})
})


// DELETE /api/carrito/:id/productos/:id_prod
router.delete('/:id/productos/:id_prod', async(req, res) => {
    const {id, id_prod } = req.params;
    
    const wasDeleted = await carritoDao.deleteProductFromCart(id, id_prod);
    
    wasDeleted 
        ? res.status(200).json({"success": "that product is no longer in the cart"})
        : res.status(400).json({"error": "there was some problem"})
    
})

export default router;