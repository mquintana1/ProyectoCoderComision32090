import mongoose from 'mongoose';
import mongoConectionStr from '../../config.js';

await mongoose.connect(mongoConectionStr);

class MongodbContainer {
  constructor(collection, schema) {
    this.collection = mongoose.model(collection, schema);
  };
  async getAll() {
    return await this.collection.find({}, { _id: 0, __v: 0 }).lean();
  };
  async save(obj) {
    const allObjs = await this.getAll()
    const id = !allObjs.length ? 1 : parseInt(allObjs[allObjs.length - 1].id) + 1
    obj.id = id.toString()
    await this.collection.create(obj);
  };
};

export const messages = new MongodbContainer('messages', {
  id: String,
  author: Object,
  text: String,
});

export const products = new MongodbContainer('products', {
  title: String,
  price: String ,
  thumbnail: String,
});