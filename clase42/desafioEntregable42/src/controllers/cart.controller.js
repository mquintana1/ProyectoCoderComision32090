import {CarritoService} from "../services/carrito.service.js";
import {ProductoService} from "../services/producto.service.js";

const carritoService = new CarritoService();

export async function create(req, res) {
    const newCart = await carritoService.createCart();

    newCart
        ? res.status(200).json({"success": "Producto agregado con el ID " + newCart._id})
        : res.status(500).json({"error": "Lo sentimos, hubo un error!"})
}

export async function remove(req, res) {
    const {id} = req.params;
    const wasDeleted = await carritoService.deleteCartById(id);

    wasDeleted
        ? res.status(200).json({"success": "Carrito eliminado con exito"})
        : res.status(404).json({"error": "Lo sentimos, no se encontro el carrito"})
}

export async function addProduct(req, res) {
    const {id} = req.params;
    const {body} = req;

    const productExists = await ProductoService.exists(body.productId);

    if (productExists) {
        await carritoService.saveProductToCart(id, body)
    } else {
        res.status(404).json({"error": "Producto no encontrado"});
    }
}

export async function getProducts(req, res) {
    const {id} = req.params;
    const cartProducts = await carritoService.getAllProductsFromCart(id);

    cartProducts
        ? res.status(200).json(cartProducts)
        : res.status(404).json({"error": "Carrito no encontrado"})
}

export async function removeProduct(req, res) {
    const {id, id_prod} = req.params;

    const wasDeleted = await carritoService.deleteProductFromCart(id, id_prod);

    wasDeleted
        ? res.status(200).json({"success": "El producto ya no se encuentra en el carrito"})
        : res.status(400).json({"error": "Ups! Hubo un problema"})
}