const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    productId:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    image:{
        id:{type:String},
        url:{type:String}
    },
    category:{
        type:String,
        required:true
    },
    new_price:{
        type:Number,
        required:true
    },
    old_price:{
        type:Number,
        requited:true
    },
    date:{
        type: Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true
    }
});

const productModel = mongoose.model('product', productSchema);

module.exports = {
    productModel
};