<?php

require_once('../config.php');

function filterDefaultValue($string, $default) {
    if($string === $default) {
        return '';
    }else{
        return $string;
    }
}

function validateEmail ($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

function validateNum($int){
    if(!ctype_alpha($int)){
        return true;
    }else{
        return false;
    }
}

function validate ($string) {
    if(!empty($string)) {
        return true;
    }else{
        return false;
    }
}

function validateTrick($string){
    if(empty($string)){
        return true;
    }else{
        return false;
    }
}

// establish a connection
try {
    $conn = new PDO('mysql:host='.DB_HOST.';dbname='.DB_NAME, DB_USERNAME, DB_PASSWORD);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}catch (PDOException $ex){
    die($ex->getMessage());
}

if(
    validate($_POST['Name']) &&
    validate($_POST['Surname'])&&
    validate($_POST['School'])&&
    validateNum($_POST['Grade'])&&
    validate($_POST['Course'])&&
    validateNum($_POST['Cell'])&&
    validate($_POST['Email'])&&
    validateTrick($_POST['Trick'])
    
){
    try {
        $log_form = $conn->prepare('INSERT INTO '.DB_LOGS_TBL.' (name, surname, school, grade, course_interest, cell_number, email, hear_about_us, message, date, unix) VALUES (:name, :surname, :school, :grade, :course_interest, :cell_number, :email, :hear_about_us, :message, :date, :unix)');

        $log_form->bindValue(':name',               $_POST['Name']); 
        $log_form->bindValue(':surname',            $_POST['Surname']);
        $log_form->bindValue(':school',             $_POST['School']);
        $log_form->bindValue(':grade',              $_POST['Grade']);
        $log_form->bindValue(':course_interest',    $_POST['Course']);
        $log_form->bindValue(':cell_number',        $_POST['Cell']);
        $log_form->bindValue(':email',              $_POST['Email']);
        $log_form->bindValue(':hear_about_us',      implode(", ", $_POST['Heard']));
        $log_form->bindValue(':message',            $_POST['Message']);
        $log_form->bindValue(':date',               date('d-m-Y'));
        $log_form->bindValue(':unix',               time());

        
        if($log_form->execute()){
            include('./class.phpmailer.php');

            $phpmailer = new PHPMailer();

            $phpmailer->From = $_POST['Email'];
            $phpmailer->FromName = 'ISA Carstens Academy';
            $phpmailer->AddReplyTo($_POST['Email'], $_POST['Name']);
            $phpmailer->IsHTML(true);

            //$phpmailer->AddAddress("tyrone@fishgate.co.za");
            $phpmailer->AddAddress("jan@fishgate.co.za");
           // $phpmailer->AddAddress("renier@ilead.co.za");

            $phpmailer->Subject = "Enquiry from Website";

            foreach($_POST as $key => $val) {
                if ($key !== "Trick"){
                    if(is_array($val)){
                        $val = implode(", ", $val);
                    }else{
                        $val = $val;
                    }

                    $body .= "$key: $val<br />";
                }
            }

            $phpmailer->Body = $body;

            if($phpmailer->Send()){
                echo 'success';
            }else{
                echo 'failed';
            }
        }
    } catch (PDOException $ex) {
        echo $ex->getMessage();
    }
}else{
    die('Please fill in all the required form fields correctly before submitting.');
}

?>
