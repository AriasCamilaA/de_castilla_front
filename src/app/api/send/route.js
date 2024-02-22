import EmailTemplate from 'app/components/EmailTemplate';
import validateAccessToken from 'app/utilities/auth/validateAccessToken';
import { Resend } from 'resend';

const resend = new Resend('re_RiA7aqnV_3ywGkpAR9X3EuM11nqdeFzQB');

export async function POST(request) {
  try {
    const user = await validateAccessToken(request); // Pasar el request si es necesario
    console.log('User', user);

    const body = await request.json(); // Obtener el contenido del cuerpo de la solicitud
    const { contenido } = body;

    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['ariasruizcamilaa@gmail.com'],
      subject: 'Hello world',
      react: EmailTemplate({ firstName: user.nombre_usuario, contenido: contenido}),
    });

    return new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Error in POST request:', error);
    return new Response(JSON.stringify({ error: 'Error en el servidor al enviar el correo electrónico' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}