export const getHome = (req, res) => {
    res.render('home', { name: req.user.username });
  };