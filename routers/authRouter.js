const express = require('express');
const authRouter = express.Router()
// const cookieParser = require('cookie-parser')
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const JWT_KEY = "l4j5jnaoi452hj"

authRouter
    .route('/auth/signup')
    .get(getSignup)
    .post(postSignup)

authRouter
    .route('/auth/login')
    .post(postLogin)

function getSignup(req, res) {
    res.sendFile("./html/signup.html", { root: __dirname })
}

async function postSignup(req, res) {
    let dataObj = req.body;
    let newUser = await userModel.create(dataObj)

    console.log(newUser);
    res.send("<h1>Hello world</h1>")
}

async function postLogin(req, res) {
    try {
        let data = req.body
        if (data.email) {
            let user = await userModel.findOne({ email: data.email })
            if (user) {
                if (data.password == user.password) {
                    let uid = user['_id']
                    let token = jwt.sign({payload: uid}, JWT_KEY)
                    res.cookie("login", token)
                    return res.json({
                        message: "User Logged in successfully",
                        userDetails: data
                    })
                } else {
                    return res.json({
                        message: "incorrect Password"
                    })
                }
            } else {
                return res.json({
                    message: "User not found"
                })
            }
        } else{
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

module.exports = authRouter