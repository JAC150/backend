const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
  authId: {
    type: String,
    ref: 'User'
  },
  email: {
    type: String,
  },
  name: {
    type: String,
   
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

// Middleware para actualizar updatedAt antes de guardar
authSchema.pre('save', function (next) {
  if (this.isNew) {
    // Solo establece createdAt si es un nuevo documento
    this.createdAt = Date.now();
  }
  // Siempre actualiza updatedAt
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.model('User', authSchema);

module.exports = User;
