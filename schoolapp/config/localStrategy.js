
var StudentRegister = require('../models/studentRegister');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

 passport.use(
        new LocalStrategy(
       ( username,password, done) => {            
        StudentRegister.findOne({ username: username}, function(err,user) {
              if (err) {return done(err); }
              if (!user) {  return  done(null, false);}                         
                StudentRegister.comparePassword(password, user.password, function (err, isMatch) {
                if (err) throw err;
                if(!isMatch) {  return  done(null, false);} 
                if (isMatch) {return done(null, user);
                } 
            });
          });
        })
  );


    passport.serializeUser((user, done) => {
      done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
    StudentRegister.getUserById(id, function (err, user) {
    done(err, user);
    });
  });

  module.exports = passport;