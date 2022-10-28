import passport from 'passport';

export const registroController = passport.authenticate('registro', {
  successRedirect: '/auth/successRegister',
  failureRedirect: '/auth/failRegister',
});

export const loginController = passport.authenticate('login', {
  successRedirect: '/auth/successLogin',
  failureRedirect: '/auth/failLogin',
});

export function successRegisterController(req, res) {
  res.redirect('/');
}

export function failRegisterController(req, res) {
  res.render('failRegister');
}

export function successLoginController(req, res) {
  res.redirect('/');
}

export function failLoginController(req, res) {
  res.render('failLogin');
}

export function logoutController(req, res) {
  const username = req.user.username;
  if (req.isAuthenticated()) {
    req.logout((err) => {
      res.render('logout', { name: username });
    });
  } else {
    res.redirect('/');
  }
}

export function getLoginController(req, res) {
  res.render('login');
}

export function getResgiterControler(req, res) {
  res.render('register');
}