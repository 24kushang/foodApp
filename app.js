const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const userModel = require('./models/userModel')

const cors = require('cors')

app.use(cors({
    origin: 'https://localhost:3000'
}))

// middleware for json
app.use(express.json())
app.use(cookieParser())



// mini app
const userRouter = require('./routers/userRouter')
const reviewRouter = require('./routers/reviewRouter')
const planRouter = require('./routers/planRouter')

// base URL
app.use("/user", userRouter)
app.use("/plans", planRouter)
app.use("/reviews", reviewRouter)

// const planModel = require('./models/planModel')
app.listen(5000,(e)=>{
    console.log(e)
})