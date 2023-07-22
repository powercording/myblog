'use server';

import { withTryCatch } from './withService';
import Mail from 'nodemailer/lib/mailer';
import smtpTransport from '@/lib/nodemailer/email';

export const sendEmail = withTryCatch(async (email: string, payload: number) => {
  const mailOptions: Mail['options'] = {
    from: `마이블로그 <${process.env.EMAIL_ID}>`,
    to: email,
    subject: '마이블로그 인증번호 입니다.',
    text: `인증번호: ${payload}`,
    // html 꾸미기 가능?
    html: `<h1>인증번호: ${payload}</h1>`,
  };

  const result = await smtpTransport.sendMail(mailOptions);

  if (result.accepted[0] !== email) {
    return { ok: false, status: 500, error: { message: 'email send fail' } };
  }

  return { ok: true, status: 200, error: null };
});
