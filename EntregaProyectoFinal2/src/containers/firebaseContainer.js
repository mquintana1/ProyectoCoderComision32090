import admin from 'firebase-admin';

import config from '../../config.js';

admin.initializeApp({
  credential: admin.credential.cert(config.firestore),
});

export default class FirebaseContainer {
  constructor(collection, config) {
    (this.config = config), (this.db = admin.firestore()), (this.collection = this.db.collection(collection));
  }

  async getAll() {
    const snapshot = await this.collection.get();
    const show = [];
    snapshot.forEach((doc) => show.push({ id: doc.id, ...doc.data() }));
    return show;
  }
  async save(name, description, image, price) {
    const allProdcts = await this.getAll();
    const id = !allProdcts.length ? 1 : parseInt(allProdcts[allProdcts.length - 1].id) + 1;
    await this.collection.doc(id.toString()).set({
      nombre: name || `Puerta`,
      descripcion: description || `Negra`,
      foto: image || `https://http2.mlstatic.com/D_NQ_NP_808325-MLA43791585348_102020-O.jpg`,
      precio: price || 40000,
      stock: 25,
    });
  }

  async getById(i) {
    const elements = await this.getAll();
    const element = elements.find((elem) => parseInt(elem.id) === parseInt(i));
    return element;
  }

  async deleteById(id) {
    const toDelete = await this.getById(id);
    if (toDelete) {
      await this.collection.doc(id).delete();
      return true;
    } else return false;
  }

  async updateProduct(id, name, description, image, price, stock) {
    const element = await this.getById(id);
    if (element) {
      await this.collection.doc(id.toString()).update({
        nombre: name || element.nombre,
        descripcion: description || element.descripcion,
        foto: image || element.foto,
        precio: price || element.precio,
        stock: stock || element.stock,
      });
      return true;
    } else {
      return false;
    }
  }
  async deleteAll() {
    const elements = await this.getAll();
    elements.forEach((elem) => this.deleteById(elem.id));
  }

  async addNewCart() {
    const allCarts = await this.getAll();
    const id = !allCarts.length ? 1 : parseInt(allCarts[allCarts.length - 1].id) + 1;
    await this.collection.doc(id.toString()).set({ productos: [] });
    return id
  }
  async addToCart(id, idProduct) {
    const productsCollection = this.db.collection('productos');
    const snapshot = await productsCollection.get();
    const allProdcts = [];
    snapshot.forEach((doc) => allProdcts.push({ id: doc.id, ...doc.data() }));

    const productToAdd = allProdcts.find((prod) => prod.id === idProduct);
    if (!productToAdd) return 'Lo sentimos! No se encontro el producto solicitado para agregar.';

    const cart = await this.getById(id);
    if (!cart) return 'Lo sentimos! No encontramos el carrito informado.';

    cart.productos.push(productToAdd);

    this.collection.doc(id.toString()).update({ productos: [...cart.productos] });

    return true;
  }

  async getCartProducts(id) {
    const cart = await this.getById(id);
    return cart ? cart.productos : undefined;
  }
  
  async deleteProductFromCart(id, idProduct) {
    let cartProducts = await this.getCartProducts(id);
    if (!cartProducts) return `Lo sentimos! No encontramos el carrito informado.`;
    const productIndex = cartProducts.findIndex((prod) => prod.id == idProduct);

    if (productIndex > -1) {
      cartProducts = cartProducts.slice(0, productIndex).concat(cartProducts.slice(productIndex + 1));
      this.collection.doc(id.toString()).update({ productos: [...cartProducts] });
      return true;
    } else if (productIndex == -1) {
      return `Lo sentimos! No encontramos el producto en tu carrito.`;
    }
  }

  async emptyCart(id) {
    const cartToEmpty = await this.getById(id);
    if (!cartToEmpty) return 'Lo sentimos! No encontramos el carrito informado.';
    this.collection.doc(id.toString()).update({ productos: [] });
    return true;
  }
}