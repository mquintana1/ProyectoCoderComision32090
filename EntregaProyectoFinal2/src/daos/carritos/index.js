import config from '../../../config.js'
import mongoose from 'mongoose';

let carritosDao

switch (config.env) {
    case 'firebase':
        const { default: FirebaseCartsDAO } = await import('./firebaseCartsDao.js')
        carritosDao = new FirebaseCartsDAO('carritos', config.firebase)
        break
    case 'mongodb':
        const { default: MongoCartsDAO } = await import('./mongoCartsDao.js')
        carritosDao = new MongoCartsDAO(
            'carritos',
            new mongoose.Schema({
              id: Number,
              productos: Array,
            }))
        break
    default:
        const { default: ContainerCartsDAO } = await import('./containerCartsDao.js')
        carritosDao = new ContainerCartsDAO()
        break
}

export { carritosDao }