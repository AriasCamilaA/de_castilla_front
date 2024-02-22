import EmailTemplate from 'app/components/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend('re_RiA7aqnV_3ywGkpAR9X3EuM11nqdeFzQB');

export async function POST() {
  try {
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['ariasruizcamilaa@gmail.com'],
      subject: 'Hello world',
      react: EmailTemplate({ firstName: 'John' }),
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
