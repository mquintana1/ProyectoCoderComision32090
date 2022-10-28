import { Strategy } from 'passport-local';
import { autenticar } from '../api/authApi.js';
import users from '../containers/MongodbContainer.js';
import { ensureUniqueName } from '../api/user.js';
import { crearUsuario } from '../models/user.js';


export const registroLocal = new Strategy({
    passReqToCallback: true,
},
    async (req, username, password, done) => {
        try {
            await ensureUniqueName(username)
            const usuario = crearUsuario(req.body)
            await users.save(usuario);
            done(null, usuario);
        } catch (error) {
            done(null, false, error);
        }
    });

export const loginLocal = new Strategy(
    async (username, password, done) => {
        try {
            const usuario = await autenticar(username, password);
            done(null, usuario);
        } catch (error) {
            done(null, false, error);
        }
    });