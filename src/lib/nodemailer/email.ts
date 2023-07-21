import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

console.log(process.env.EMAIL_ID, '트랜스포트 아이디');
console.log(process.env.EMAIL_PASS, '트랜스포트 비밀번호');

const senderOptions: SMTPTransport.Options = {
  service: 'naver',
  host: 'smtp.naver.com',
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
