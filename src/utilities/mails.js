import nodemailer from 'nodemailer'

const sendMail = async ({to, name, subject, body}) => {
    const { SMTP_PASSWORD, SMTP_EMAIL } = process.env;
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: SMTP_EMAIL,
            pass: SMTP_PASSWORD,
        }
    });
    try {
        const testResult = await transport.verify();
        console.log(testResult)
    } catch (error) {
        console.log(error)
        return;
    }
    try {
        const sentResult = await transport.sendMail({
            from: SMTP_EMAIL,
            to: to,
            subject: subject,
            html: body,
        });
        console.log(sentResult);
    } catch (error) {
        console.log(error)
    }
}

export default sendMail;