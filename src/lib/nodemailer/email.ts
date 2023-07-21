import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const senderOptions: SMTPTransport.Options = {
  service: "naver",
  host: "smtp.naver.com",
  port: 587,
  auth: {
    user: `${process.env.EMAIL_ID}`,
    pass: `${process.env.EMAIL_PASS}`,
  },
  secure: false,
  requireTLS: true,
};

const smtpTransport = nodemailer.createTransport(senderOptions);
export default smtpTransport;
