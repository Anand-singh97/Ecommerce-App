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

async function updateProduct(
  productId,
  name,
  newPath,
  category,
  new_price,
  old_price
) {
  try {
    const product = await productModel.findOne({ productId });

    if (product) {
      await productModel.updateOne(
        { productId },
        {
          name,
          image:
            newPath != null
              ? { id: newPath.public_id, url: newPath.secure_url }
              : product.image,
          category,
          old_price,
          new_price,
        }
      );
      return { success: true };
    } else {
      return { success: false, message: "Product not found" };
    }
  } catch (error) {
    return { success: false, message: error };
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

async function getSingleProduct(productId) {
  try {
    const product = await productModel.findOne({ productId });
    if (product) {
      return { success: true, result: product };
    } else {
      return { success: false, message: "No product found" };
    }
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
      const data = { id: newUser._id };
      return { success: true, result: data, name: name };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

async function getUserData(id) {
  try {
    const user = await userProfileModel.findById(id);
    if (user) {
      const data = {
        name: user.name,
        email: user.email,
        image: user.image,
      };
      return { success: true, result: data };
    } else {
      console.log("user not found");
      return { success: false, message: "User not found" };
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: error };
  }
}

async function updateUserData(name, email, password, userId) {

  try {

    const user = await userProfileModel.findById(userId);

    if (user) {
      await userProfileModel.updateOne(
        { _id:userId },
        {
          name,
          email,
          password: password ? password : user.password
        }
      );
      return { success: true };
    } else {
      return { success: false, message: "user not found" };
    }
  } catch (error) {
    return { success: false, message: error };
  }
}

async function checkUser(email) {
  try {
    const user = await userProfileModel.findOne({ email: email });
    if (user) {
      const data = { id: user._id };
      return {
        success: true,
        result: user.password,
        data: data,
        name: user.name,
      };
    } else {
      return { success: false, message: "Invalid Credentials" };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
}

async function updateCart(userId, productId, requestType) {
  let userData = await userProfileModel.findOne({ _id: userId });
  if (userData) {
    try {
      if (requestType === "add") {
        userData.cartData[productId] += 1;
      } else if (requestType === "remove") {
        if (userData.cartData[productId] > 0) {
          userData.cartData[productId] -= 1;
        }
      } else {
        return { success: false, message: "invalid request" };
      }
      await userProfileModel.updateOne(
        { _id: userId },
        { cartData: userData.cartData }
      );
      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false, message: "Server error" };
    }
  } else {
    return { success: true, message: "invalid user" };
  }
}

async function getCartData(userId) {
  try {
    const userData = await userProfileModel.findOne({ _id: userId });
    if (userData) {
      const cartData = userData.cartData;
      return { success: true, result: cartData };
    } else {
      return { success: false, message: "Server Error" };
    }
  } catch (error) {
    return { success: false, message: "Server Error" };
  }
}

async function getReviews(productId) {
  try {
    const product = await productModel
      .findOne({ productId })
      .populate({ path: "reviews.userId", select: "name" })
      .exec();

    if (product) {
      return { success: true, result: product.reviews };
    } else {
      return { success: false, message: "Product not found" };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: "Server Error" };
  }
}

async function addReview(productId, userId, comment) {
  try {
    const product = await productModel.findOne({ productId });
    if (product) {
      product.reviews.push({ userId: userId, comment: comment });
      await productModel.updateOne(
        { productId: productId },
        { reviews: product.reviews }
      );
      return { success: true };
    } else {
      console.log("Product does not exist");
      return { success: false };
    }
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}

module.exports = {
  addProduct,
  removeProduct,
  getAllProducts,
  addUser,
  checkUser,
  updateCart,
  getCartData,
  getReviews,
  addReview,
  getSingleProduct,
  updateProduct,
  getUserData,
  updateUserData,
};
