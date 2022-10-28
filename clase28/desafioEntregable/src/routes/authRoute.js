import { Router } from 'express';
import { isLogedIn } from '../middlewares/auth.js';

import {
  failLoginController,
  loginController,
  logoutController,
  failRegisterController,
  registroController,
  successLoginController,
  successRegisterController,
  getLoginController,
  getResgiterControler,
} from '../controllers/authController.js';

export const authRouter = new Router();

// registro
authRouter.get('/register', isLogedIn, getResgiterControler)
authRouter.post('/register', registroController);
authRouter.get('/successRegister', successRegisterController);
authRouter.get('/failRegister', failRegisterController);

// login
authRouter.get('/login', isLogedIn , getLoginController);
authRouter.post('/login', loginController);
authRouter.get('/successLogin', successLoginController);
authRouter.get('/failLogin', failLoginController);

// logout
authRouter.get('/logout', logoutController);