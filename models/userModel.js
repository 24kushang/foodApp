const mongoose = require('mongoose')
const emailValidator = require('email-validator')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const db_link = "mongodb+srv://kushang_24:009557@cluster0.h5znnuw.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(db_link)
.then (function (db) {
    // console.log(db);
    console.log("db connected");
})
.catch (function(err){
    console.log(err);
})

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate: function(){
            return emailValidator.validate(this.email)
        }
    },
    password:{
        type: String,
        required: true
    },
    confirmPassword:{
        type: String,
        required: true,
        validate: function(){
            return this.confirmPassword==this.password
        }
    },
    role:{
        type: String,
        enum:['admin', 'user', 'restaurantowner', 'deliveryboy'],
        default: 'user'
    },
    profileImage:{
        type:String,
        default:"img/users/default.jpg"
    },
    resetToken:String 
})

//? pre hooks 
// to replace value with undefined -> this skips the data from storing in the database

userSchema.pre('save', function(){
    this.confirmPassword = undefined
})

// userSchema.pre('save', async function(){
//     let salt = await bcrypt.genSalt()
//     let hashedString = await bcrypt.hash(this.password, salt)
//     // console.log(hashedString);

//     this.password = hashedString
// })

userSchema.methods.createResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString("hex")
    this.resetToken = resetToken
    return resetToken
}

userSchema.methods.resetPasswordHandler = function(password, confirmPassword){
    this.password = password
    this.confirmPassword = confirmPassword
    this.resetToken = undefined
}

const userModel = mongoose.model('userModel', userSchema);

module.exports = userModel