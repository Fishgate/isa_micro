$("#fg-cellnumber, #fg-grade").bind("keydown", disable_alpha_chars);

$("#submit_btn").click(function(e){
    e.preventDefault();
   valName =        validate("#fg-name");
   valSurname =     validate("#fg-surname");
   valSchool =      validate("#fg-school");
   valGrade =       validate("#fg-grade");
   valCourse =      validate_select("#fg-course");
   valCell =        validate("#fg-cellnumber");
   valEmail =       validate_email("#fg-email");
   valTrick =       validate_trick("#fg-trick");
   
   if(!valName || !valSurname || !valSchool || !valGrade || !valCourse || !valCell || !valEmail || !valTrick){
       alert('Please fill in the required fields.');
   }else{
       $.ajax({
          url: 'classes/validation.php',
          type: 'post',
          data: $('#fg_form').serialize(),
          success: function(result){
              var res = result.trim();
              if(res == 'SUCCESS'){
                  window.location = 'thank-you.php';
              }else{
                  console.log(res);
              }
          },
          error: function(result){alert('ERRORS FOUND')}
       });
   }
});
