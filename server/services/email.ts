import nodemailer from 'nodemailer';

// Create email transporter using Hostinger SMTP
const transporter = nodemailer.createTransport({
  host: process.env.HOSTINGER_SMTP_HOST,
  port: parseInt(process.env.HOSTINGER_SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.HOSTINGER_EMAIL_USER,
    pass: process.env.HOSTINGER_EMAIL_PASS,
  },
});

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    await transporter.sendMail({
      from: process.env.HOSTINGER_EMAIL_USER,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
}

// Email templates
export const emailTemplates = {
  earlyAccessRequest: (data: { name: string; email: string; company?: string; phone?: string; message?: string }) => ({
    subject: 'New Early Access Request - HabiGrid',
    html: `
      <h2>New Early Access Request</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
      ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
      ${data.message ? `<p><strong>Message:</strong> ${data.message}</p>` : ''}
      <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
    `,
  }),

  contactForm: (data: { name: string; email: string; company?: string; phone?: string; subject: string; message: string }) => ({
    subject: `Contact Form: ${data.subject} - HabiGrid`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
      ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
      <p><strong>Subject:</strong> ${data.subject}</p>
      <p><strong>Message:</strong> ${data.message}</p>
      <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
    `,
  }),

  adminApprovalRequest: (data: { username: string; email: string; role: string }) => ({
    subject: 'New Admin User Registration - Approval Required',
    html: `
      <h2>New Admin User Registration</h2>
      <p>A new user has requested admin access:</p>
      <p><strong>Username:</strong> ${data.username}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Role:</strong> ${data.role}</p>
      <p><strong>Registered:</strong> ${new Date().toLocaleString()}</p>
      <p>Please log into the admin dashboard to approve or reject this request.</p>
    `,
  }),

  adminApprovalNotification: (data: { username: string; email: string }) => ({
    subject: 'Admin Account Approved - HabiGrid',
    html: `
      <h2>Admin Account Approved</h2>
      <p>Hello ${data.username},</p>
      <p>Your admin account for HabiGrid has been approved! You can now login to the admin dashboard.</p>
      <p><strong>Username:</strong> ${data.username}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p>You can access the admin dashboard at: <a href="https://habigrid.com/admin/login">Admin Login</a></p>
      <p>Welcome to the HabiGrid admin team!</p>
    `,
  }),
};