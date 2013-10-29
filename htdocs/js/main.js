$("#fg-cellnumber, #fg-grade").bind("keydown", disable_alpha_chars);

$("#submit_btn").click(function(e){
   valName =        validate("#fg-name");
   valSurname =     validate("#fg-surname");
   valSchool =      validate("#fg-school");
   valGrade =       validate("#fg-grade");
   valCourse =      validate_select("#fg-course");
   valCell =        validate("#fg-cellnumber");
   valEmail =       validate_email("#fg-email");
   
   if(!valName || !valSurname || !valSchool || !valGrade || !valCourse || !valCell || !valEmail){
       alert('Please fill in the required fields.');
       e.preventDefault();
   }else{
       
   }
});
