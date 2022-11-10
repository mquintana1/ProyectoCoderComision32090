import express from "express";
const router = express.Router();

router.get('/login', async(req, res) => {
    if (req.session.login) {
        res.redirect('/api/usuario')
    } else {
        res.render('public/views/login', {status: false})
    }
    
})

router.post('/login', async(req, res) => {
    const {user, pass} = req.body;
    // Ugly user and pass validation below:
    if (process.env.DUMMYUSER === user && process.env.DUMMYPASS === pass) {
        req.session.login=true;
        res.redirect('/api/usuario')
    } else {
        req.session.login=false;
        res.redirect('/api/usuario/login')
    }
    
})

router.get('/', async(req, res) => {
    res.render('views/home', {status: req.session.login})
})

router.get('/logout', async(req, res) => {
    req.session.destroy( (err) => {
        if (err) {
            res.json(err);
        } else {
            res.render('views/logout', {status: false});
        }
    })
})

export default router;