// mongoose ke through mongoDB connect karenge
const mongoose = require('mongoose')

const db_link = "mongodb+srv://kushang_24:009557@cluster0.h5znnuw.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(db_link)
.then (function (db) {
    // console.log(db);
    console.log("plan db connected");
})
.catch (function(err){
    console.log(err);
})

const planSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        maxLength: [20, 'plan name should not exceed more than 20 characters']
    },
    duration:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: [true, 'price not entered']
    },
    ratingAverage:{
        type: Number
    },
    discout:{
        type: Number,
        validate: [function(){
            return this.discout < 100
        }, 'discount should not exceed price']
    }
})

const planModel = mongoose.model('planModel', planSchema);

// ( async function createPlan(){
//     let plan = {
//         name: "Super food 101",
//         duration: 30,
//         price: 1000,
//         ratingAverage: 5,
//         discout: 20
//     }
//     // method 1
//     //   let data = await planModel.create(plan)

//     // method 2
//     const doc = new planModel (plan)
//     await doc.save()
// }) ();


module.exports = planModel
