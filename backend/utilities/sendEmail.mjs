import nodemailer from 'nodemailer';

export const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      auth: {
        user: process.env.SMTP_SENDER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: `"Blockchain transactions" <${process.env.SMTP_SENDER}>`,
      to: options.recipient,
      subject: options.subject,
      text: 'email should be sent',
    });
  } catch (error) {
    throw new Error(`Could not send the email: ${error}`);
  }
};
