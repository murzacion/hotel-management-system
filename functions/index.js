const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "murzacion5@gmail.com",
    pass: "",
  },
});

exports.sendEmail = functions.firestore
    .document("email/{emailId}")
    .onCreate((snap, context) => {
      const mailOptions = {
        from: "murzacion5@gmail.com",
        to: `${snap.data().allEmails}`,
        subject: `${snap.data().subject}`,
        html: `<h1>Hello</h1>
                                <p>
                                   <b>${snap.data().text}</b><br>
                                </p>`,
      };


      return transporter.sendMail(mailOptions, (error, data) => {
        if (error) {
          console.log("don't sent!");
          return;
        }
        console.log("Sent!");
      });
    });
