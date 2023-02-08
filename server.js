const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const userModel = require('./models/userModel')

// middleware for json
app.use(express.json())
app.use(cookieParser())

app.listen(3000)


// mini app
// const userRouter = require(userRouter)
// const authRouter = require('./routers/authRouter');
const authRouter = express.Router()
const userRouter = express.Router()

// base URL
app.use("/user", userRouter)
app.use("/", authRouter)


//todo  userRouter wala code
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



// routes of '/user' 

async function getUsers(req, res) {
    //queries
    let allUsers = await userModel.find();
// res.send("Hello world")
    res.json({
        message: 'list of the users found',
        data: allUsers
    })
}

function postUser(req, res) {
    users = req.body
    console.log(req.body);
    res.send("Response recieved successfully")
}

function updateUser(req, res) {
    const dataToBePatched = req.body
    for (x in dataToBePatched) {
        users[x] = dataToBePatched[x]
    }

    res.send("Data appended successfully")
}

function deleteUser(req, res) {
    users = {}
    res.send("Data deleted successfully");
}

function getUserById(req, res) {
    console.log(req.params);
    res.send("user id recieved")
}

function setCookies(req, res) {
    res.setHeader('Set-Cookie', 'isLoggedin=true')
    // res.cookie('isLoggedin', true, {maxAge:1000*60*60*24, secure:true, httpOnly:true})
    res.cookie('isPrimeMember', true)

    res.send("cookies set successfully")
}


function getCookies(req, res) {
    // let cookies = req.cookies
    console.log(req.cookies)
    res.json({ cookieData: req.cookies })
    // res.send("got the cookie")
}

let flag = false
function protectRoute(req, res, next){
    // if(req.cookies.isLoggedIn){
    //     next();
    // } else {
    //     return res.json({
    //         message: "You are not Logged in"
    //     })
    // }
    console.log(req.cookie);
    next();
}


//todo  authRouter vala code

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
                    res.cookie("isLoggedIn", true)
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
