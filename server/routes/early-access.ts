import { Router } from "express";
import { db } from "../db.js";
import { earlyAccessRequests, insertEarlyAccessSchema } from "../../shared/schema.js";
import { sendEmail, emailTemplates } from "../services/email.js";
import { eq } from "drizzle-orm";

const router = Router();

// Submit early access request
router.post("/submit", async (req, res) => {
  try {
    const validatedData = insertEarlyAccessSchema.parse(req.body);
    
    const [request] = await db
      .insert(earlyAccessRequests)
      .values(validatedData)
      .returning();

    // Send email notification to hello@habigridglobal.com
    const emailData = emailTemplates.earlyAccessRequest({
      name: request.name,
      email: request.email,
      company: request.company,
      phone: request.phone,
      message: request.message,
    });
    await sendEmail({
      to: "hello@habigridglobal.com",
      subject: emailData.subject,
      html: emailData.html,
    });

    res.status(201).json({ 
      message: "Early access request submitted successfully. We'll be in touch soon!",
      request: { id: request.id, name: request.name, email: request.email }
    });
  } catch (error) {
    console.error("Early access submission error:", error);
    if (error.name === "ZodError") {
      return res.status(400).json({ 
        error: "Invalid form data",
        details: error.errors 
      });
    }
    res.status(500).json({ 
      error: "Failed to submit early access request" 
    });
  }
});

// Get all early access requests (admin)
router.get("/requests", async (req, res) => {
  try {
    const requests = await db
      .select()
      .from(earlyAccessRequests)
      .orderBy(earlyAccessRequests.createdAt);

    res.json({ requests });
  } catch (error) {
    console.error("Error fetching early access requests:", error);
    res.status(500).json({ 
      error: "Failed to fetch early access requests" 
    });
  }
});

// Update request status
router.patch("/requests/:id/status", async (req, res) => {
  try {
    const requestId = parseInt(req.params.id);
    const { status } = req.body;

    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const [updatedRequest] = await db
      .update(earlyAccessRequests)
      .set({ status })
      .where(eq(earlyAccessRequests.id, requestId))
      .returning();

    res.json({ 
      message: "Request status updated successfully",
      request: updatedRequest 
    });
  } catch (error) {
    console.error("Error updating request status:", error);
    res.status(500).json({ error: "Failed to update request status" });
  }
});

export { router as earlyAccessRoutes };