import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookingSchema, insertContactSchema, insertReviewSchema } from "@shared/schema";
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
  // Booking routes
  app.post("/api/bookings", async (req, res) => {
    try {
      const bookingData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(bookingData);

      // Send email notification
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER || "noellesgroup4@gmail.com",
          to: "noellesgroup4@gmail.com",
          subject: `New Project Booking - ${bookingData.serviceType}`,
          html: `
            <h2>New Project Booking Received</h2>
            <p><strong>Name:</strong> ${bookingData.name}</p>
            <p><strong>Email:</strong> ${bookingData.email}</p>
            <p><strong>Country:</strong> ${bookingData.country}</p>
            <p><strong>Phone:</strong> ${bookingData.phone}</p>
            <p><strong>Service Type:</strong> ${bookingData.serviceType}</p>
            <p><strong>Project Details:</strong></p>
            <p>${bookingData.projectDetails}</p>
          `,
        });
      } catch (emailError) {
        console.error("Email notification failed:", emailError);
      }

      res.json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid booking data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create booking" });
      }
    }
  });

  app.get("/api/bookings", async (req, res) => {
    try {
      const bookings = await storage.getBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bookings" });
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
          from: process.env.EMAIL_USER || "noellesgroup4@gmail.com",
          to: "noellesgroup4@gmail.com",
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

  // Review routes
  app.post("/api/reviews", async (req, res) => {
    try {
      const reviewData = insertReviewSchema.parse(req.body);
      const review = await storage.createReview(reviewData);

      // Send email notification
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER || "noellesgroup4@gmail.com",
          to: "noellesgroup4@gmail.com",
          subject: `New Customer Review - ${reviewData.rating} Stars`,
          html: `
            <h2>New Customer Review Received</h2>
            <p><strong>Name:</strong> ${reviewData.name}</p>
            <p><strong>Email:</strong> ${reviewData.email}</p>
            <p><strong>Rating:</strong> ${reviewData.rating}/5 stars</p>
            <p><strong>Service Used:</strong> ${reviewData.serviceUsed || 'Not specified'}</p>
            <p><strong>Review:</strong></p>
            <p>${reviewData.message}</p>
            <p><em>Note: Review needs approval before appearing on the website.</em></p>
          `,
        });
      } catch (emailError) {
        console.error("Email notification failed:", emailError);
      }

      res.json(review);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid review data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create review" });
      }
    }
  });

  app.get("/api/reviews", async (req, res) => {
    try {
      const reviews = await storage.getApprovedReviews();
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
