import config from '../../../config.js'

let productosDao

switch (config.env) {
    case 'firebase':
        const { default: FirebaseProductosDAO } = await import('./firebaseProductosDao.js')
        productosDao = new FirebaseProductosDAO('carritos', config.firebase)
        break
    case 'mongodb':
        const { default: MongoProductosDAO } = await import('./mongoProductosDao.js')
        productosDao = new MongoProductosDAO(
            'productos',{
                id: Number,
                nombre: String,
                descripcion: String,
                foto: String,
                precio: Number,
                stock: Number,
              });
        break
    default:
        const { default: ContainerProductosDAO } = await import('./containerProductosDao.js')
        productosDao = new ContainerProductosDAO()
        break
}

export { productosDao }