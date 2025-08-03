import { Router } from "express";
import { db } from "../db.js";
import { launchUpdates, insertLaunchUpdateSchema, adminUsers } from "../../shared/schema.js";
import { eq, desc } from "drizzle-orm";

const router = Router();

// Create launch update
router.post("/create", async (req, res) => {
  try {
    const { title, content, authorId, isPublished } = req.body;
    
    const validatedData = insertLaunchUpdateSchema.parse({ title, content });
    
    if (!authorId) {
      return res.status(400).json({ error: "Author ID is required" });
    }

    const [update] = await db
      .insert(launchUpdates)
      .values({
        ...validatedData,
        authorId: parseInt(authorId),
        isPublished: isPublished || false
      })
      .returning();

    res.status(201).json({ 
      message: "Launch update created successfully",
      update 
    });
  } catch (error) {
    console.error("Launch update creation error:", error);
    if (error.name === "ZodError") {
      return res.status(400).json({ 
        error: "Invalid input data",
        details: error.errors 
      });
    }
    res.status(500).json({ 
      error: "Failed to create launch update" 
    });
  }
});

// Get all launch updates (admin)
router.get("/all", async (req, res) => {
  try {
    const updates = await db
      .select({
        id: launchUpdates.id,
        title: launchUpdates.title,
        content: launchUpdates.content,
        isPublished: launchUpdates.isPublished,
        createdAt: launchUpdates.createdAt,
        updatedAt: launchUpdates.updatedAt,
        author: {
          id: adminUsers.id,
          username: adminUsers.username,
          email: adminUsers.email
        }
      })
      .from(launchUpdates)
      .leftJoin(adminUsers, eq(launchUpdates.authorId, adminUsers.id))
      .orderBy(desc(launchUpdates.createdAt));

    res.json({ updates });
  } catch (error) {
    console.error("Error fetching launch updates:", error);
    res.status(500).json({ 
      error: "Failed to fetch launch updates" 
    });
  }
});

// Get published launch updates (public)
router.get("/published", async (req, res) => {
  try {
    const updates = await db
      .select({
        id: launchUpdates.id,
        title: launchUpdates.title,
        content: launchUpdates.content,
        createdAt: launchUpdates.createdAt,
        author: {
          username: adminUsers.username
        }
      })
      .from(launchUpdates)
      .leftJoin(adminUsers, eq(launchUpdates.authorId, adminUsers.id))
      .where(eq(launchUpdates.isPublished, true))
      .orderBy(desc(launchUpdates.createdAt));

    res.json({ updates });
  } catch (error) {
    console.error("Error fetching published updates:", error);
    res.status(500).json({ 
      error: "Failed to fetch published updates" 
    });
  }
});

// Update launch update
router.patch("/:id", async (req, res) => {
  try {
    const updateId = parseInt(req.params.id);
    const { title, content, isPublished } = req.body;

    const updateData: any = { updatedAt: new Date() };
    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;
    if (isPublished !== undefined) updateData.isPublished = isPublished;

    const [updatedLaunchUpdate] = await db
      .update(launchUpdates)
      .set(updateData)
      .where(eq(launchUpdates.id, updateId))
      .returning();

    res.json({ 
      message: "Launch update updated successfully",
      update: updatedLaunchUpdate 
    });
  } catch (error) {
    console.error("Error updating launch update:", error);
    res.status(500).json({ error: "Failed to update launch update" });
  }
});

// Delete launch update
router.delete("/:id", async (req, res) => {
  try {
    const updateId = parseInt(req.params.id);

    await db
      .delete(launchUpdates)
      .where(eq(launchUpdates.id, updateId));

    res.json({ message: "Launch update deleted successfully" });
  } catch (error) {
    console.error("Error deleting launch update:", error);
    res.status(500).json({ error: "Failed to delete launch update" });
  }
});

export { router as launchUpdatesRoutes };