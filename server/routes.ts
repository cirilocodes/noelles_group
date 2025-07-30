import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLandInquirySchema, insertContactSchema, insertEarlyAccessSchema } from "@shared/schema";
import { z } from "zod";
import nodemailer from "nodemailer";

// Email configuration
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || "noellesgroup4@gmail.com",
    pass: process.env.EMAIL_PASS || "tbfspvtoyrrhnkzn",
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Land inquiry routes
  app.post("/api/land-inquiries", async (req, res) => {
    try {
      const inquiryData = insertLandInquirySchema.parse(req.body);
      const inquiry = await storage.createLandInquiry(inquiryData);

      // Send email notification
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER || "habigrid@gmail.com",
          to: "habigrid@gmail.com",
          subject: `New Land Inquiry - ${inquiryData.landType}`,
          html: `
            <h2>New Land Inquiry Received</h2>
            <p><strong>Name:</strong> ${inquiryData.name}</p>
            <p><strong>Email:</strong> ${inquiryData.email}</p>
            <p><strong>Location:</strong> ${inquiryData.location}</p>
            <p><strong>Phone:</strong> ${inquiryData.phone}</p>
            <p><strong>Land Type:</strong> ${inquiryData.landType}</p>
            <p><strong>Budget:</strong> ${inquiryData.budget}</p>
            <p><strong>Message:</strong></p>
            <p>${inquiryData.message || 'No additional message'}</p>
          `,
        });
      } catch (emailError) {
        console.error("Email notification failed:", emailError);
      }

      res.json(inquiry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid inquiry data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create land inquiry" });
      }
    }
  });

  app.get("/api/land-inquiries", async (req, res) => {
    try {
      const inquiries = await storage.getLandInquiries();
      res.json(inquiries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch land inquiries" });
    }
  });

  // Early access routes
  app.post("/api/early-access", async (req, res) => {
    try {
      const earlyAccessData = insertEarlyAccessSchema.parse(req.body);
      const earlyAccess = await storage.createEarlyAccess(earlyAccessData);

      // Send email notification
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER || "habigrid@gmail.com",
          to: "habigrid@gmail.com",
          subject: `New Early Access Registration - ${earlyAccessData.userType}`,
          html: `
            <h2>New Early Access Registration</h2>
            <p><strong>Name:</strong> ${earlyAccessData.name}</p>
            <p><strong>Email:</strong> ${earlyAccessData.email}</p>
            <p><strong>Phone:</strong> ${earlyAccessData.phone || 'Not provided'}</p>
            <p><strong>User Type:</strong> ${earlyAccessData.userType}</p>
            <p><strong>Location:</strong> ${earlyAccessData.location || 'Not specified'}</p>
            <p><strong>Interests:</strong> ${earlyAccessData.interests || 'Not specified'}</p>
          `,
        });
      } catch (emailError) {
        console.error("Email notification failed:", emailError);
      }

      res.json(earlyAccess);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid early access data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create early access record" });
      }
    }
  });

  app.get("/api/early-access", async (req, res) => {
    try {
      const earlyAccessList = await storage.getEarlyAccessList();
      res.json(earlyAccessList);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch early access list" });
    }
  });

  // Contact routes
  app.post("/api/contacts", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);

      // Send email notification
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER || "habigrid@gmail.com",
          to: "habigrid@gmail.com",
          subject: `New Contact Message - ${contactData.subject}`,
          html: `
            <h2>New Contact Message</h2>
            <p><strong>Name:</strong> ${contactData.firstName} ${contactData.lastName}</p>
            <p><strong>Email:</strong> ${contactData.email}</p>
            <p><strong>Subject:</strong> ${contactData.subject}</p>
            <p><strong>Message:</strong></p>
            <p>${contactData.message}</p>
          `,
        });
      } catch (emailError) {
        console.error("Email notification failed:", emailError);
      }

      res.json(contact);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid contact data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create contact" });
      }
    }
  });

  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });



  const httpServer = createServer(app);
  return httpServer;
}
