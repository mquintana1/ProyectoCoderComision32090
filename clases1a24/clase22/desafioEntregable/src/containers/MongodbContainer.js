import mongoose from 'mongoose';
import mongoDBConection from '../../config.js';

await mongoose.connect(mongoDBConection);

class MongoContainer {
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

export const messages = new MongoContainer('messages', {
  id: String,
  author: Object,
  text: String,
});

export const products = new MongoContainer('products', {
  title: String,
  price: String ,
  thumbnail: String,
});
