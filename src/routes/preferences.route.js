const express = require("express");
const router = express.Router();
const UserPreferences = require("../models/userPreferences");

router.get("/", async (req, res) => {
    try {
    const preferences = await UserPreferences.find({});
    console.log(preferences);
    res.json({
        preferences
    });
    } catch (error) { 
        console.error(error);
        res.status(500).json({ message: "Error al obtener preferencias" });
    }
});

router.put("/:id", async (req, res) => {
    const { userId , theme, colorScheme, layoutSettings,/* createdAt, updatedAt */} = req.body;
    const newUserPreferences = {
        userId, 
        theme, 
        colorScheme, 
        layoutSettings, 
        //updatedAt: Date.now()
    };
    try {
    const updatedPreferences = await UserPreferences.findByIdAndUpdated(req.params.id, newUserPreferences,{
        new: true,
        runValidators: true,
    });
    if (!updatedPreferences) {
        return res.status(404).json({ message: "Preferencias no encontradas" });
    }
    res.json({ status: "Actualizada", updatedPreferences });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar preferencias" });
}
});

module.exports = router;