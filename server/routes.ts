import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertNewsletterSubscriberSchema } from "@shared/schema";
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
  // Newsletter subscription route
  app.post("/api/newsletter", async (req, res) => {
    try {
      const subscriberData = insertNewsletterSubscriberSchema.parse(req.body);
      const subscriber = await storage.subscribeToNewsletter(subscriberData);

      // Send welcome email
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER || "habigrid@gmail.com",
          to: subscriberData.email,
          subject: "Welcome to HabiGrid - The Future of Real Estate is Here!",
          html: `
            <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
              <h1 style="color: #10b981; text-align: center;">Welcome to HabiGrid!</h1>
              <p>Thank you for subscribing to our newsletter. You're now part of the real estate revolution!</p>
              <p>Get ready for the ultimate destination where every real estate dream becomes reality - from finding the perfect artisan to securing your dream property.</p>
              <p>We'll keep you updated on our launch and exclusive features coming your way.</p>
              <p style="text-align: center; margin: 30px 0;">
                <strong>The HabiGrid Team</strong><br>
                <em>Building the future of real estate, one connection at a time.</em>
              </p>
            </div>
          `,
        });

        // Send notification to admin
        await transporter.sendMail({
          from: process.env.EMAIL_USER || "habigrid@gmail.com",
          to: "habigrid@gmail.com",
          subject: "New Newsletter Subscription - HabiGrid",
          html: `
            <h2>New Newsletter Subscription</h2>
            <p><strong>Email:</strong> ${subscriberData.email}</p>
            <p><strong>Subscribed at:</strong> ${new Date().toLocaleString()}</p>
          `,
        });
      } catch (emailError) {
        console.error("Email notification failed:", emailError);
      }

      res.json(subscriber);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Please provide a valid email address", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to subscribe to newsletter" });
      }
    }
  });

  app.get("/api/newsletter", async (req, res) => {
    try {
      const subscribers = await storage.getNewsletterSubscribers();
      res.json(subscribers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch newsletter subscribers" });
    }
  });



  const httpServer = createServer(app);
  return httpServer;
}
