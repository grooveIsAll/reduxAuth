const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

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

// On save Hook, encrypt password: BEFORE 'pre-save' saving a model, run this function
userSchema.pre('save', function(next) {
  // 'user' is an instance of the user model, and we are getting access to the instance
  const user = this;
  // generate the salt, when it is done generateing, run the callback
  bcrypt.genSalt(10, function(err, salt) {
    if(err) return next(err);
    // once the salt has been generated, hash (encrypt) the password using the salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if(err) return next(err);
      // overwrite plain text password with encrypted password
      user.password = hash;
      // once the encryption process has finished, go ahead and save the model
      next();
    });
  });
});

// Create Model Class
const userModel = mongoose.model('user', userSchema);

// Export Model
module.exports = userModel; 