const jwt = require('jsonwebtoken');

async function validateUser(req, res, next)
{
    const token = req.header('auth-token');
    if(!token)
    {
        res.status(400).json({success:false, message:'Invalid User'});
    }
    else
    {
        try
        {
            const data = jwt.verify(token, process.env.JWT_SECRET);
            req.user = data.id;
            next();
        }
        catch(error)
        {
            console.log(`Error validating user: `, error);
            res.status(500).json({success:false, message:'Server error'});
        }   
    }
}

module.exports = {
    validateUser
}