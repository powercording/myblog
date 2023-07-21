import smtpTransport from '@/lib/nodemailer/email';
import { NextResponse } from 'next/server';
import Mail from 'nodemailer/lib/mailer';

export async function POST(req: Request) {
  const { email, payload } = await req.json();

  console.log('메일 힛');
  console.log(process.env.EMAIL_ID);

  const mailOptions: Mail['options'] = {
    from: `마이블로그 <${process.env.EMAIL_ID}>`,
    to: email,
    subject: '마이블로그 인증번호 입니다.',
    text: `인증번호: ${payload}`,
    // html 꾸미기 가능?
    html: `<h1>인증번호: ${payload}</h1>`,
  };

  console.log('메일옵션', mailOptions);
  console.log('트랜스포트', smtpTransport);
  smtpTransport.sendMail(mailOptions);

  return NextResponse.json({ message: 'password send' });
}
