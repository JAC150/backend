const express = require("express");
const router = express.Router();
const Time = require("../models/time");

router.get("/api/server-time", async (req, res) => { //GET nos permite hacer consultas a la base de MongoDB 
    try {
        const times = await Task.find({});
        console.log(times);
        res.json({
            
            times : times  
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error" }); // Maneja el error
    }
});