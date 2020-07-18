
const formatPassword = ( course,startdate,firstname,lastname ) => {  

formatedCourse = course.toLowerCase().substr(0,3);
formatedDate = startdate.substr(6);
formatedFirstname = firstname.toLowerCase().substr(0,1)
formatedLastname = lastname.toLowerCase().substr(0,1);

formatedPassword = formatedCourse+formatedDate+formatedFirstname+formatedLastname;

return formatedPassword;  

}

const checkRepetition = ( ca,cb,cc,cd,ea,eb ) => {
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
 
function displayRequests () {
     var dispOne = document.getElementById('display');    
    if( dispOne.style.display == 'block'){
        dispOne.style.display = 'none';  
    }else {
        dispOne.style.display = 'block'; 
    }           
 }

 
function uploadForm () {    
    var form = document.getElementById('form');
    var profileDiv = document.getElementById('profile-div');
    var profileImg = document.getElementById('profile-img'); 
    var col2 = document.getElementById('col-2'); 
    profileImg.style.display = 'none';
   if( form.style.display == 'block'){
       form.style.display = 'none'; 
       profileDiv.style.display= 'flex'; 
       
       col2.style.borderRadius = '0  2vw 2vw 0';
   }else {
       form.style.display = 'block';
       profileDiv.style.display= 'block';
       
       col2.style.borderRadius = '0 0 2vw 2vw';
   }           
}




