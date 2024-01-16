const express = require('express');
const {validateUser} = require('./middleware');
const {addProduct, removeProduct, getAllProducts, updateCart, getReviews, addReview} = require('../Model/dataOperations');
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

productRouter.get('/popularInWomen', async(req, res)=>{

    const response = await getAllProducts();
    if(response.success)
    {   
        const {result} = response;
        const newCollection = result.filter((item)=>item.category === 'women').slice(-4);
        res.status(200).json({success:true, result:newCollection});
    }
    else
    {
        res.status(500).json({success:false, message:response.message});
    }
})

productRouter.post('/addToCart', validateUser, async(req, res)=>{

    try
    {
        const {productId} = req.body;
        const userId = req.user;
        console.log(productId, userId);
        const response = await updateCart(userId, productId, 'add');
        if(response.success)
        {
            return res.status(200).json({success:true});
        }
        else
        {
            console.log(response.message);
            return res.status(400).json({success:false});
        }
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({success:false, message:'Server error'});
    }
})

productRouter.post('/addReview', validateUser, async (req, res)=>{
    try
    {
        const { productId, comment } = req.body;
        const userId = req.user;
        const response = await addReview(productId, userId, comment);
        if(response.success)
        {
            return res.status(200).json({success:true});
        }
        else
        {
            return res.status(400).json({success:false});
        }
    }
    catch(error)
    {
        return res.status(500).json({success:false});
    }
})

productRouter.post("/getReviews", async (req, res) => {
  const { productId } = req.body;
  const response = await getReviews(productId);
  if(response.success)
  {
    return res.status(200).json({success:true, result:response.result});
  }
  else
  {
    return res.status(400).json({success:false, result:response.message});
  }
});

productRouter.post('/removeFromCart', validateUser, async(req, res)=>{

    try
    {
        const {productId} = req.body;
        const userId = req.user;
        const response = await updateCart(userId, productId, 'remove');
        if(response.success)
        {
            return res.status(200).json({success:true});
        }
        else
        {
            console.log(response.message);
            return res.status(400).json({success:false});
        }
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({success:false, message:'Server error'});
    }
})

module.exports = productRouter;