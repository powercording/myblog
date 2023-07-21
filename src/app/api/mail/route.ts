import smtpTransport from '@/lib/nodemailer/email';
import { NextResponse } from 'next/server';
import Mail from 'nodemailer/lib/mailer';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { email, payload } = await req.json();
  const mailOptions: Mail['options'] = {
    from: `마이블로그 <${process.env.EMAIL_ID}>`,
    to: email,
    subject: '마이블로그 인증번호 입니다.',
    text: `인증번호: ${payload}`,
    // html 꾸미기 가능?
    html: `<h1>인증번호: ${payload}</h1>`,
  };

  const result = await smtpTransport.sendMail(mailOptions);
  console.log('제발되라');
  if (result.accepted[0] !== email) {
    return NextResponse.json({ ok: false, status: 500, error: { message: 'email send fail' } });
  }

  return NextResponse.json({ ok: true, status: 200, error: null });
}
