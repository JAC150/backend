const express = require("express");
const router = express.Router();
const Countdown = require("../models/countdown");
 
router.get("/", async (req, res) => { //GET nos permite hacer consultas a la base de MongoDB 
    try {
        const countdown = await Task.find({});
        console.log(tasks);
        res.json({
            
            countdown: countdown // Enviando las tareas obtenidas
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error al obtener tareas" }); // Maneja el error
    }
});

router.post("/api/countdowns", async (req, res) => { //POST nos permite almacenar los datos en la base de MongoDB
    const {eventTitle, eventDate , userId , createdAt,updatedAt } = req.body;
    const countdown = new Countdown(
        {eventTitle, 
         eventDate,
         userId,
         createdAt

        }
    );
    
    try {
        await countdown.save(); // Guarda la tarea en la base de datos
        res.status(200).json({ status: "guardada", task }); // Responde con éxito
      } catch (error) {
        res.status(400).json({ message: error.message }); // Maneja errores
      }
});

router.put("/api/countdowns/:countdownId", async (req, res) =>{//PUT nos permite actualizar los datos el la DB
    const {eventTitle, eventDate , userId , createdAt,updatedAt } = req.body;
    const newTask = {
         eventTitle, 
         eventDate,
         userId,
         updatedAt: Date.now() // Actualiza la fecha
    };
    await Countdown.findByIdAndUpdate(req.params.id, newTask, {
        new: true, // Devuelve el documento actualizado
        runValidators: true // Ejecuta las validaciones del esquema
      });
    console.log(req.params.id); 
    res.json({status: "actualizada" });

});

router.delete("/:id", async(req, res)=>{//Delete nos permite borrar los datos en la DB
    await Countdown.findByIdAndDelete(req.params.id);
    res.json({status: "eliminada" });
})
module.exports = router;
