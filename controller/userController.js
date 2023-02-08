// routes of '/user' 
const express = require('express')
const userModel = require('../models/userModel')


module.exports.getUsers = async function getUsers(req, res) {
    //queries
    let allUsers = await userModel.find();
// res.send("Hello world")
    res.json({
        message: 'list of the users found',
        data: allUsers
    })
}

module.exports.postUser = function postUser(req, res) {
    users = req.body
    console.log(req.body);
    res.send("Response recieved successfully")
}

module.exports.updateUser = function updateUser(req, res) {
    const dataToBePatched = req.body
    for (x in dataToBePatched) {
        users[x] = dataToBePatched[x]
    }

    res.send("Data appended successfully")
}

module.exports.deleteUser = function deleteUser(req, res) {
    users = {}
    res.send("Data deleted successfully");
}

module.exports.getUserById = function getUserById(req, res) {
    console.log(req.params);
    res.send("user id recieved")
}

module.exports.setCookies = function setCookies(req, res) {
    res.setHeader('Set-Cookie', 'isLoggedin=true')
    // res.cookie('isLoggedin', true, {maxAge:1000*60*60*24, secure:true, httpOnly:true})
    res.cookie('isPrimeMember', true)

    res.send("cookies set successfully")
}

module.exports.getCookies = function getCookies(req, res) {
    // let cookies = req.cookies
    console.log(req.cookies)
    res.json({ cookieData: req.cookies })
    // res.send("got the cookie")
}
