const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  podcastId: {
    type: String,

  },

  title: {
    type: String,
  },
  
  description: {
    type: String,
  },

  imageUrl : {
    type: String,

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
