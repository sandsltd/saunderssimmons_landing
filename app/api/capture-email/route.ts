import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { TransportOptions } from 'nodemailer';

// Use the same transporter configuration as the contact route
const transporter = nodemailer.createTransport({
  host: 'mail.saunders-simmons.co.uk',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER || 'welcome@saunders-simmons.co.uk',
    pass: process.env.SMTP_PASS || 'geCpi2-qekwiq-behsyh'
  }
} as TransportOptions);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    const submissionDate = new Date().toLocaleString('en-GB', { 
      dateStyle: 'full', 
      timeStyle: 'short' 
    });

    // Send info pack to the potential client
    await transporter.sendMail({
      from: 'welcome@saunders-simmons.co.uk',
      to: email,
      subject: "Your Free Professional Website Awaits 🚀",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: 'Arial', sans-serif; -webkit-font-smoothing: antialiased;">
            <div style="max-width: 600px; margin: 20px auto; background-color: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <!-- Header Banner -->
              <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 40px 20px; text-align: center;">
                <img src="https://saunders-simmons.co.uk/wp-content/uploads/2024/07/cropped-Whats-App-Dev.png" 
                     alt="Saunders Simmons" 
                     style="max-width: 160px; height: auto;">
                <h1 style="color: white; font-size: 32px; margin: 30px 0 10px; font-weight: 800;">
                  FREE Professional Website
                </h1>
                <p style="color: #bfdbfe; font-size: 18px; margin: 0; font-weight: 500;">
                  Just £25/month ex VAT
                </p>
              </div>

              <!-- Main Content -->
              <div style="padding: 32px 24px;">
                <!-- Value Box -->
                <div style="background-color: #f0fdf4; border-left: 4px solid #22c55e; padding: 20px; margin-bottom: 30px; border-radius: 0 8px 8px 0;">
                  <h2 style="color: #15803d; margin: 0 0 10px; font-size: 20px;">Worth Over £3,000</h2>
                  <p style="color: #166534; margin: 0; font-size: 16px;">
                    Get a premium website build completely free - just cover the monthly hosting
                  </p>
                </div>

                <!-- Transform Section -->
                <div style="background: #eff6ff; padding: 24px; border-radius: 12px; margin-bottom: 30px;">
                  <h3 style="color: #1e40af; margin: 0 0 16px; font-size: 18px;">Transform Your Business Online</h3>
                  <ul style="margin: 0; padding: 0; list-style: none;">
                    <li style="color: #1e40af; font-size: 15px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                      <span style="color: #3b82f6;">💫</span> Stand out from competitors with a premium website
                    </li>
                    <li style="color: #1e40af; font-size: 15px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                      <span style="color: #3b82f6;">💰</span> Save thousands in upfront development costs
                    </li>
                    <li style="color: #1e40af; font-size: 15px; margin-bottom: 0; display: flex; align-items: center; gap: 8px;">
                      <span style="color: #3b82f6;">🎯</span> Start attracting more customers immediately
                    </li>
                  </ul>
                </div>

                <!-- What You Get -->
                <div style="margin-bottom: 30px;">
                  <h3 style="color: #1e40af; font-size: 20px; margin: 0 0 20px;">Premium Features Included:</h3>
                  <div style="display: grid; gap: 16px;">
                    <div style="background: #f8fafc; padding: 20px; border-radius: 12px;">
                      <div style="display: flex; align-items: center; gap: 12px;">
                        <span style="color: #3b82f6; font-size: 24px;">🎨</span>
                        <div>
                          <h4 style="color: #1e40af; margin: 0 0 4px; font-size: 16px;">Bespoke Design</h4>
                          <p style="color: #64748b; margin: 0; font-size: 14px;">Custom-built to showcase your brand perfectly</p>
                        </div>
                      </div>
                    </div>
                    <div style="background: #f8fafc; padding: 20px; border-radius: 12px;">
                      <div style="display: flex; align-items: center; gap: 12px;">
                        <span style="color: #3b82f6; font-size: 24px;">⚡</span>
                        <div>
                          <h4 style="color: #1e40af; margin: 0 0 4px; font-size: 16px;">Live in 7 Days</h4>
                          <p style="color: #64748b; margin: 0; font-size: 14px;">Start generating leads within a week</p>
                        </div>
                      </div>
                    </div>
                    <div style="background: #f8fafc; padding: 20px; border-radius: 12px;">
                      <div style="display: flex; align-items: center; gap: 12px;">
                        <span style="color: #3b82f6; font-size: 24px;">📱</span>
                        <div>
                          <h4 style="color: #1e40af; margin: 0 0 4px; font-size: 16px;">Mobile-First Design</h4>
                          <p style="color: #64748b; margin: 0; font-size: 14px;">Perfect on every device your customers use</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Monthly Value -->
                <div style="background: #f8fafc; padding: 24px; border-radius: 12px; margin-bottom: 30px;">
                  <h3 style="color: #1e40af; margin: 0 0 16px; font-size: 18px;">All This for Just £25/month:</h3>
                  <ul style="margin: 0; padding: 0; list-style: none;">
                    <li style="color: #1e40af; font-size: 15px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                      <span style="color: #3b82f6;">✓</span> Premium hosting & security
                    </li>
                    <li style="color: #1e40af; font-size: 15px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                      <span style="color: #3b82f6;">✓</span> Regular updates & maintenance
                    </li>
                    <li style="color: #1e40af; font-size: 15px; margin-bottom: 0; display: flex; align-items: center; gap: 8px;">
                      <span style="color: #3b82f6;">✓</span> Ongoing technical support
                    </li>
                  </ul>
                </div>

                <!-- Smart Choice -->
                <div style="background-color: #fdf2f8; border-left: 4px solid #ec4899; padding: 20px; margin-bottom: 30px; border-radius: 0 8px 8px 0;">
                  <h2 style="color: #be185d; margin: 0 0 10px; font-size: 18px;">Why Wait?</h2>
                  <p style="color: #9d174d; margin: 0; font-size: 15px;">
                    While others pay thousands upfront, you could have your professional website live in just 7 days - completely free.
                  </p>
                </div>

                <!-- CTA -->
                <div style="text-align: center; padding: 20px 0;">
                  <a href="https://landing.saunders-simmons.co.uk#contact" 
                     style="display: inline-block; background: #2563eb; color: white; text-decoration: none; 
                            padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;
                            box-shadow: 0 4px 6px rgba(37, 99, 235, 0.2);">
                    Get Your Free Website
                  </a>
                  <p style="margin: 20px 0 0; color: #64748b;">
                    Or call us: <a href="tel:03300436608" style="color: #2563eb; text-decoration: none; font-weight: 600;">03300 436608</a>
                  </p>
                </div>
              </div>

              <!-- Footer -->
              <div style="background: #1e40af; color: white; padding: 32px 24px; text-align: center;">
                <p style="margin: 0 0 16px; font-size: 15px;">
                  Best regards,<br>
                  <strong>Nick & Dan</strong>
                </p>
                <div style="font-size: 14px; color: #bfdbfe;">
                  <a href="mailto:hello@saunders-simmons.co.uk" 
                     style="color: #bfdbfe; text-decoration: none;">
                    hello@saunders-simmons.co.uk
                  </a>
                </div>
              </div>
            </div>
          </body>
        </html>
      `
    });

    // Send notification to admin
    await transporter.sendMail({
      from: 'welcome@saunders-simmons.co.uk',
      to: 'hello@saunders-simmons.co.uk',
      subject: '📧 New Information Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <div style="background: #f8f9fa; border-radius: 12px; padding: 30px; margin: 20px 0;">
            <h1 style="color: #2563eb; margin: 0 0 20px 0; font-size: 24px;">
              New Information Request 🎯
            </h1>

            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2563eb; margin-top: 0; font-size: 18px;">Contact Details 👤</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; color: #666;"><strong>Email:</strong></td>
                  <td style="padding: 12px 0;">
                    <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">
                      ${email}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; color: #666;"><strong>Submitted:</strong></td>
                  <td style="padding: 12px 0;">${submissionDate}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      `
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 