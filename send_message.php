<?php
// Telegram bot API token and chat ID
$token = '7027107110:AAF0XiXPierq6lNQEv-bJ3xdAygAtXTD5Bc';
$chat_id = '-4289895386';

// Get form data
$name = $_POST['name'];
$tel = $_POST['tel'];
$email = $_POST['email'];

// Compose message
$message = "New contact information:\nName: $name\nTelephone: $tel\nEmail: $email";

// Send message to Telegram
$telegramUrl = "https://api.telegram.org/bot$token/sendMessage?chat_id=$chat_id&text=" . urlencode($message);
$response = file_get_contents($telegramUrl);
$responseArray = json_decode($response, true);

// Check if the message was sent successfully
if ($responseArray['ok'] == false) {
    // Handle error if needed
    echo "Error sending message to Telegram: " . $responseArray['description'];
} else {
    echo "Message sent to Telegram!";
}
?>
