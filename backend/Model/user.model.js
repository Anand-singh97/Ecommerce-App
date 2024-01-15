const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    cartData:{
        type:Object
    },
    date:{
        type:Date,
        default:Date.now()
    }
});
const userProfileModel = mongoose.model('userProfile', userSchema);

module.exports = {userProfileModel};