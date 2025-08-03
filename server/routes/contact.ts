import { Router } from "express";
import { db } from "../db.js";
import { contactSubmissions, insertContactSchema } from "../../shared/schema.js";
import { sendEmailNotification } from "../services/email.js";
import { eq } from "drizzle-orm";

const router = Router();

// Submit contact form
router.post("/submit", async (req, res) => {
  try {
    const validatedData = insertContactSchema.parse(req.body);
    
    const [submission] = await db
      .insert(contactSubmissions)
      .values(validatedData)
      .returning();

    // Send email notification to hello@habigridglobal.com
    await sendEmailNotification({
      to: "hello@habigridglobal.com",
      subject: `New Contact Form: ${submission.subject} - HabiGrid`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${submission.name}</p>
        <p><strong>Email:</strong> ${submission.email}</p>
        ${submission.company ? `<p><strong>Company:</strong> ${submission.company}</p>` : ''}
        ${submission.phone ? `<p><strong>Phone:</strong> ${submission.phone}</p>` : ''}
        <p><strong>Subject:</strong> ${submission.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${submission.message.replace(/\n/g, '<br>')}</p>
        <p><strong>Submitted:</strong> ${new Date(submission.createdAt).toLocaleString()}</p>
        
        <p>You can manage this message in the admin panel.</p>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${submission.name}
        Email: ${submission.email}
        ${submission.company ? `Company: ${submission.company}` : ''}
        ${submission.phone ? `Phone: ${submission.phone}` : ''}
        Subject: ${submission.subject}
        Message: ${submission.message}
        Submitted: ${new Date(submission.createdAt).toLocaleString()}
      `
    });

    res.status(201).json({ 
      message: "Message sent successfully. We'll get back to you soon!",
      submission: { id: submission.id, name: submission.name, subject: submission.subject }
    });
  } catch (error) {
    console.error("Contact submission error:", error);
    if (error.name === "ZodError") {
      return res.status(400).json({ 
        error: "Invalid form data",
        details: error.errors 
      });
    }
    res.status(500).json({ 
      error: "Failed to submit contact form" 
    });
  }
});

// Get all contact submissions (admin)
router.get("/submissions", async (req, res) => {
  try {
    const submissions = await db
      .select()
      .from(contactSubmissions)
      .orderBy(contactSubmissions.createdAt);

    res.json({ submissions });
  } catch (error) {
    console.error("Error fetching contact submissions:", error);
    res.status(500).json({ 
      error: "Failed to fetch contact submissions" 
    });
  }
});

// Update submission status
router.patch("/submissions/:id/status", async (req, res) => {
  try {
    const submissionId = parseInt(req.params.id);
    const { status } = req.body;

    if (!["unread", "read", "responded"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const [updatedSubmission] = await db
      .update(contactSubmissions)
      .set({ status })
      .where(eq(contactSubmissions.id, submissionId))
      .returning();

    res.json({ 
      message: "Submission status updated successfully",
      submission: updatedSubmission 
    });
  } catch (error) {
    console.error("Error updating submission status:", error);
    res.status(500).json({ error: "Failed to update submission status" });
  }
});

export { router as contactRoutes };