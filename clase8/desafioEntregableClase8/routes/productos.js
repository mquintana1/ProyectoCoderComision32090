var express = require('express');
var router = express.Router();
const ContenedorMemoria = require('../contenedor/contenedorMemoria')
const data = new ContenedorMemoria();

  //Endpoint que devuelve todos los productos
router.get('/', function(req, res, next) {
  res.send({data:data.getAll()});
});

  //Endpoint que devuelve un productos por su id
router.get('/:id',(req,res)=>{
  let obj =data.getOne(req.params.id)
  if(obj.length==0){
    res.send('El producto solicitado no existe')
  }else{
  res.send({data:obj})
}
})

  //Sirve para cargar un nuevo producto
router.post('/',({body},res)=>{
  data.addOne(body)
  res.send({datos:body})
})

  //Endpoint para modificar un producto buscando por ID
router.put('/:id',(req,res)=>{
  let id = req.params.id;
  res.send({datos:req.body})
})

  //Elimina un producto según id
router.delete('/:id',(req,res)=>{
  let newData= data.deleteOne(req.params.id)
  res.send({datos:newData})
})

module.exports = router;