const reviewModel = require("../models/reviewModel")
const planModel = require('../models/planModel')

module.exports.getAllReviews = async function getAllReviews(req, res) {
    try{
        const reviews = await reviewModel.find()
        if(reviews){
            res.json({
                message: "All reviews retrived",
                data: reviews
            })
        }
        else {
            res.json({
                message: "No reviews were posted so far"
            })
        }
    }
    catch(err){
        res.json({
            error: err.message
        })
    }
}

module.exports.top3reviews = async function top3reviews(req, res) {
    try{
        const reviews = await reviewModel.find().sort({
            ratings: -1
        }).limit(3)
        if(reviews){
            res.json({
                message: "All reviews retrived",
                data: reviews
            })
        }
        else {
            res.json({
                message: "No reviews were posted so far"
            })
        }
    }
    catch(err){
        res.json({
            error: err.message
        })
    }
}


module.exports.getPlanReview = async function getPlanReviews(req, res) {
    try{
        const id = req.params.id
        const review = await reviewModel.findById(id)
        if(review){
            res.json({
                message: "review retrived",
                data: review
            })
        }
        else {
            res.json({
                message: "No reviews were posted so far"
            })
        }
    }
    catch(err){
        res.json({
            error: err.message
        })
    }
}


module.exports.createReview = async function createReview(req, res) {
    try{
        let id = req.params.plans
        let plan = await planModel.findById(id)
        let review = req.body
        review.user = req.cookies.login
        review.plan = id
        const createdReview = await reviewModel.create(review)
        res.json({
            message: "review created successfully",
            data: createdReview
        })
    }
    catch(err){
        res.json({
            error: err.message
        })
    }
}

module.exports.updateReview = async function updateReview(req, res) {
    try {
        let id = req.params.id
        let reviewToBeUpdated = req.body
// console.log(id);
        let review = await reviewModel.findById(id)
// console.log(plan);
        if (review) {
            let keys = []
            for (let key in reviewToBeUpdated) {
                keys.push(key)
            }
            for (let i = 0; i < keys.length; i++) {
                review[keys[i]] = reviewToBeUpdated[keys[i]]
            }
            // plan.confirmPassword = plan.password
            const updated = await review.save()

            res.json({
                message: "review created successfully",
                review: updated
            })
        }
    }
    catch (err) {
        res.json({
            error: err.message
        })
    }
}

module.exports.deleteReview = async function deleteReview(req, res) {
    try {
        let id = req.params.id
        let deletedReview = await reviewModel.findByIdAndDelete(id)
        res.json({
            message: "Review deleted successfully",
            plan: deletedReview
        })
    }
    catch (err) {
        res.json({
            error: err.message
        })
    }
}
