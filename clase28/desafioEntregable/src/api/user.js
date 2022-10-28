import users from "../containers/MongodbContainer.js"

export async function ensureUniqueName(username){
      const user = await users.getUserbyUsername(username)
      if (user) throw new Error('NOT_AVAILABLE: Nombre de usuario no disponible. Pruebe con otro usuario.')
}