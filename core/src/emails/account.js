const sgMail = require("@sendgrid/mail");

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendWelcomeEmail = (emailId, name) => {
  if (SENDGRID_API_KEY) {
    sgMail.send({
      to: emailId,
      from: "sasi.manic90@gmail.com",
      subject: "Welcome to task manager app",
      text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
    });
  }
};

const sendCancellationEmail = (emailId, name) => {
  if (SENDGRID_API_KEY) {
    sgMail.send({
      to: emailId,
      from: "sasi.manic90@gmail.com",
      subject: "Sorry to see you go!",
      text: `Goodbye, ${name}. Hope to see you soon!!.`,
    });
  }
};

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail,
};
