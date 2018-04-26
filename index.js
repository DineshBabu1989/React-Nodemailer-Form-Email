// server side 

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false }));

app.post('/api/form',(req,res) => {
    console.log(req.body);
    
var emailcontent = `<h3> Contact Details</h3>
                     <ul>
                      <li>name: ${req.body.name}</li>
                      <li>email : ${req.body.email}</li>
                     </ul>
                     <h2>Message</h2>
                      <p>message: ${req.body.subject}</p>
                          `    
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'user@gmail.com',
    pass: 'your password'
  },
    tls: {
        rejectUnauthorized: false
    }

});

var mailOptions = {
  from: 'emailerdinesh@gmail.com',
  to: 'emailerdinesh@gmail.com',
  subject: 'New Message',
  text: req.body.subject,
  html: emailcontent
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
    
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});