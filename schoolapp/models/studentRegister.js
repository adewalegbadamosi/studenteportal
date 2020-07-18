/* Student registration model */

// Require modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');


// Create student StudentRegister Schema and Model
const studentRegisterSchema = new Schema({
  firstname :{
    type: String,
    index:true
  },
  lastname: {
    type: String
  },
  sex: {
    type: String
  },
  nationality: {
    type: String
  },
  email: {
    type: String
},
phone: {
  type: Number
},
address: {
  type: String
},
course: {
  type: String
},
startdate: {
  type: String
},
username: {
  type: String
},
password:{
  type: String
},
matricno:{
  type: String
},
photo: {
  type: String
}
});

//Create a model based on the Schema and export
const StudentRegister = mongoose.model('studentRegister', studentRegisterSchema);
module.exports = StudentRegister;

module.exports.createUser = function(newUser, callback){
bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
        newUser.password = hash;
        newUser.save(callback);
    });
});
}

module.exports.getUserByUsername = function(username, callback){
var query = {username: username};
StudentRegister.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
StudentRegister.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
     if(err) throw err;
     callback(null, isMatch);
});
}


