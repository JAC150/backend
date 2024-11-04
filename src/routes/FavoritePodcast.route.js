const express = require("express");
const router = express.Router();
const Task = require("../models/FavoritePodcast");

router.get("/api/podcasts/search", async (req, res) => { //GET nos permite hacer consultas a la base de MongoDB 
    try {
        const podcasts = await Podcast.find({});
        console.log(podcasts);
        res.json({
            
            podcasts: podcasts // Enviando las tareas obtenidas
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error" }); // Maneja el error
    }
});

router.get("/api/podcasts/:podcastId", async (req, res) => { //GET nos permite hacer consultas a la base de MongoDB 
    try {
        const podcasts = await Podcast.find({});
        console.log(podcasts);
        res.json({
            
            podcasts: podcasts // Enviando las tareas obtenidas
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error" }); // Maneja el error
    }
});

router.get("/api/podcasts/favorites", async (req, res) => { //GET nos permite hacer consultas a la base de MongoDB 
    try {
        const podcasts = await Podcast.find({});
        console.log(podcasts);
        res.json({
            
            podcasts: podcasts // Enviando las tareas obtenidas
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error" }); // Maneja el error
    }
});


router.post("/api/podcasts/favorites", async (req, res) => { //POST nos permite almacenar los datos en la base de MongoDB
    const {podcastId , userId , title , description, imageUrl,createdAt, updatedAt   } = req.body;
    const podcast = new Podcast(
        {podcastId , 
         userId ,
         title ,
         description,
         imageUrl ,
         createdAt

        }
    );
    
    try {
        await podcast.save(); // Guarda la tarea en la base de datos
        res.status(200).json({ status: "Tarea guardada", task }); // Responde con éxito
      } catch (error) {
        res.status(400).json({ message: error.message }); // Maneja errores
      }
});


router.delete("/api/podcasts/favorites/:podcastId", async(req, res)=>{//Delete nos permite borrar los datos en la DB
    await Podcast.findByIdAndDelete(req.params.id);
    res.json({status: "tarea eliminada" });
})
module.exports = router;