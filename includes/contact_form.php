<?php

/**
 * Please edit the path to the Swift Mailer
 */
require_once 'includes/swiftmailer/swift_required.php';

/**
 * SETTINGS
 *
 * 1. Replace $to_name with your Full name
 * 2. Replace $to_email with your Email address
 * 3. If you're using GMAIL, please comment out line 31 and uncomment lines 36 to 38 and enter in your Username and Password
 * 4. Done!
 */
$to_name = 'Oculus';

$to_email = 'robb@visual23.com';

// Feedback messages
$messages = NULL;

// Detect AJAX request
if ( !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest' )
{
	// Form data
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
	$phone = $_POST['phone'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $topic = $_POST['topic'];
    $name = $first_name . ' ' . $last_name;
    $message = $_POST['message'];

    $text  = "You have been contacted by $name" . PHP_EOL . PHP_EOL;    
    
    $text .= "You can contact $name via email, $email.";
    $text .= (isset($phone) && !empty($phone))?" Or via phone $phone." . PHP_EOL . PHP_EOL:'';
    //$text .= 'Type of contact: '. PHP_EOL.$type_of_contact. PHP_EOL . PHP_EOL;
    //$text .= 'Company: '. PHP_EOL.$company. PHP_EOL . PHP_EOL;
    //$text .= 'Title: '. PHP_EOL.$title. PHP_EOL . PHP_EOL;
    //$text .= (!empty($address))?'Address: '. PHP_EOL.$address. PHP_EOL . PHP_EOL:'';
    //$text .= (!empty($city))?'City: '. PHP_EOL.$city. PHP_EOL . PHP_EOL:'';
    //$text .= (!empty($state))?'State: '. PHP_EOL.$state. PHP_EOL . PHP_EOL:'';
    //$text .= (!empty($country))?'Country: '. PHP_EOL.$country. PHP_EOL . PHP_EOL:'';
    //$text .= (!empty($postal_code))?'Postal Code: '. PHP_EOL.$postal_code. PHP_EOL . PHP_EOL:'';
    $text .= "Message :" . PHP_EOL;
    $text .= $message . PHP_EOL . PHP_EOL;
    $text .= "-------------------------------------------------------------------------------------------" . PHP_EOL;
    
	// SwiftMailer
	$transport = Swift_MailTransport::newInstance(); // Uses the PHP mail() function
	/**
	 * Some Web Hosts have difficulties sending to Gmail addresses
	 * the below settings allow you to send emails via your own Gmail address
	 */
	// $transport = Swift_SmtpTransport::newInstance('smtp.gmail.com', 465, 'ssl')
	// 	->setUsername('Please enter your gmail email here')
	// 	->setPassword('Please enter your gmail email password here');
	$message = Swift_Message::newInstance();
	$message->setFrom( $to_email, $to_name );
	$message->setTo( $to_email, $to_name );
	$message->setReplyTo( $email, $name );
	$message->setSubject( $subject );
	$message->setBody( $text );
	$mailer = Swift_Mailer::newInstance( $transport );

	// Send email and give feedback
	if( $mailer->send( $message ) )
	{
		$messages = json_encode(array(
			'type' => 'success',
			'title' => 'Success: ',
			'content' => 'Message has been sent successfully'
		));
	}
	else
	{
		$messages = json_encode(array(
			'type' => 'danger',
			'title' => 'Error: ',
			'content' => 'The message could not be sent successfully. Please check your mail server settings.'
		));
	}

	// Return JSON data
	exit( $messages );
}