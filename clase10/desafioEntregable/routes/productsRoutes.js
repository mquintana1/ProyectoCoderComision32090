const express = require('express')
const router = express.Router();
let id=3;
let listaProductos=[
    {id:1 ,title:"Tv 42 pulgadas", price:59990,img:"https://www.lg.com/ar/images/televisores/42lb5800/gallery/LB5800-750x480.jpg"},
    {id:2 ,title:"Heladera LG", price:267000,img:"https://www.lg.com/ar/images/heladeras/md06231456/gallery/1100_01.jpg"},
    {id:3 ,title:"Lavarropas Drean Next 10.12", price:168000,img:"https://drean.vteximg.com.br/arquivos/ids/155857-1000-1000/7795473027168_1.jpg?v=637594490801770000"}
]

router.get('/mostrarproductos',(req,res)=>{
    res.render('productos',{productos:listaProductos})
})
router.get('/agregarProducto',(req,res)=>{
    res.render('agregarProducto')
})
//ruta parametrizada
router.get('/detalle/:id',(req,res)=>{
    let id = req.params.id;
    let miProducto = listaProductos.filter(p=>p.id == id);
    if(miProducto.length ==0){
        return res.send(`no existe ese producto`)
    }
    res.send(miProducto)
})
router.post('/',(req,res)=>{
    let datos = req.body;
    datos.id=id++;
    listaProductos=[...listaProductos,datos]
    //almacenar los datos
    res.redirect('/productos/agregarProducto');
})
module.exports = router;