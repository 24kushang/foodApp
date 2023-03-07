const express = require('express');
const userRouter = express.Router()
// const cookieParser = require('cookie-parser')
const userModel = require('../models/userModel')
// const protectRoute = require('./authHelper')
const {getUser, updateUser, deleteUser, getAllUsers, updateProfileImage} = require('../controller/userController')
const {signup, signupForm, login, isAuthorized, protectRoute, forgetpassword, resetpassword, logout} = require('../controller/authController')
const multer = require('multer')

const multerStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/images')
    },
    filename: function(req, file, cb){
        cb(null, `user-${Date.now()}.jpeg`)
    }
})


const filter = function(req, file, cb){
    if (file.mimetype.startsWith("image")){
        cb(null, true)
    } else{
        cb(new Error("Not an image"))
    }
}
const upload = multer({
    storage: multerStorage,
    fileFilter: filter
})

userRouter.post("/profileImage", upload.single("photo"), updateProfileImage)
userRouter.get("/profileImage", (req, res)=>{
    res.sendFile("C:\\Users\\kusha\\New folder (2)\\pepcoding\\foodApp\\html\\multer.html")
})

// user specific functions
userRouter.route('/:id')
    .patch(updateUser)
    .delete(deleteUser)

userRouter
    .route('/signup')
    .get(signupForm)
    .post(signup)

userRouter
    .route('/login')
    .post(login)

userRouter
    .route('/forgetpassword')
    .post(forgetpassword)

userRouter
    .route('/resetpassword')
    .post(resetpassword)

userRouter
    .route('/logout')
    .get(logout)

// userRouter.use(protectRoute)
userRouter.route('/userProfile')
    .get(getUser)

// admin specific functions
userRouter.use(isAuthorized(['admin']))
userRouter.route('/')
    .get(getAllUsers)

module.exports = userRouter
