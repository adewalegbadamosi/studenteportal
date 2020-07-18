path= require('path'),
multer = require('multer');

//set storage engine
const filename = (req, file, cb)=>{
cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
}
const storage = multer.diskStorage({
destination: './styles/uploads/',
filename: filename
})
const fileFilter = (req,file,cb) =>{
// check mimetype
const image = file.mimetype.startsWith('image/');
if(image){
cb(null, true);
}else{
cb({message:'File type not supported'}, false);
}
}

// init upload
const upload = multer({
storage:storage,
fileFilter: fileFilter,
limits:{fileSize: 0.5*1024*1024}    
});

module.exports = upload;