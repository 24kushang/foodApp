const express = require('express');
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken');
const { sendMail } = require('../utility/nodemailer');
const JWT_KEY = "l4j5jnaoi452hj"

// signup function
module.exports.signupForm = function signupForm(req, res){
    try{
        res.sendFile('C:\\Users\\kusha\\New folder (2)\\pepcoding\\foodApp\\html\\signup.html')
    }
    catch(err){
        console.log(err.message)
    }
}

module.exports.signup = async function signup(req, res) {
    try {
        let dataObj = req.body;
        console.log(dataObj);
        let newUser = await userModel.create(dataObj)
        console.log(newUser);
        sendMail("signup", newUser)

        if (newUser) {
            console.log(newUser);
            res.send("<h1>Hello world</h1>")
        }
        else {
            res.json({
                message: "Error while signing up"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

// login function
module.exports.login = async function Login(req, res) {
    try {
        let data = req.body
        if (data.email) {
            let user = await userModel.findOne({ email: data.email })
            if (user) {
                if (data.password == user.password) {
                    let uid = user['_id']
                    let token = jwt.sign({ payload: uid }, JWT_KEY)
                    res.cookie("login", token)
                    return res.json({
                        message: "User Logged in successfully",
                        userDetails: user
                    })
                } else {
                    return res.json({
                        message: "Incorrect Password"
                    })
                }
            } else {
                return res.json({
                    message: "User not found"
                })
            }
        } else {
            return res.json({
                message: "Empty Fields found"
            })
        }
    }
    catch (e) {
        return res.status(500).json({
            message: e.message
        })
    }
}

// isAuthorized function => to check the users role from ['admin', 'user', 'restaurantowner', 'deliveryboy']

module.exports.isAuthorized = function isAuthorized(roles) {
    return function (req, res, next) {
        if (roles.includes(req.role) == true) {
            next()
        }
        else {
            res.json({
                message: "Operations not allowed"
            })
        }
    }
}

// protectRoute

module.exports.protectRoute = async function protectRoute(req, res, next) {
    try {
        let token
        if (req.cookies.login) {
            // console.log(req.cookies);
            token = req.cookies.login
            let payload = jwt.verify(req.cookies.login, JWT_KEY)
            if (payload) {
                const user = await userModel.findById(payload.payload)
                req.role = user.role
                req.id = user.id
                // console.log(payload.payload)
                // console.log(user);
                next();
            } else {
                return res.json({
                    message: "Firse login kare"
                })
            }
        } 
        else {
            return res.json({
                message: "Login toh karle mere bhai"
            })
        }
    }
    catch (err) {
        return res.json({
            message: err.message
        })
    }
    // console.log(req.cookies);
    // next();
}

module.exports.forgetpassword = async function forgetpassword (req, res){
    let{email} = req.body
    try{
        const user = await userModel.findOne({email:email})
        if (user){
            // createResetToken is used to create a new token
            const resetToken = user.createResetToken();

            // http://abc.com/resetpassword/resetToken
            let resetPasswordLink = `${req.protocol}://${req.get('host')}/resetpassword/${resetToken}`
            // send email to the user
            let obj = {
                resetPasswordLink: resetPasswordLink,
                email: email
            }
            sendMail("resetpassword", obj)
            // nodemailer
        } else {
            return res.json({
                message: "Please signup"
            })
        }
    }
    catch(err){
        res.status(500).json({
            err: err.message
        })
    }
}

module.exports.resetpassword = async function resetpassword (req, res){
    try{
        const token = req.params.token
        let {password, confirmPassword} = req.body
        const user = await userModel.findOne({resetToken: token})

        if (user){
            // resetPasswordHandler will update user's password in db
            user.resetPasswordHandler(password, confirmPassword)
            await user.save()
            res.json({
                message: "password changed successfully"
            })
        } else {
            res.json({
                message: "User not found"
            })
        }
    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
    }

}

module.exports.logout = function logout(req, res){
    try{
        res.cookie('login', " ", {maxAge: 1})
        // Browser
        const client = req.get('User-agent')
        if(client.includes('Mozzila') == true){
            return res.redirect('/login')
        }

        // Postman
        res.json({
            message: "Logout successful"
        })
    }
    catch(err){
        res.json({
            error: err.message
        })
    }
}