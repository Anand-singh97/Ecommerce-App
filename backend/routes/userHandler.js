const express = require('express');
const {addUser, checkUser} = require('../Model/dataOperations');
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
                const token = jwt.sign(response.result, process.env.JWT_SECRET);
                return res.json({ success: true, token });
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

module.exports = userRoute;