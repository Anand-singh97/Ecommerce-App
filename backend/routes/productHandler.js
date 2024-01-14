const express = require('express');
const {addProduct, removeProduct, getAllProducts} = require('../Model/dataOperations');


const addProductRouter = express.Router();

addProductRouter.post('/addProduct', async(req, res)=>{

    const {name, image, category, new_price, old_price} = req.body;

    const response = await addProduct(name, image, category, new_price, old_price);
    if(response.success)
    {
        res.status(200).json({success:true, name:name});
    }
    else
    {
        res.status(500).json({success:false, message:response.message})
    }
});

addProductRouter.post('/removeProduct', async (req, res)=>{
    const {id, name} = req.body;
    const response = await removeProduct(id);
    if(response.success)
    {
        res.status(200).json({success:true, name:name});
    }
    else
    {
        res.status(500).json({success:false, message:response.message});
    }
});

addProductRouter.get('/allProducts', async (req, res)=>{

    const response = await getAllProducts();
    if(response.success)
    {   
        res.status(200).json({success:true, result:response.result});
    }
    else
    {
        res.status(500).json({success:false, message:response.message});
    }
})

module.exports = addProductRouter;