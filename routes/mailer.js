const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// Ces ID et secrets doivent provenir du fichier .env.
const CLIENT_ID = '178979050607-senfpj92tdnkdlpi9lirp9ljunik82t6.apps.googleusercontent.com';
const CLEINT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04SzQBSPBkXDfCgYIARAAGAQSNwF-L9IrrMR6dGUjvVU2zr76RD7RlG34OdOnV5LvT8WhyapwjS1cblLpaHSYF44sngEsaAsKKwY';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(name, email, activationCode, password) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();



    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'zorguihoussem11@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });


    const mailTemplate = `



    
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Activation du compte</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    h1, h2, p {
      margin: 0 0 20px;
    }
    a {
      color: #007bff;
      text-decoration: none;
    }
    ul {
      padding-left: 20px;
    }
    li {
      margin-bottom: 5px;
    }
  </style>
</head>

<body>
  <div class="container">
    <h1>Account Activation</h1>
    <h2>Hello ${name}</h2>
    <p>Please confirm your email by clicking the following link:</p>
    <a href="https://pim2024-8df70.web.app">Click here</a>
    <ul>
      <li><strong>Your username:</strong> ${name}</li>
      <li><strong>Your password:</strong> ${password}</li>
      <li><strong>Your Activation Code:</strong> ${activationCode}</li>
    </ul>
  </div>
</body>
</html>


`;

    const mailOptions = {
      from: 'ChatDb <zorguihoussem11@gmail.com>',
      to: email,
      subject: 'Hello from ChatDb',
      text: `Hello ${name}, please confirm your email by clicking the following link: http://localhost:56736/`,
      html:mailTemplate,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

module.exports = { sendMail };
