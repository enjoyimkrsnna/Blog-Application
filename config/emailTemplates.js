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
      color: #007bff;
    }
    .message {
      font-size: 16px;
      color: #333;
    }
  </style>
</head>
<body>
  <p class="message">
    Hey there,
  </p>
  <p class="message">
    Looks like you’ve misplaced your password – and we all know it’s not easy to find where you left it. Don’t worry, we’ve got your back!
  </p>
  <p class="message">
    Here’s your magic OTP (One-Time Password), which is way cooler than a regular Number:
  </p>
  <p class="message">
    <span class="otp">${otp}</span>
  </p>
  <p class="message">
    This OTP is like a superhero – it’s only good for the next 10 minutes. If it doesn’t get used in time, it’ll fly off into the digital sunset, never to be seen again.
  </p>
  <p class="message">
    If this email found its way to you by mistake, just ignore it. No harm done. But if you’re ready to reset your password, make sure you use this OTP before it goes on vacation!
  </p>
  <p class="message">
   Happy Resetting!
  </p>
  <p class="message">
    Kind regards,<br>
    Dreams International Team
  </p>
</body>
</html>
  `
};
