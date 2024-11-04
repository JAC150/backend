const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  time: {
    type: Date,
    required: true,
  },

  message: {
    type: String,
    default: Date.now,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Asegúrate de que 'User' es el nombre del modelo de usuario
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware para actualizar updatedAt antes de guardar
taskSchema.pre('save', function (next) {
  if (this.isNew) {
    // Solo establece createdAt si es un nuevo documento
    this.createdAt = Date.now();
  }
  // Siempre actualiza updatedAt
  this.updatedAt = Date.now();
  next();
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
