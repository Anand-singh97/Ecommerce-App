const express = require('express');
const {addProduct, removeProduct, getAllProducts} = require('../Model/dataOperations');
const singleUpload = require('../multer');
const getDataUri = require('../dataUri');
const cloudinary = require('cloudinary').v2;

const productRouter = express.Router();

productRouter.post('/addProduct', singleUpload, async(req, res)=>{
    
    const {name, category, new_price, old_price} = req.body;
    const file = req.file;
    const fileUri = getDataUri(file);
    const myCloud = await cloudinary.uploader.upload(fileUri.content);
    const newPath = { public_id: myCloud.public_id, secure_url: myCloud.secure_url };
    const response = await addProduct(name, newPath, category, new_price, old_price);

    if(response.success)
    {
        res.status(200).json({success:true, name:name});
    }
    else
    {
        res.status(500).json({success:false, message:response.message})
    }
});

productRouter.post('/removeProduct', async (req, res)=>{
    const {id, name} = req.body;
    console.log(id, name);
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

productRouter.get('/allProducts', async (req, res)=>{

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


productRouter.get('/newProducts', async(req, res)=>{

    const response = await getAllProducts();
    if(response.success)
    {   
        const {result} = response;
        const newCollection = result.slice(-8);
        res.status(200).json({success:true, result:newCollection});
    }
    else
    {
        res.status(500).json({success:false, message:response.message});
    }
})

module.exports = productRouter;