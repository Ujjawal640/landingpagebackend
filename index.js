 const express = require("express");
const nodemailer=require('nodemailer');
const bodyParser=require('body-parser');
const cors = require('cors');
require('dotenv').config();

const reciever_email = process.env.reciever_email;
const sender_email = process.env.sender_email;
const sender_pass = process.env.sender_pass;
const frontend_link = process.env.frontend_link;




const app = express();

// Parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
    cors({
      origin: `https://codeangofullstackcourse.netlify.app`,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    })
  );

// Set up a route to handle the form submission
app.post('/send', async(req, res) => {
  // Extract form data
  const { name, email, number,experience } = req.body;

 


  // Create a transporter for sending emails
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: sender_email,
      pass: sender_pass,
    },
});

  // Configure the email details
  const mailOptions = {
    from: sender_email,
    to: reciever_email,
    subject: 'New Form Submission',
    text: `
      Name: ${name}
      Email: ${email}
      Number: ${number}
      Experience: ${experience}
    `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});



// Route for the second form submission
app.post('/send2', async (req, res) => {
    // Extract form data
    const { name, email, number } = req.body;
  
    // Create a transporter for sending emails
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: sender_email,
        pass: sender_pass,
      },
    });
  
    // Configure the email details
    const mailOptions = {
      from: sender_email,
      to: reciever_email,
      subject: 'Request callback',
      text: `
        Name: ${name}
        Email: ${email}
        number: ${number}
      `,
    };
  
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent: ' + info.response);
        res.send('Email sent successfully');
      }
    });
  });



// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});