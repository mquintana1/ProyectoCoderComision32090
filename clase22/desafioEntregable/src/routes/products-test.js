import Router from 'express';

import generateProduct from '../fakerProducts/fakerProducts.js';
const productsTest = new Router


productsTest.get('/', (req, res)=>{
    const productsToShow = []
    for (let i = 0; i <= 4; i++){
        productsToShow.push(generateProduct())
    }
    console.log(productsToShow)
    res.render('products-test.ejs', {products: productsToShow})
})

export default productsTest