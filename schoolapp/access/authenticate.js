/* Authentication route for all request from browser */

const  router = require('express').Router(),        
        StudentRegister = require('../models/studentRegister'),
        CourseRegister = require('../models/courseRegister'),              
        upload = require('../config/upload');

// create custom function
const checkRepetition = ( ca,cb,cc,cd,ea,eb ) => { //Big 0 - O(n2)
    courseArr = [ca,cb,cc,cd,ea,eb];
    dummy = [ca,cb,cc,cd,ea,eb];

    for (i = 0; i < courseArr.length; i++ ){
        dummy.shift();
        for( j = 0; j < dummy.length; j++ ){
            if( courseArr[i] == dummy[j] ){
                return true;
            }
        }
    }

    return false;
}

function ensureAuthenticated(req, res, next){
if(req.isAuthenticated()){
return next();
} else {
res.redirect('/access/log-in');
}
}

router.get('/',  function(req, res){         
        res.render('eportal', { csrfToken:req.csrfToken() });
    });
router.post('/upload', ensureAuthenticated, upload.single('photo'), (req,res)=>{
    StudentRegister.update({email:req.user.email},{$set:{photo:req.file.filename}}).then(()=>{
        res.render('eportal', {user: req.user, csrfToken:req.csrfToken(), photo:`/styles/uploads/${req.file.filename}` });   
      })
    });

router.get('/course-registration', ensureAuthenticated, function(req, res){         
    CourseRegister.find().then((courseRegRec) => {        
        res.render('course-registration', { user: req.user, records:courseRegRec, csrfToken:req.csrfToken()});  
     });       
    });

router.post('/course-registration', function(req, res){
        // first check course registration records to prevent multiples
        
        CourseRegister.findOne({matricno:req.user.matricno}).then((response) => {
            if (response){
                req.flash('failure','You have already registered!');
                res.render('course-registration', { user: req.user,  csrfToken:req.csrfToken()}); 
            }else{
                //First check if there is course repetition
                if( checkRepetition(req.body.coursea,req.body.courseb,req.body.coursec,req.body.coursed,req.body.electivea,req.body.electiveb)){
                    req.flash('failure', 'You have repeated course(s)');
                    res.render('course-registration', { user: req.user,  csrfToken:req.csrfToken()});
                }else{
                    var newCourseRec = new CourseRegister({
                   coursea: req.body.coursea,
                   courseb: req.body.courseb,
                   coursec: req.body.coursec,
                   coursed: req.body.coursed,  
                   electivea: req.body.electivea,
                   electiveb:req.body.electiveb,
                   matricno:req.user.matricno                    
                 });                 
                 CourseRegister.create(newCourseRec, (err, record)=> {
                 if (err) throw err;
                 req.flash('success', 'Course registration successful');
                 res.render('courseform', {user:req.user, photo:`/styles/uploads/${req.user.photo}`, record:record, csrfToken:req.csrfToken()})
                
                 });
                }
                 
            }
        });
                                         
        });               

router.get('/courseform', ensureAuthenticated, (req, res) => {                
                CourseRegister.findOne({matricno:req.user.matricno}).then((record) => {                                   
                    res.render('courseform', {user:req.user,photo:`/styles/uploads/${req.user.photo}`, record:record, csrfToken:req.csrfToken()})
                });
            });               



module.exports = router;
