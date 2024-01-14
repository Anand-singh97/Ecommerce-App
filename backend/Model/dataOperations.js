const {productModel} = require('./product.model');


async function addProduct(name, newPath, category, new_price, old_price)
{
    let ProductData = await productModel.find({});
    let id = 37;
    if(ProductData.length > 0)
    {
        let last_product_array = ProductData.slice(-1);
        let lastProduct = last_product_array[0];
        id = lastProduct.productId + 1;
    }
    try
    {
        await productModel.create({
            productId:id,
            name,
            image:{ id: newPath.public_id, url: newPath.secure_url },
            category,
            old_price,
            new_price
        });
        return {success:true};
    }
    catch(error)
    {
        return ({success:false, message:error.message});
    }
    
}

async function removeProduct(id)
{
    try
    {
        await productModel.findOneAndDelete({productId:id});
        return {success:true};
    }
    catch(error)
    {
        return ({success:false, message:error.message});
    } 
}

async function getAllProducts()
{
    try
    {
        const products = await productModel.find({});
        return({success:true, result:products});
    }
    catch(error)
    {
        return({success:false, message:error.message});
    }
}

module.exports = {
    addProduct,
    removeProduct,
    getAllProducts
}