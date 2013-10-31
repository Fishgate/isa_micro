$("#fg-cellnumber, #fg-grade").bind("keydown", disable_alpha_chars);

$("#submit_btn").click(function(e){
   valName =        validate("#fg-name");
   valSurname =     validate("#fg-surname");
   valSchool =      validate("#fg-school");
   valGrade =       validate_select("#fg-grade");
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
              if(res == 'success'){
                  window.location = 'http://www.isacarstens.co.za/apply/thank-you.php';
              }else{
                  alert(res);
              }
          },
          error: function () {
            alert('There was an error submitting your request.');
          }
       });
   }
   
   e.preventDefault();
});
