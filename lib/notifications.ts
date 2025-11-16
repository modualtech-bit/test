import nodemailer from 'nodemailer';

// Email notification using Nodemailer
export async function sendEmailNotification(data: {
  projectId: string;
  userName: string;
  userEmail: string;
  description: string;
}) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER?.split('://')[1].split(':')[2] || 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: `Nieuwe Website Aanvraag van ${data.userName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="background: linear-gradient(to right, #E94B8A, #A855F7, #6366F1); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
            Nieuwe Modual Aanvraag
          </h2>
          <p><strong>Van:</strong> ${data.userName} (${data.userEmail})</p>
          <p><strong>Project ID:</strong> ${data.projectId}</p>
          <p><strong>Beschrijving:</strong></p>
          <p>${data.description}</p>
          <p style="margin-top: 20px;">
            <a href="${process.env.NEXTAUTH_URL}/admin/projecten/${data.projectId}" 
               style="background: #6366F1; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
              Bekijk Project
            </a>
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email notification error:', error);
    return { success: false, error };
  }
}

// WhatsApp notification using Twilio (optional)
export async function sendWhatsAppNotification(data: {
  projectId: string;
  userName: string;
}) {
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
    console.log('Twilio credentials not configured');
    return { success: false, message: 'Twilio not configured' };
  }

  try {
    // Twilio implementation would go here
    // const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    // await client.messages.create({
    //   from: process.env.TWILIO_WHATSAPP_FROM,
    //   to: process.env.TWILIO_WHATSAPP_TO,
    //   body: `Nieuwe Modual aanvraag van ${data.userName}. Project ID: ${data.projectId}`,
    // });

    return { success: true };
  } catch (error) {
    console.error('WhatsApp notification error:', error);
    return { success: false, error };
  }
}

