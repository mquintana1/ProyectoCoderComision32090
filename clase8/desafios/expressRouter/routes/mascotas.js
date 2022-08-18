var express = require('express');
var router = express.Router();

let mascotas = [];

router.get('/', (req, res)=> {
  res.send(mascotas);
});

router.post('/',(req,res)=>{
  mascotas=[...mascotas,req.body];
  res.send(req.body)
})
module.exports = router;
