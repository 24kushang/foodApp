const planModel = require('../models/planModel')

module.exports.getAllPlans = async function getAllPlans(req, res) {
    try {
        let plans = await planModel.find()
        if (plans) {
            res.json({
                message: "Plans are as follows",
                plansData: plans
            })
        } else {
            res.json({
                message: "No plans found"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
}

module.exports.getPlan = async function getPlan(req, res) {
    try {
        let id = req.params.id
        let plan = await planModel.findById(id)
        if (plan) {
            res.json({
                message: "The plan detials are as follows",
                plan: plan
            })
        } else {
            res.json({
                message: "The plan doesn't exist"
            })
        }
    }
    catch (err) {
        res.json({
            error: err.message
        })
    }
}

module.exports.createPlan = async function createPlan(req, res) {
    try {
        let planData = req.body
        let createdPlan = await planModel.create(planData)
        res.json({
            message: "Plan created successfully",
            plan: createdPlan
        })
    }
    catch (err) {
        res.json({
            error: err.message
        })
    }
}

module.exports.updatePlan = async function updatePlan(req, res) {
    try {
        let id = req.params.id
        let planToBeUpdated = req.body
console.log(id);
        let plan = await planModel.findById(id)
console.log(plan);
        if (plan) {
            let keys = []
            for (let key in planToBeUpdated) {
                keys.push(key)
            }
            for (let i = 0; i < keys.length; i++) {
                plan[keys[i]] = planToBeUpdated[keys[i]]
            }
            // plan.confirmPassword = plan.password
            const updated = await plan.save()

            res.json({
                message: "Plan created successfully",
                plan: updated
            })
        }
    }
    catch (err) {
        res.json({
            error: err.message
        })
    }
}

module.exports.deletePlan = async function deletePlan(req, res) {
    try {
        let id = req.params.id
        let deletedPlan = await planModel.findByIdAndDelete(id)
        res.json({
            message: "Plan deleted successfully",
            plan: deletedPlan
        })
    }
    catch (err) {
        res.json({
            error: err.message
        })
    }
}

module.exports.getTopPlans = async function getTopPlans(req, res){
    try{
        let top3Plans = await planModel.find().sort({
            ratingAverage:-1
        }).limit(3)
        res.json({
            message: "Top 3 plans are as follows",
            data: top3Plans
        })
    }
    catch(err){
        res.json({
            error: err.message
        })
    }
}