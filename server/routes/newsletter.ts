import { Router } from "express";
import { db } from "../db.js";
import { newsletterSubscribers, insertNewsletterSubscriberSchema } from "../../shared/schema.js";
import { eq } from "drizzle-orm";

const router = Router();

// Subscribe to newsletter
router.post("/subscribe", async (req, res) => {
  try {
    const validatedData = insertNewsletterSubscriberSchema.parse(req.body);
    
    // Check if email already exists
    const existing = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, validatedData.email))
      .limit(1);

    if (existing.length > 0) {
      return res.status(409).json({ 
        error: "Email already subscribed to our newsletter" 
      });
    }

    const [subscriber] = await db
      .insert(newsletterSubscribers)
      .values(validatedData)
      .returning();

    res.status(201).json({ 
      message: "Successfully subscribed to newsletter",
      subscriber: { id: subscriber.id, email: subscriber.email }
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    if (error.name === "ZodError") {
      return res.status(400).json({ 
        error: "Invalid email format",
        details: error.errors 
      });
    }
    res.status(500).json({ 
      error: "Failed to subscribe to newsletter" 
    });
  }
});

// Get all subscribers (admin endpoint)
router.get("/subscribers", async (req, res) => {
  try {
    const subscribers = await db
      .select({
        id: newsletterSubscribers.id,
        email: newsletterSubscribers.email,
        createdAt: newsletterSubscribers.createdAt
      })
      .from(newsletterSubscribers)
      .orderBy(newsletterSubscribers.createdAt);

    res.json({ subscribers });
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    res.status(500).json({ 
      error: "Failed to fetch subscribers" 
    });
  }
});

export { router as newsletterRoutes };