import { MongoClient } from 'mongodb';

import mongoConectionStr from '../../config.js';


class MongodbContainer {
  constructor(uri, db, collection) {
    this.client = new MongoClient(uri)
    this.db = this.client.db(db)
    this.collection = this.db.collection(collection)
    this.options = {projection: { _id: 0, __v: 0}}
  };
  async getAll() {
    try {
      return await this.collection.find({}, this.options).toArray()
    } catch (error) {
      throw new Error(error)
    }
  };
  async getUserbyUsername(username){
    try {
      const user = await this.collection.findOne({username}, this.options)
      if (!user) return null
      return user
    } catch (error) {
      console.log(error)
    }
  }
  
  async getUserbyId(id){
    try {
      const user = await this.collection.findOne({id}, this.options)
      if (!user) throw new Error('NOT_FOUND: Los datos ingresados son incorrectos. Favor intente nuevamente.')
      return user
    } catch (error) {
      console.log(error)
    }
  }
  async save(obj) {
    try{
      const allObjs = await this.getAll()
      const id = !allObjs.length ? 1 : parseInt(allObjs[allObjs.length - 1].id) + 1
      if (isNaN(id)) throw new Error('ID_ERR: No se pudo asignar id al documento. Favor contactese con soporte a support@ecommerce.com')
      obj.id = id.toString()
      await this.collection.insertOne(obj);
    }catch(error){
      console.log(error)
    }
  };
};

const users = new MongodbContainer(mongoConectionStr, 'ecommerce', 'users')
export const products = new MongodbContainer(mongoConectionStr, 'ecommerce', 'products')
export const messages = new MongodbContainer(mongoConectionStr, 'ecommerce', 'messages')



export default users