const mongoose = require("mongoose");

const userpreferencesSchema = new mongoose.Schema({
 userId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  theme : {
    type: String,
    required: true,
  },
  colorScheme : {
    type: Object,
    required: true,
  },
  layoutSettings : {
    type: Object,
    required: true,
  },
  createdAt : {
    type: Date,
    default: Date.now,
  },
  updatedAt : {
    type: Date,
    default: Date.now,
  },
});

// Middleware para actualizar updatedAt antes de guardar
userpreferencesSchema.pre("save", function (next) {
  if (this.isNew) {
    // Solo establece createdAt si es un nuevo documento
    this.createdAt = Date.now();
  }
  // Siempre actualiza updatedAt
  this.updatedAt = Date.now();
  next();
});

const UserPreferences = mongoose.model("UserPreferences", userpreferencesSchema);

module.exports = UserPreferences;