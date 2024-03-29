const express = require('express');
const {validateUser} = require('./middleware');
const {addUser, checkUser, getCartData, getUserData, updateUserData} = require('../Model/dataOperations');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const userRoute = express.Router();

function hashPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (error, hash) => {
            if (error) {
                reject({ success: false });
            } else {
                resolve({ success: true, hash: hash });
            }
        });
    });
}
function comparePassword(password, hashedPassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hashedPassword, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

userRoute.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const passwordResponse = await hashPassword(password);

        if (passwordResponse.success) {
            const response = await addUser(name, email, passwordResponse.hash);

            if (response.success) {
                const {result, name} = response;
                const token = jwt.sign(result, process.env.JWT_SECRET);
                return res.json({ success: true, token, name});
            } else {
                return res.status(400).json({ success: false, message: response.message });
            }
        }
    } catch (error) {
        console.error('An unexpected error occurred:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

userRoute.post('/login', async (req, res)=>{
    try
    {
        const {email, password } = req.body;
        const response = await checkUser(email);
        if(response.success)
        {
            const {result, data, name} = response;
            const passwordResponse = await comparePassword(password, result)

            if(passwordResponse)
            {
                const token = jwt.sign(data, process.env.JWT_SECRET);
                res.json({success:true, token, name});
            }
            else
            {
                res.json({success:false, message:'Invalid Credentials'});
            }
        }
        else
        {
            return res.status(400).json({ success: false, message: response.message });
        }
    }
    catch(error)
    {
        console.error('An unexpected error occurred:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

userRoute.get('/getUserData', validateUser, async(req, res)=>{
  
    try
    {
        const userId = req.user;
        const response = await getUserData(userId);
        if(response.success)
        { 
            res.status(200).json({success:true, result:response.result});
        }
        else
        {
            res.status(400).json({success:false});
        }
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({success:false});
    }
})

userRoute.post('/updateUserData', validateUser, async (req, res)=>{
    try
    {
        const userId = req.user;
        console.log(req.body);
        const {name, email, password} = req.body;
        console.log(name, email);
        if(password)
        {
            password = await hashPassword(password);
            password = password.hash;
        }
        const response = await updateUserData(name, email, password, userId);
        if(response.success)
        {
            res.status(200).json({success:true});
        }
        else
        {
            console.log(response.message);
            res.status(400).json({success:false});
        }
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({success:false});
    }
})

userRoute.post('/getCartData', validateUser, async (req, res)=>{
    try
    {
        const userId = req.user;
        const response = await getCartData(userId);
        if(response.success)
        {
            return res.status(200).json({success:true, result:response.result});
        }
        else
        {
            return res.status(400).json({success:false, message:'Server Error'});
        }
    }
    catch(error)
    {
        return res.status(500).json({success:false, message:'Server Error'});
    }
})

module.exports = userRoute;