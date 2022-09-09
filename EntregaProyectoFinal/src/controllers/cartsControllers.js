import { carts } from "../../../containers/containers.js";

const deleteCart = async(req, res)=>{
    const ID = req.params.id
    try {
      const emptyCart = await carts.emptyCart(ID)
      emptyCart === true ? res.json({status: `200 OK`, desc: `El carrito se vacio con exito`}) : res.json({error: `404 Not Found`, desc: emptyCart})
    } catch (error) {
      console.error(error)
    }
  }

  const deleteProductfromCart = async (req, res) => {
    const ID = req.params.id;
    const ID_PRODUCT = req.params.id_prod
    try {
      const cartProducts = await carts.deleteProductFromCart(ID, ID_PRODUCT);
      cartProducts === true ? res.json({status: `200 OK`, desc: `Producto eliminado exitosamente`}) : res.json({error: `404 Not Found`, desc: cartProducts});
    } catch (error) {
      console.error(error);
    }
  }

  const getCartProducts = async (req, res) => {
    const ID = req.params.id;
    try {
      const cartProducts = await carts.getCartProducts(ID);
      cartProducts ? res.json(cartProducts) : res.json({error: `404 Not Found`, desc: `Lo sentimos! No encontramos el carrito solicitado`});
    } catch (error) {
      console.error(error);
    }
  }

const postNewCart = async (req, res) => {
const newCart = await carts.addNewCart();
    res.json(`Carrito creado exitosamente con id: ${newCart}`);
  }

  const postProductToCart = async (req, res) => {
    const ID = req.params.id;
    const ID_PRODUCT = req.body.id_prod;
    const newCart = await carts.addToCart(ID, ID_PRODUCT);
    if (newCart === true) res.json({ status: `200 OK`, desc: `Producto añandido exitosamente a su carrito.` });
    else {
      res.json({ error: '404 Not Found', desc: newCart });
    }
  };
  
  export { deleteProductfromCart, deleteCart, postNewCart, postProductToCart, getCartProducts };
  