const { productModel } = require("./product.model");
const { userProfileModel } = require("./user.model");

//Product Operations:
async function addProduct(name, newPath, category, new_price, old_price) {
  let ProductData = await productModel.find({});
  let id = 1;
  if (ProductData.length > 0) {
    let last_product_array = ProductData.slice(-1);
    let lastProduct = last_product_array[0];
    id = lastProduct.productId + 1;
  }
  try {
    await productModel.create({
      productId: id,
      name,
      image: { id: newPath.public_id, url: newPath.secure_url },
      category,
      old_price,
      new_price,
    });
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

async function removeProduct(id) {
  console.log("method");
  try {
    await productModel.findOneAndDelete({ productId: id });
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

async function getAllProducts() {
  try {
    const products = await productModel.find({});
    return { success: true, result: products };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

//User Operations:
async function addUser(name, email, password) {
  const user = await userProfileModel.findOne({ email: email });

  if (user) {
    return { success: false, message: "user already exists" };
  } else {
    try {
      const cartData = {};
      for (let i = 1; i < 300; i++) {
        cartData[i] = 0;
      }
      const newUser = await userProfileModel.create({
        name,
        email,
        password,
        cartData,
      });
      const data = {id:newUser._id};
      return { success: true, result:data, name:name };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

async function checkUser(email)
{
    try
    {
        const user = await userProfileModel.findOne({email:email});
        if(user)
        {
            const data = {id:user._id};
            return {success:true, result:user.password, data:data, name:user.name}
        }
        else
        {
            return {success:false, message:'Invalid Credentials'}
        }
    }
    catch(error)
    {
        return {success:false, message:error.message}
    }
    
}

module.exports = {
  addProduct,
  removeProduct,
  getAllProducts,
  addUser,
  checkUser
};
