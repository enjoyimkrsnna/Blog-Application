module.exports = {
  passwordResetEmail: (otp) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    .otp {
      font-size: 24px;
      font-weight: bold;
      color: #28a745;
    }
    .message {
      font-size: 16px;
      color: #333;
    }
  </style>
</head>
<body>
  <p class="message">
    Hey there!
  </p>
  <p class="message">
    We heard you lost your password – happens to the best of us! But no worries, we’ve got you covered.
  </p>
  <p class="message">
    Here’s your special reset code (aka OTP):
  </p>
  <p class="otp">
    ${otp}
  </p>
  <p class="message">
    You've got 10 minutes to use it, so don’t wait too long! After that, it’ll vanish like a Snapchat message.
  </p>
  <p class="message">
    If you didn’t ask for this, just forget it – we’re not trying to mess with your day. 
  </p>
  <p class="message">
    Take care and happy resetting!
  </p>
  <p class="message">
    Kind Regards,<br>
    The Dreams International Team
  </p>
</body>
</html>
  `
};
