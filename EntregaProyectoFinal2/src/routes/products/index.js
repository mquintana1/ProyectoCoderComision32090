import Router from 'express';
import { getAllProducts, getById, post, put, del } from '../../controllers/productsControllers.js';

export const productsApi = new Router();

productsApi.get('/', getAllProducts);
productsApi.get('/:id', getById);
productsApi.post('/', post);
productsApi.put('/:id', put);
productsApi.delete('/:id', del);