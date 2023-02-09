const express = require('express');
const userRouter = express.Router()
// const cookieParser = require('cookie-parser')
const userModel = require('../models/userModel')
// const protectRoute = require('./authHelper')
const {getUser, updateUser, deleteUser, getAllUsers} = require('../controller/userController')
const {signup, login, isAuthorized, protectRoute} = require('../controller/authController')

// user specific functions
userRouter.route('/:id')
    .patch(updateUser)
    .delete(deleteUser)

userRouter
    .route('/signup')
    .post(signup)

userRouter
    .route('/login')
    .post(login)

// app.use(protectRoute)
userRouter.route('/userProfile')
    .get(protectRoute, getUser)

// admin specific functions
userRouter.use(isAuthorized(['admin']))
userRouter.route('/')
    .get(getAllUsers)

module.exports = userRouter
