"use strict";
const nodemailer = require("nodemailer");

const successful_registration = (mailto) =>{
  let msg = "Congratulations, Your Registration is Successful, You can proceed to login now"
  main(mailto,msg).catch(console.error);
}

const application_approved = (mailto) =>{
  let msg = "Congratulations, Your Application is Approved "
  main(mailto,msg).catch(console.error);
}

const application_rejected = (mailto) =>{
  let msg = "Sorry Your Application is Rejected, Please Try to apply again or contact our support "
  main(mailto,msg).catch(console.error);
}

const forgot_password = (mailto) =>{
  let msg = "Your Request for password has been recieved,Here is Your Secret Login Code"
  main(mailto,msg).catch(console.error);
}

async function main(mailto,messageto) {

  // Only for test
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: mailto, // list of receivers
    subject: "Hello ✔", // Subject line
    text: messageto, // plain text body
    html: messageto, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}


module.exports = {successful_registration,application_approved,application_rejected,forgot_password,main}