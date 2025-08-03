import { Router } from "express";
import { db } from "../db.js";
import { earlyAccessRequests, insertEarlyAccessSchema } from "../../shared/schema.js";
import { sendEmailNotification } from "../services/email.js";
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
    await sendEmailNotification({
      to: "hello@habigridglobal.com",
      subject: "New Early Access Request - HabiGrid",
      html: `
        <h2>New Early Access Request</h2>
        <p><strong>Name:</strong> ${request.name}</p>
        <p><strong>Email:</strong> ${request.email}</p>
        ${request.company ? `<p><strong>Company:</strong> ${request.company}</p>` : ''}
        ${request.phone ? `<p><strong>Phone:</strong> ${request.phone}</p>` : ''}
        ${request.message ? `<p><strong>Message:</strong> ${request.message}</p>` : ''}
        <p><strong>Submitted:</strong> ${new Date(request.createdAt).toLocaleString()}</p>
        
        <p>You can manage this request in the admin panel.</p>
      `,
      text: `
        New Early Access Request
        
        Name: ${request.name}
        Email: ${request.email}
        ${request.company ? `Company: ${request.company}` : ''}
        ${request.phone ? `Phone: ${request.phone}` : ''}
        ${request.message ? `Message: ${request.message}` : ''}
        Submitted: ${new Date(request.createdAt).toLocaleString()}
      `
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