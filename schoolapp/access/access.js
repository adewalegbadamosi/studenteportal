/* Create access for student registration and course registration */

// require and declare modules
const StudentRegister = require('../models/studentRegister'),
      router = require('express').Router(),
      passport = require('../config/localStrategy'),
      upload = require('../config/upload');
      

// declare custom function

const formatPassword = ( course,startdate,firstname,lastname ) => {  

  formatedCourse = course.toLowerCase().substr(0,3);
  formatedDate = startdate.substr(0,4);
  formatedFirstname = firstname.toLowerCase().substr(0,1)
  formatedLastname = lastname.toLowerCase().substr(0,1);
  
  formatedPassword = formatedCourse+formatedDate+formatedFirstname+formatedLastname;
  
  return formatedPassword; 
  
  }

      
// register fresh student
    router.get('/student-registration', function(req, res){
        res.render('student-registration', {csrfToken: req.csrfToken()});
    });

    router.post('/student-registration',upload.single('photo'), (req, res)=>{  
      //console.log(req.body)    ;  
        StudentRegister.findOne({          
            email: req.body.email
          }).then((currentUser) => {
              if(currentUser){
                req.flash('failure','Contact  exist!')
                res.render('student-registration',{csrfToken: req.csrfToken()}); 
              } else {             
                
                var newStudent = new StudentRegister({
                   firstname: req.body.firstname,
                   lastname: req.body.lastname,
                   sex: req.body.sex,
                   nationality: req.body.nationality,
                   email: req.body.email,
                   phone: req.body.phone,
                   address: req.body.address,
                   course: req.body.course,
                   startdate: req.body.startdate,
                   username: req.body.email,
                   password: formatPassword(req.body.course,req.body.startdate,req.body.firstname,req.body.lastname) ,
                   matricno: formatPassword(req.body.course,req.body.startdate,req.body.firstname,req.body.lastname) ,                  
                   photo: req.file?  req.file.filename : ""                    
                   
                 });
                 StudentRegister.createUser(newStudent,  (err, user)=> {
                 if (err) throw err;
                  res.render('student-registration-success', {data:user,photo:`/styles/uploads/${user.photo}`, csrfToken: req.csrfToken()});
                 });                
              }
            });
    });

    //login for returning student
    router.get('/log-in', (req, res) => {
      res.render('log-in', {csrfToken: req.csrfToken()});
    });  

    router.post('/log-in', 
    passport.authenticate('local', {failureRedirect: '/access/log-in'}), 
      (req, res, next)=> {
            res.redirect('/course-registration') ; 
    });

    router.get('/logout', function (req, res) { 
    req.logout();
    res.redirect('/access/log-in');
    });

    module.exports = router;
