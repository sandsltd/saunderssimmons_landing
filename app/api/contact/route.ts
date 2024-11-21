import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { TransportOptions } from 'nodemailer';

interface FormData {
  name: string;
  businessName: string;
  businessDescription: string;
  email: string;
  phone: string;
}

// Create email transporter
const transporter = nodemailer.createTransport({
  host: 'mail.saunders-simmons.co.uk',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || 'welcome@saunders-simmons.co.uk',
    pass: process.env.SMTP_PASS || 'geCpi2-qekwiq-behsyh'
  }
} as TransportOptions);

export async function POST(request: Request) {
  try {
    const formData: FormData = await request.json();
    const submissionDate = new Date().toLocaleString('en-GB', { 
      dateStyle: 'full', 
      timeStyle: 'short' 
    });

    // Send notification email to you with improved design
    await transporter.sendMail({
      from: 'welcome@saunders-simmons.co.uk',
      to: 'hello@saunders-simmons.co.uk',
      subject: `Boom, Someone has enquired! They're called ${formData.businessName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <div style="text-align: center; padding: 20px 0;">
            <img src="https://saunders-simmons.co.uk/wp-content/uploads/2024/07/cropped-Whats-App-Dev.png" 
                 alt="Saunders Simmons" 
                 style="max-width: 200px; height: auto;">
          </div>

          <div style="background: #f8f9fa; border-radius: 12px; padding: 30px; margin: 20px 0;">
            <h1 style="color: #2563eb; margin: 0 0 20px 0; font-size: 24px;">
              New Website Enquiry 🎯
            </h1>

            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2563eb; margin-top: 0; font-size: 18px;">Contact Details 👤</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid #eee;">
                  <td style="padding: 12px 0; color: #666; width: 140px;"><strong>Name:</strong></td>
                  <td style="padding: 12px 0;">${formData.name}</td>
                </tr>
                <tr style="border-bottom: 1px solid #eee;">
                  <td style="padding: 12px 0; color: #666;"><strong>Business:</strong></td>
                  <td style="padding: 12px 0;">${formData.businessName}</td>
                </tr>
                <tr style="border-bottom: 1px solid #eee;">
                  <td style="padding: 12px 0; color: #666;"><strong>Email:</strong></td>
                  <td style="padding: 12px 0;">
                    <a href="mailto:${formData.email}" style="color: #2563eb; text-decoration: none;">
                      ${formData.email}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; color: #666;"><strong>Phone:</strong></td>
                  <td style="padding: 12px 0;">
                    <a href="tel:${formData.phone}" style="color: #2563eb; text-decoration: none;">
                      ${formData.phone}
                    </a>
                  </td>
                </tr>
              </table>
            </div>

            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2563eb; margin-top: 0; font-size: 18px;">Business Description 💡</h3>
              <p style="line-height: 1.6; margin: 0; white-space: pre-wrap;">${formData.businessDescription}</p>
            </div>

            <div style="background: #e8f2ff; padding: 15px; border-radius: 8px; margin-top: 20px;">
              <p style="margin: 0; color: #2563eb; font-size: 14px;">
                <strong>Submitted At:</strong> ${submissionDate}
              </p>
            </div>
          </div>

          <div style="text-align: center; padding: 20px; color: #666; font-size: 14px;">
            <p style="margin: 0;">
              Quick Actions: 
              <a href="mailto:${formData.email}" style="color: #2563eb; text-decoration: none; margin: 0 10px;">
                Reply to Email
              </a> | 
              <a href="tel:${formData.phone}" style="color: #2563eb; text-decoration: none; margin: 0 10px;">
                Call Client
              </a>
            </p>
          </div>
        </div>
      `
    });

    // Send auto-reply to customer
    await transporter.sendMail({
      from: 'welcome@saunders-simmons.co.uk',
      to: formData.email,
      subject: "Thanks for your enquiry! We'll be in touch soon",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <div style="text-align: center; padding: 20px 0;">
            <img src="https://saunders-simmons.co.uk/wp-content/uploads/2024/07/cropped-Whats-App-Dev.png" 
                 alt="Saunders Simmons" 
                 style="max-width: 200px; height: auto;">
          </div>

          <div style="background: #f8f9fa; border-radius: 12px; padding: 30px; margin: 20px 0;">
            <h1 style="color: #2563eb; margin: 0 0 20px 0; font-size: 24px;">Hi ${formData.name}! 👋</h1>
            
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Thanks for telling us about ${formData.businessName}! We're really excited to learn more about your business 
              and help bring your digital vision to life. ✨
            </p>

            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              We'll be in touch within 24 hours to arrange a friendly chat about your website requirements. 
              In the meantime, here's a summary of what you've shared with us:
            </p>

            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2563eb; margin-top: 0; font-size: 18px;">Your Details 📝</h3>
              <ul style="list-style: none; padding: 0; margin: 0;">
                <li style="padding: 8px 0; border-bottom: 1px solid #eee;">
                  <strong>Business Name:</strong> ${formData.businessName}
                </li>
                <li style="padding: 8px 0; border-bottom: 1px solid #eee;">
                  <strong>Email:</strong> ${formData.email}
                </li>
                <li style="padding: 8px 0;">
                  <strong>Phone:</strong> ${formData.phone}
                </li>
              </ul>
            </div>

            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Need to reach us before then? No worries! Just reply to this email and we'll get back to you as soon as possible. 😊
            </p>
          </div>

          <div style="text-align: center; padding: 20px; color: #666;">
            <p style="margin-bottom: 10px;">Best regards,</p>
            <p style="font-weight: bold; margin: 0;">Nick & Dan @ Saunders Simmons Ltd</p>
          </div>
        </div>
      `
    });

    return NextResponse.json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error processing form:', error);
    return NextResponse.json(
      { error: 'Error processing form' },
      { status: 500 }
    );
  }
} 