const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Model
const userSchema = new Schema({
  email: {
    type: String, 
    unique: true,
    lowercase: true
  },
  password: String 
});

// Create Model Class
const userModel = mongoose.model('user', userSchema);

// Export Model
module.exports.userModel; 