//This api would query the database for the respected user's moru's balance

// const cron = require('node-cron');
// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: 'your-email-service', // e.g., Gmail, Yahoo
//   auth: {
//     user: 'your-email@gmail.com',
//     pass: 'your-email-password',
//   },
// });

// // Define the schedule for running the task every 32 days
// // '0 0 */32 * *' means it will trigger at midnight every 32nd day
// cron.schedule('0 0 */32 * *', () => {
//   const reminderMessage = "Don't forget to do something every 32 days!";

//   const mailOptions = {
//     from: 'your-email@gmail.com',
//     to: 'recipient-email@example.com',
//     subject: 'Custom Reminder',
//     text: reminderMessage,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error('Error sending email:', error);
//     } else {
//       console.log('Email sent:', info.response);
//     }
//   });
// });

// console.log('Custom reminder scheduler started.');
// const cron = require('node-cron');
// const nodemailer = require('nodemailer');

// // Create a transporter using Gmail SMTP
// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: 'your-email@gmail.com',      // Your Gmail email address
//     pass: 'your-gmail-password',       // Your Gmail password or app-specific password
//   },
// });

// // Define the email message
// const mailOptions = {
//   from: 'your-email@gmail.com',        // Sender's email address
//   to: ['recipient1@example.com', 'recipient2@example.com'],  // An array of recipient email addresses
//   subject: 'Hello from Node.js',      // Email subject
//   text: 'This is a test email sent from Node.js with nodemailer.', // Email body (plaintext)
//   // You can also use "html" property for HTML content
// };

// // Schedule the email to be sent every 32 days
// cron.schedule('0 0 */32 * *', () => {
//   // Send the email
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error('Error sending email:', error);
//     } else {
//       console.log('Email sent:', info.response);
//     }
//   });
// });

// console.log('Email scheduler started.');











const cron = require('node-cron');
import { NextResponse } from 'next/server';
const nodemailer = require('nodemailer');


export async function GET(request:Request,res:any) {


// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL,      // Your Gmail email address
    pass: process.env.APPPASSWORD,       // Your Gmail password or app-specific password
  },
});

// Define the email message
const mailOptions = {
  from: process.env.EMAIL,        // Sender's email address
  to: ['psugam75@gmail.com'],  // An array of recipient email addresses
  subject: 'Your automatice billing',      // Email subject
  text: 'Your automatic billing has been started', // Email body (plaintext)
  // You can also use "html" property for HTML content
};

// Schedule the email to be sent every 32 days
cron.schedule('0 0 */31 * *', () => {
  // Send the email
  transporter.sendMail(mailOptions, (error:any, info:any) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
});

console.log('Email scheduler started.');


 let data=await transporter.sendMail(mailOptions, (error:any, info:any) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });

    return NextResponse.json({msg:'success'});

}

