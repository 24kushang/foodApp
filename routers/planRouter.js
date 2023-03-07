const express = require('express');
const planRouter = express.Router()
const {protectRoute, isAuthorized} = require('../controller/authController')
const {getAllPlans, getPlan, createPlan, updatePlan, deletePlan} = require('../controller/planController')

//sab plan leke aayenge
planRouter.route('/allPlans')
.get(getAllPlans)

// own plan
planRouter.use(protectRoute)
planRouter.route('/plan/:id')
.get(getPlan)

// admin or restuarant owner can only create the plans
planRouter.use(isAuthorized(['admin', 'restuarantowner']))
planRouter.route('/crudPlans')
.post(createPlan)

planRouter.route('/crudPlans/:id')
.patch(updatePlan)
.delete(deletePlan)

// top 3 plans

module.exports = planRouter