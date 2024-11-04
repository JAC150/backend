const express = require("express");
const router = express.Router();
const Alarm = require("../models/alarm");

router.post("/api/alarm", async (req, res) => { //POST nos permite almacenar los datos en la base de MongoDB
    const {time, message, userId, createdAt, updatedAt} = req.body;
    const alarm = new Alarm(
        {time, 
         message,
         userId,
         createdAt

        }
    );
    
    try {
        await alarm.save(); // Guarda la tarea en la base de datos
        res.status(200).json({ status: "guardada", alarm }); // Responde con éxito
      } catch (error) {
        res.status(400).json({ message: error.message }); // Maneja errores
      }
});

router.get("/api/alarm", async (req, res) => { //GET nos permite hacer consultas a la base de MongoDB 
    try {
        const alarm = await Task.find({});
        console.log(alarm);
        res.json({
            
            alarm : alarm
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error " }); // Maneja el error
    }
});

router.put("/api/alarm/:alarmId", async (req, res) =>{//PUT nos permite actualizar los datos el la DB
    const {time, message, userId, createdAt, updatedAt} = req.body;
    const newTask = {
         time, 
         message,
         userId,
         updatedAt: Date.now() // Actualiza la fecha
    };
    await Alarm.findByIdAndUpdate(req.params.id, newTask, {
        new: true, // Devuelve el documento actualizado
        runValidators: true // Ejecuta las validaciones del esquema
      });
    console.log(req.params.id); 
    res.json({status: " actualizada" });

});

router.delete("/api/alarm/:alarmId", async(req, res)=>{//Delete nos permite borrar los datos en la DB
    await Alarm.findByIdAndDelete(req.params.id);
    res.json({status: " eliminada" });
})
module.exports = router;