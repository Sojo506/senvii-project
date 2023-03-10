const nodemailer = require("nodemailer");
require("dotenv").config();
const config = require("../../config.js");

const mail = {
  user: process.env.USER_EMAIL,
  password: process.env.PASSWORD_EMAIL,
};

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  tls: {
    rejectUnauthorized: false,
  },
  secure: true, // true for 465, false for other ports
  auth: {
    user: mail.user, // generated ethereal user
    pass: mail.password, // generated ethereal password
  },
});

// send mail with defined transport object
const sendEmail = async (email, token) => {
  // send mail with defined transport object
  try {
    const mailOptions = {
      from: `"Senvii 馃" ${mail.user}`,
      to: email,
      subject: "Por favor, verifica tu direcci贸n de correo electr贸nico",
      html: `
        <p>Por favor, haz clic en el siguiente enlace para verificar tu direcci贸n de correo electr贸nico:</p>
        <a href="${
          config.NODE_ENV === "dev"
            ? `http://localhost:3001/api/auth/confirm?token=${token}`
            : `https://www.senvii.com/api/auth/confirm?token=${token}`
        }" target="_blank">Confirm Account</a>
        <p>Si no has solicitado esta verificaci贸n, puedes ignorar este correo electr贸nico.</p>
        <p>Saludos,</p>
        <p>Senvii</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    return "Sent email";
  } catch (error) {
    return "Error email";
  }
};

// send mail with defined transport object
const sendEmailToResetPassword = async (email, link) => {
  // send mail with defined transport object
  try {
    const mailOptions = {
      from: `"Senvii 馃" ${mail.user}`,
      to: email,
      subject: "Cambio de contrase帽a",
      html: `
        <p>Hola,</p>
        <p>Recibes este correo electr贸nico porque has solicitado cambiar tu contrase帽a. Haz clic en el siguiente enlace para ir a la p谩gina de cambio de contrase帽a:</p>
        <a href="${link}" target="_blank">Cambiar Contrase帽a</a>
        <p>Si no has solicitado cambiar tu contrase帽a, puedes ignorar este correo electr贸nico.</p>
        <p>Saludos,</p>
        <p>Senvii</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    return "Sent email";
  } catch (error) {
    return "Error email";
  }
};

// send mail with defined transport object
const sendEmailToNotifyPdf = async (name, email, link) => {
  try {
    const mailOptions = {
      from: `"Senvii 馃" ${mail.user}`,
      to: email,
      subject: "Diagn贸stico vial generado",
      html: `
        <html>
          <head>
            <meta charset="utf-8" />
            <title>Diagn贸stico vial generado</title>
          </head>
          <body>
            <p>Hola ${name},</p>
            <p>Le informamos que se ha generado un diagn贸stico vial en formato PDF para su consulta.</p>
            <p>Puede descargar el PDF en el siguiente enlace:</p>
            <a href="${link}" target="_blank">Descargar PDF</a>
            <p>Saludos,</p>
            <p>Senvii</p>
          </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    return "Sent email";
  } catch (error) {
    return "Error email";
  }
};

module.exports = {
  sendEmail,
  sendEmailToResetPassword,
  sendEmailToNotifyPdf,
};
