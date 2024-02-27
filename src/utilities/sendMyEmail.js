"use server"  
import sendMail from './mails'
// Enviamos el correo electrónico
const sendMyEmail = async ({to, subject, body}) => {
  console.log("enviando email")
  await sendMail({
    to: to,
    subject: subject,
    body: body
  })
}

export default sendMyEmail