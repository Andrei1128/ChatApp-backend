import nodemailer from "nodemailer";

export default async function sendEmail(
  to: string,
  subject: string,
  text: string
) {
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    secure: false,
    auth: {
      user: "nicolaev.andrei09@gmail.com",
      pass: "xbQrgs1EyASfM0c9",
    },
  });

  const message = {
    from: "nicolaev.andrei09@gmail.com",
    to,
    subject,
    text,
  };

  await transporter.sendMail(message);
}
