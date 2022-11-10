import express from 'express';
import session from 'express-session'


import { sessionConfig } from './config.js';
import { root } from './src/routes/root.js';

export const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session(sessionConfig))
app.use('/', root)
app.set('views', 'public/views');
app.set('view engine', 'ejs');