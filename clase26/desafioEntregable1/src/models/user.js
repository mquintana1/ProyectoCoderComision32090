import bcryptjs from 'bcryptjs';

export function crearUsuario({ username, password}) {
    if (!username) throw new Error(`MISSING_ARGS: el campo 'username' es obligatorio`)
    if (!password) throw new Error(`MISSING_ARGS: el campo 'password' es obligatorio`)

    const encryptedPassword = bcryptjs.hashSync(password, 8)
    console.log(encryptedPassword)
    return {
        username,
        password: encryptedPassword
    }
}