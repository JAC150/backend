const express = require("express");
const router = express.Router();
const Auth = require("../models/user");
 
router.get("/", async (req, res) => { //GET nos permite hacer consultas a la base de MongoDB 
    try {
        
        const auth = await Auth.find({});
        console.log(auth);
        res.json({
            
            Auth: auth // Enviando el usuario obtenido
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error al obtener tareas" }); // Maneja el error
    }
});

router.post("/", async (req, res) => { //POST nos permite almacenar los datos en la base de MongoDB
    const {authId, email, name} = req.body;
    const userExist = await Auth.findOne({email})
    if (userExist){
        return res.status(400).json({message : "Usuario ya existe."})
    }
    const auth = new Auth(
        {authId, 
         email,
         name
        }
    );
    
    try {
        await auth.save(); // Guarda la tarea en la base de datos
        res.status(200).json({ status: "Usuario guardado", auth }); // Responde con éxito
      } catch (error) {
        res.status(400).json({ message: error.message }); // Maneja errores
      }
});

router.put("/:id", async (req, res) =>{//PUT nos permite actualizar los datos el la DB
    const {email, name, updatedAt} = req.body;
    const newUser = {
         email,
         name,
         updatedAt: Date.now() // Actualiza la fecha
    };
    await Auth.findByIdAndUpdate(req.params.id, newUser, {
        new: true, // Devuelve el documento actualizado
        runValidators: true // Ejecuta las validaciones del esquema
      });
    console.log(req.params.id); 
    res.json({status: "usuario actualizado" });

});

router.delete("/:id", async(req, res)=>{//Delete nos permite borrar los datos en la DB
    await Auth.findByIdAndDelete(req.params.id);
    res.json({status: "usuario eliminado" });

});
module.exports = router;
