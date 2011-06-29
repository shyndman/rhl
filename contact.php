<?php
include('Mail.php');
include('Mail/mime.php');
include('config/smtp.php');

// Receiving variables
@$name = trim(addslashes($_POST['name']));
@$message = trim(addslashes($_POST['message']));
@$phone = trim(addslashes($_POST['phone']));
@$email = trim(addslashes($_POST['email']));

if (strlen($name) == 0 || 
    strlen($message) == 0 ||
    strlen($email) == 0 ||
    strlen($phone) == 0)
{
?>
{"success":false}
<?php
  return;
}

//Write to a log file containing the values
$fh = fopen('logged-messages.txt', 'a');
$stringData = "$name\n$phone\n$email\n\n$message\n-----------\n";
fwrite($fh, $stringData);
fclose($fh);

//Sending Email to form owner
$sender = $email;
$subject = "rosshyndman.com - $name sent you an email!";
$recipient = "info@rosshyndman.com, scotty.hyndman@gmail.com";
$text = "name: $name\n"
. "phone: $phone\n"
. "email: $email\n"
. "message: \n\n$message";

$crlf = "\n";
$headers = array(
  'From'          => $sender,
  'Return-Path'   => $sender,
  'Subject'       => $subject
);

// Creating the Mime message
$mime = new Mail_mime($crlf);

// Setting the body of the email
$mime->setTXTBody($text);

// Set body and headers ready for base mail class
$body = $mime->get();
$headers = $mime->headers($headers);

// Sending the email using smtp
$mail =& Mail::factory("smtp", $smtp_params);
$result = $mail->send($recipient, $headers, $body);

//! We should probably handle a bad send here

?>
{"success":true, "result":"<?php echo $result; ?>"}