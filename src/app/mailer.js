
const nodemailer = require('nodemailer');

// Create a transporter using your Gmail account
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sugamf1@gmail.com',      // Your Gmail email address
    pass: 'jspsfvfizwgaewpo',     
  }
});

// Define the email options
const mailOptions = {
  from:'sugamf1@gmail.com', // sender's address
  to: 'j3ghtp4b@tempemail.tech', // recipient's address
  subject: 'Hello from Nodemailer',
  text: 'Hello, this is a test email sent using Nodemailer!',
  html: '<p>Hello, this is a <b>test email</b> sent using Nodemailer!</p>',

};

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error.message);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
 

// Send the email
