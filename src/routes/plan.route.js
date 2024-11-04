const express = require("express");
const router = express.Router();
const Plan = require("../models/plan"); 

router.get("/", async (req, res) => {
    try {
        const plans = await Plan.find({});
        console.log(plans);
        res.json({
            plans : plans
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error al obtener planes"});
    }
});

router.post("/", async (req, res) => {
    const {activity, time, priority, dueDate, userId } = req.body;
    const plan = new Plan(
        {activity, 
         time,
         priority,
         dueDate,
         userId,

         }
    );
    try {
        await plan.save();
        res.status (200).json ({status: "Creado exitosamente", plan });
    } catch (error) {
//        console.error(error);
        res.status(400).json({message: error.message});
    }
});

router.put("/:planId", async (req, res) => {
    const {activity, time, priority, dueDate, userId, /*updateAt*/ } = req.body;
    const newPlan = {
        activity, 
        time, 
        priority, 
        dueDate, 
        userId, 
        //updatedAt: date.now()
    };
    
        await Plan.findByIdAndUpdate(req.params.planId, newPlan,{
        new: true,
        runValidators: true
    });
    console.log(req.params.planId);
        res.json({status: "Actualizado exitosamente" });
     
});

router.delete("/:planId", async (req, res) => {
    await Plan.findByIdAndDelete(req.params.planId);
    res.json({status: "Eliminado" });
});

module.exports = router;