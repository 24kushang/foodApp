const express = require('express');
const userRouter = express.Router()
// const cookieParser = require('cookie-parser')
const userModel = require('../models/userModel')
const protectRoute = require('./authHelper')
const {getUsers, postUser, updateUser, deleteUser, getUserById, getCookies, setCookies} = require('../controller/userController')

userRouter
    .route('/')
    .get(protectRoute, getUsers)
    .post(postUser)
    .patch(updateUser)
    .delete(deleteUser)

userRouter
    .route('/set')
    .get(setCookies)

userRouter
    .route('/get')
    .get(getCookies)

userRouter
    .route('/:id')
    .get(getUserById)


module.exports = userRouter
