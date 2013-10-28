// FORM VALIDATION =======================================================================================================

function disable_alpha_chars(event){
    // allow only backspace (8), delete (46), tab (9), all numerics (48-57), and numeric numpad (96-105) buttons
    exceptions = new Array(48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 46, 8, 9);

    for(i in exceptions){
        allow_key = false;

        if(event.keyCode == exceptions[i]){
            allow_key = true; 
            break
        }
    }

    if(!allow_key){
        event.preventDefault();
    }
}

function validate (target) {
    $(target).bind({
        focus: function() { $(this).removeAttr("style"); },
        change: function () { $(this).removeAttr("style"); }
    });

    if ($(target).val() !== "") {
        return true;
    }else{
        $(target).css({background: "#ff9966", color: "white"});
        return false;
    }
}         

function validate_select (target) {
    $(target).bind({
        focus: function() { $(this).removeAttr("style"); },
        change: function () { $(this).removeAttr("style"); }
    });

    if ($(target).val() != 0) {
        return true;
    }else{
        $(target).css({background: "#ff9966", color: "white"});
        return false;
    }
}

function validate_email (target) {
    var atSymbol    = $(target).val().indexOf('@');
    var dot         = $(target).val().indexOf('.');
    var lastDot     = $(target).val().lastIndexOf('.');
    var length      = ($(target).val().length)-1;
    var secondAt    = $(target).val().indexOf('@', (atSymbol+1));

    $(target).bind({
        focus: function() { $(this).removeAttr("style"); },
        change: function () { $(this).removeAttr("style"); }
    });

    if($(target).val() === $(target).data("placeholder")){
        $(target).css({background: "#ff9966", color: "white"});
        return false;
    }
    else if(atSymbol < 0){
        $(target).css({background: "#ff9966", color: "white"});
        return false;
    }
    else if(atSymbol === 0){
        $(target).css({background: "#ff9966", color: "white"});
        return false;
    }
    else if(dot < 0){
        $(target).css({background: "#ff9966", color: "white"});
        return false;
    }
    else if(lastDot < atSymbol){
        $(target).css({background: "#ff9966", color: "white"});
        return false;
    }
    else if(lastDot >= length){
        $(target).css({background: "#ff9966", color: "white"});
        return false;
    }
    else if(secondAt > 0){
        $(target).css({background: "#ff9966", color: "white"});
        return false;
    }
    else{
        return true;
    }
}


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
   }
});
