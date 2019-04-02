require('dotenv').config();
const sg = require("@sendgrid/mail");
const sendgrid = require('../../config/sendgrid');

const sendVerificationEmail = (to, token) => {
  const hostUrl = `http://localhost:8088/kakaoMaster`;
  const mailOptions = {
    method: "POST",
    path: "https://api.sendgrid.com/v3/mail/send",
    to: to,
    from: "harshit.tripathi@digimantra.com",
    subject: "Verify Your Email",
    content: [{
      type: 'text/plain',
      value: `Click on this link to verify your email ${hostUrl}/about?token=${token}&email=${to}`
    }]
  };

  try {

    if (sendgrid.apiKey) {
      sg.setApiKey(sendgrid.apiKey);
      sg.send(mailOptions)
        .then(
          res.status(200).send({
            message: "Welcome to the beginning of nothingness."
          })
        )
    }
  } catch (error) {
    throw new Error("Mail sending failed");
  }
};

module.exports = sendVerificationEmail;
