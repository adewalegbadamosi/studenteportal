/* Control system for the MVC model */

const mongoose = require('mongoose');
const express = require('express');
const authenticateRoutes = require('./access/authenticate');
const accessRoutes = require('./access/access');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser'); 
const bodyParser = require('body-parser');
const flash = require('express-flash'); 
const helmet = require('helmet');
const csrf = require('csurf'); 

//create express app
var app = express();

// connect to mongodb

let uri = "mongodb://localhost/schooleportal";
let options = {
"server":{  
  "socketOptions":{
    "keepAlive": 300000,
    "connectTimeoutMS":30000
  }
},
"replset": {
  "socketOptions":{
    "keepAlive": 300000, 
    "connectTimeoutMS":30000
  }
}
} ;

mongoose.connect(uri, options,()=>{
  console.log('connected to database');
});
mongoose.connection.on('error', (error)=>{
  console.log('connection error: ', error);
});

//set view engine
app.set('view engine', 'ejs');

//set middlewares
app.use(helmet());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));  

// set up static files 
app.use('/styles', express.static('styles')); 
app.use(cookieParser());
app.use(
    session({
            secret: 'super-secret-key',  
            key: 'super-secret-cookie',
            resave: true, 
            saveUninitialized: true, 
            cookie: { maxAge: 10 * 60 * 1000 }  // 10 minute session expires
          })
)
app.use(flash());
app.use(csrf({cookie: true}));  

// initialize passport 
app.use(passport.initialize());
app.use(passport.session());

//fire controller router
app.use ('/', authenticateRoutes  ); 
app.use ('/access', accessRoutes);

//error handling
app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")  
  })

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Server Error!')
})

let port = 3900;
app.listen(process.env.PORT || port, ()=>{
    console.log(`listening to port ${port}` );
}).on('error', (err)=>{
    if(err.errno === 'EADDRINUSE'){
        console.log(`port ${port} is busy`);
        app.listen(port + 1);
    }
})
