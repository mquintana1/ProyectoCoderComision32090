import mongoose from 'mongoose';

import config from '../../config.js';

await mongoose.connect(config.mongodb);

export default class MongoContainer {
  constructor(collection, schema) {
    this.collection = mongoose.model(collection, schema);
  }
  
  async getAll() {
    return await this.collection.find({}, { _id: 0, __v: 0 }).lean();
  }

  async save(name, description, image, price) {
    const allProdcts = await this.getAll();
    await this.collection.create({
      id: !allProdcts.length ? 1 : parseInt(allProdcts[allProdcts.length - 1].id) + 1,
      nombre: name || `Puerta`,
      descripcion: description || `Negra`,
      foto: image || `https://http2.mlstatic.com/D_NQ_NP_808325-MLA43791585348_102020-O.jpg`,
      precio: price || 40000,
      stock: 25,
    });
  }


  async getById(i) {
    return await this.collection.findOne({ id: i }, { _id: 0, __v: 0 }).lean();
  }

  async deleteById(id) {
    const toDelete = await this.getById(id)
    if(!toDelete)return false
    await this.collection.deleteOne({ id: id });
    return true
  }

  async updateProduct(id, name, description, image, price, stock) {
    const toUpdate = await this.getById(id);
    if(!toUpdate) return false
    await this.collection.updateOne(
      { id: id },
      {
        $set: {
          id: id,
          nombre: name || toUpdate.nombre,
          descripcion: description || toUpdate.descripcion,
          foto: image || toUpdate.foto,
          precio: price || toUpdate.precio,
          stock: stock || toUpdate.stock,
        },
      }
    );
    return true
  }

  async deleteAll() {
    await this.collection.deleteMany();
  }
  async addNewCart() {
    const allCarts = await this.getAll();
    const cartToCreate = {
      id: !allCarts.length ? 1 : parseInt(allCarts[allCarts.length - 1].id) + 1,
      productos: [],
    }
    await this.collection.create(cartToCreate);
    return cartToCreate.id

  }

  async addToCart(id, idProduct) {
    const productsCollection = mongoose.model('productos')
  
    const productToAdd = await  productsCollection.findOne({ id: idProduct }, { _id: 0, __v: 0 }).lean();

    if(!productToAdd) return 'Lo sentimos! No se encontro el producto solicitado para agregar.'
    const cartToUpdate = await this.getById(id);
    if(!cartToUpdate) return 'Lo sentimos! No encontramos el carrito informado.'
    cartToUpdate.productos.push(productToAdd);

    await this.collection.updateOne(
      { id: id },
      {
        $set: {
          productos: cartToUpdate.productos,
        },
      }
    );
    return true
  }

  async getCartProducts(id) {
    const cartProducts = await this.getById(id);
    return cartProducts.productos;
  }

  async deleteProductFromCart(id, idProduct) {
    const cart = await this.getById(id);
    
    if (!cart) return `Lo sentimos! No encontramos el carrito informado.`;
    const productIndex = cart.productos.findIndex((prod) => prod.id == idProduct);
    if (productIndex > -1) {
      cart.productos = cart.productos.slice(0, productIndex).concat(cart.productos.slice(productIndex + 1));
    } else if (productIndex === -1) return `Lo sentimos! No encontramos el producto en tu carrito.`;

    await this.collection.updateOne(
      { id: id },
      {
        $set: {
          productos: [...cart.productos],
        },
      }
    );
    return true
  }

  async emptyCart(id){
    const cartToEmpty = await this.getById(id)
    if(!cartToEmpty) return 'Lo sentimos! No encontramos el carrito informado.'
    await this.collection.updateOne(
        { id: id },
        {
          $set: {
            productos: [],
          },
        }
      );
      return true
  }
}