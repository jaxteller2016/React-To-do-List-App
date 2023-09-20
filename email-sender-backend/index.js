const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;
const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

app.use(cors());
app.use(bodyParser.json());

// Set the SendGrid API key
sgMail.setApiKey(SENDGRID_API_KEY);

// Define a route to handle POST requests from your React app
app.post('/send-email', async (req, res) => {
  const { email, tasks, selectedDate } = req.body;

  // Create the email template with tasks data (you can use an HTML template engine like EJS or a library like `html-to-text`)
  const emailTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Tasks for ${selectedDate}</title>
    </head>
    <body>
        <h1>Your Tasks for ${selectedDate}</h1>
        <ul>
            ${tasks.map((task) => `<li>${task.name}</li>`).join(' ')}
        </ul>
    </body>
    </html>
  `;

  const msg = {
    to: email,
    from: EMAIL_ADDRESS,
    subject: 'Your Daily Tasks',
    text: 'This is a test email.',
    html: emailTemplate
  };

  try {
    // Send the email
    await sgMail.send(msg);
    console.log('Email sent successfully');
    res.status(200).json({ message: 'Email sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error.response.body);
    res.status(500).json({ message: 'Email could not be sent.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
