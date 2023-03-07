// routes of '/user' 
const express = require('express')
const userModel = require('../models/userModel')


module.exports.getUser = async function getUsers(req, res) {
    //queries
    try {
        let id  = req.id
        console.log(id);
        let user = await userModel.findById(id);
    // res.send("Hello world")
        res.json({
            message: 'Your User Profile is as follows',
            data: user
        })
    }
    catch(err){
        res.json({
            error: err.message
        })
    }
}

// module.exports.postUser = function postUser(req, res) {
//     users = req.body
//     console.log(req.body);
//     res.send("Response recieved successfully")
// }

module.exports.updateUser = async function updateUser(req, res) {
    try {
        let id = req.params.id
        let user = await userModel.findById(id)
        let dataToBeUpdated = req.body
        
        if (user){
            let keys = []
            for (let key in dataToBeUpdated){
                keys.push(key)
            }
            for (let i = 0; i < keys.length; i++){
                user[keys[i]] = dataToBeUpdated[keys[i]]
            }
            user.confirmPassword = user.password
            const updatedData = await user.save()
            res.json({
                message: "Data updated successfully",
                data: user
            })
        } else {
            res.json({
                message: "user not found"
            })
        }
    }
    catch(err){
        res.json({
            message: err.message
        })
    }
}

module.exports.deleteUser = async function deleteUser(req, res) {
    let id = req.params.id
    let user = await userModel.findByIdAndDelete(id)
    if(user){
        res.json({
            message: "User deleted successfully"
        })
    } else {
        res.json({
            message: "User not found"
        })
    }
}

module.exports.getAllUsers = async function getAllUsers(req, res) {
    let users = await userModel.find();
    if (users){
        res.json({
            message: "Users data as follows",
            data: users
        })
    } else {
        res.json({
            message: "Database empty"
        })
    }
}

// module.exports.setCookies = function setCookies(req, res) {
//     res.setHeader('Set-Cookie', 'isLoggedin=true')
//     // res.cookie('isLoggedin', true, {maxAge:1000*60*60*24, secure:true, httpOnly:true})
//     res.cookie('isPrimeMember', true)

//     res.send("cookies set successfully")
// }

// module.exports.getCookies = function getCookies(req, res) {
//     // let cookies = req.cookies
//     console.log(req.cookies)
//     res.json({ cookieData: req.cookies })
//     // res.send("got the cookie")
// }

module.exports.updateProfileImage = function updateProfileImage(req, res){
    console.log("hello world");
    return res.json({
        message: "File uploaded"
    })
}