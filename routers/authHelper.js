const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const JWT_KEY = "l4j5jnaoi452hj"

function protectRoute(req, res, next){
    if(req.cookies.login){
        let isVerified = jwt.verify(req.cookies.login, JWT_KEY)
        if (isVerified){
            next();
        } else {
            return res.json({
                message: "Bro password galt hai"
            })
        }
    } else {
        return res.json({
            message: "You are not Logged in"
        })
    }
    // console.log(req.cookies);
    // next();
}

module.exports = protectRoute