import { Router } from 'express';

import { getHome } from '../controllers/rootController.js';
import { requiereAutenticacion } from '../middlewares/auth.js';

export const root = new Router();

root.get('/', requiereAutenticacion, getHome);