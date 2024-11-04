const mongoose = require('mongoose');

const timeSchema = new mongoose.Schema({

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
timeSchema.pre('save', function (next) {
  if (this.isNew) {
    // Solo establece createdAt si es un nuevo documento
    this.createdAt = Date.now();
  }
  // Siempre actualiza updatedAt
  this.updatedAt = Date.now();
  next();
});

const Time = mongoose.model('Time', timekSchema);

module.exports = Time;
