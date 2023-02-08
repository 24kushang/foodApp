const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const userModel = require('./models/userModel')

// middleware for json
app.use(express.json())
app.use(cookieParser())

app.listen(3000)

// mini app
const userRouter = require('./routers/userRouter')
const authRouter = require('./routers/authRouter')

// base URL
app.use("/user", userRouter)
app.use("/", authRouter)