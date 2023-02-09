const express = require('express');
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const JWT_KEY = "l4j5jnaoi452hj"

// signup function
module.exports.signup = async function signup(req, res) {
    try {
        let dataObj = req.body;
        let newUser = await userModel.create(dataObj)

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
        if (roles.include(req.roles) == true) {
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
            console.log(req.cookies);
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