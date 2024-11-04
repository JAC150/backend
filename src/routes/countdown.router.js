const express = require("express");
const router = express.Router();
const Task = require("../models/countdown");
 
router.get("/api/countdowns", async (req, res) => { //GET nos permite hacer consultas a la base de MongoDB 
    try {
        const countdowns = await Countdown.find({});
        console.log(countdowns);
        res.json({
            
            countdowns: countdowns // Enviando las tareas obtenidas
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error" }); // Maneja el error
    }
});

router.post("/api/countdowns", async (req, res) => { //POST nos permite almacenar los datos en la base de MongoDB
    const {eventTitle,eventDate,userId, updateAt, createdAt, updatedAt} = req.body;
    const countdown = new Countdown(
        {eventTitle, 
         eventDate,
         userId,
         updateAt,
         createdAt

        }
    );
    
    try {
        await countdown.save(); // Guarda en la base de datos
        res.status(200).json({ status: " guardada", task }); // Responde con éxito
      } catch (error) {
        res.status(400).json({ message: error.message }); // Maneja errores
      }
});

router.put("/api/countdowns/:countdownId", async (req, res) =>{//PUT nos permite actualizar los datos el la DB
    const {eventTitle,eventDate,userId, updateAt, createdAt, updatedAt} = req.body;
    const newCountdown = {
        eventTitle, 
        eventDate,
        userId,
        updateAt,
        updatedAt: Date.now() // Actualiza la fecha
    };
    await Countdown.findByIdAndUpdate(req.params.id, newCountdown, {
        new: true, // Devuelve el documento actualizado
        runValidators: true // Ejecuta las validaciones del esquema
      });
    console.log(req.params.id); 
    res.json({status: "actualizada" });

});

router.delete("/api/countdowns/:countdownId", async(req, res)=>{//Delete nos permite borrar los datos en la DB
    await Countdown.findByIdAndDelete(req.params.id);
    res.json({status: "borrado" });
})
module.exports = router;
