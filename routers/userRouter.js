const express = require('express');
const userRouter = express.Router()
// const cookieParser = require('cookie-parser')
const userModel = require('../models/userModel')
const protectRoute = require('./authHelper')
const {getUser, updateUser, deleteUser, getAllUsers} = require('../controller/userController')

// user specific functions
userRouter.route('/:id')
    .patch(updateUser)
    .delete(deleteUser)

// app.use(protectRoute)
userRouter.route('/userProfile')
    .get(protectRoute, getUser)

// admin specific functions
userRouter.route('/')
    .get(getAllUsers)

module.exports = userRouter
