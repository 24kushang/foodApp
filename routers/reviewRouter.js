const express = require('express');
const reviewRouter = express.Router()
const {protectRoute, isAuthorized} = require('../controller/authController')
const {getAllReviews, top3reviews, getPlanReview, createReview, updateReview, deleteReview} = require('../controller/reviewController')

reviewRouter.route('/all')
.get(getAllReviews)

reviewRouter.route('/top3')
.get(top3reviews)

reviewRouter.route('/:id')
.get(getPlanReview)

reviewRouter.use(protectRoute)
reviewRouter.route('/crud/:plans')
.post(createReview)

// // reviewRouter.use(isAuthorized['user'])
reviewRouter.route('/crud/:id')
.patch(updateReview)
.delete(deleteReview)

module.exports = reviewRouter