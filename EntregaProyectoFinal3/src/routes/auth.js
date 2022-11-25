import { Router } from 'express';
import passport from 'passport';
import {passportCall} from "../helpers/middlewares.js";
import { login, register, currentUser, logout } from '../controllers/auth.js';

const APIAuth = Router();

// Facebook Auth
APIAuth.get('/facebook', passport.authenticate('facebook', { scope: ['public_profile'] }))
APIAuth.get('/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/auth/error',
    successRedirect: '/',
}))

APIAuth.post('/register', passportCall('register'), register);
APIAuth.post('/login', passportCall('login'), login);
APIAuth.get('/currentUser', currentUser);
APIAuth.get('/logout', logout);

export default APIAuth;
