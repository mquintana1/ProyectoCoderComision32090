import { Router } from 'express';

import { auth } from '../middlewares/auth.js';

export const root = new Router();

root.get('/', auth, (req, res) => {
  res.render('home', { name: req.session.name });
});

root.get('/login', (req, res) => {
  res.render('login');
});

root.post('/login', (req, res) => {
  req.session.name = req.body.name;
  res.redirect('/');
});

root.get('/logout', (req, res) => {
  const nombre = req.session.name;
  if (!nombre) res.redirect('login');
  else {
    req.session.destroy((err) => {
      if (!err) res.render('logout', { name: nombre });
      else res.send({ status: 'Logout ERROR', body: err });
    });
  }
});