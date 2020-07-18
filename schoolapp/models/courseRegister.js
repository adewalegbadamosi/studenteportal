/* Course registration model */

// Require modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create course registration Schema and Model
const courseRegistrationSchema = new Schema({
  coursea :{
    type: String,
    index:true
  },
  courseb :{
    type: String    
  },
  coursec :{
    type: String    
  },
  coursed :{
    type: String    
  },
  electivea :{
    type: String    
  },
  electiveb :{
    type: String    
  },
  matricno:{
    type: String
  }
});

//Create a model based on the Schema and export
const CourseRegistration = mongoose.model('courseRegistration', courseRegistrationSchema);
module.exports = CourseRegistration;



