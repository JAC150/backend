const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
 activity: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
    enum: ["Alta", "Media", "Baja"],
  },
  dueDate : {
    type: Date,
    //default: Date.now,  // Fecha finalizada
  },
  userId: {
    type: String,
    ref: 'User', // Asegúrate de que 'User' es el nombre del modelo de usuario
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware para actualizar updatedAt antes de guardar
planSchema.pre("save", function (next) {
  if (this.isNew) {
    // Solo establece createdAt si es un nuevo documento
    this.createdAt = Date.now();
  }
  // Siempre actualiza updatedAt
  this.updatedAt = Date.now();
  next();
});

const Plan = mongoose.model("PLan", planSchema);

module.exports = Plan;