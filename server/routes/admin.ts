import { Router } from "express";
import { db } from "../db.js";
import { 
  adminUsers, 
  launchUpdates, 
  earlyAccessRequests, 
  contactSubmissions,
  insertLaunchUpdateSchema 
} from "../../shared/schema.js";
import { eq, desc } from "drizzle-orm";
import { authenticateToken, requireAdmin, AuthRequest } from "../middleware/auth.js";

const router = Router();

// Apply authentication to all admin routes
router.use(authenticateToken);
router.use(requireAdmin);

// Dashboard stats
router.get("/dashboard/stats", async (req: AuthRequest, res) => {
  try {
    const [
      pendingUsersCount,
      totalEarlyAccessCount,
      unreadContactsCount,
      publishedUpdatesCount
    ] = await Promise.all([
      db.select({ count: adminUsers.id }).from(adminUsers).where(eq(adminUsers.isApproved, false)),
      db.select({ count: earlyAccessRequests.id }).from(earlyAccessRequests),
      db.select({ count: contactSubmissions.id }).from(contactSubmissions).where(eq(contactSubmissions.status, 'unread')),
      db.select({ count: launchUpdates.id }).from(launchUpdates).where(eq(launchUpdates.isPublished, true))
    ]);

    res.json({
      stats: {
        pendingUsers: pendingUsersCount.length,
        totalEarlyAccess: totalEarlyAccessCount.length,
        unreadContacts: unreadContactsCount.length,
        publishedUpdates: publishedUpdatesCount.length
      }
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
});

// Launch Updates Management
router.get("/launch-updates", async (req: AuthRequest, res) => {
  try {
    const updates = await db
      .select({
        id: launchUpdates.id,
        title: launchUpdates.title,
        content: launchUpdates.content,
        isPublished: launchUpdates.isPublished,
        createdAt: launchUpdates.createdAt,
        authorId: launchUpdates.authorId,
        author: {
          id: adminUsers.id,
          username: adminUsers.username
        }
      })
      .from(launchUpdates)
      .leftJoin(adminUsers, eq(launchUpdates.authorId, adminUsers.id))
      .orderBy(desc(launchUpdates.createdAt));

    res.json({ updates });
  } catch (error) {
    console.error("Error fetching launch updates:", error);
    res.status(500).json({ error: "Failed to fetch launch updates" });
  }
});

router.post("/launch-updates", async (req: AuthRequest, res) => {
  try {
    const validatedData = insertLaunchUpdateSchema.parse(req.body);
    
    const [update] = await db
      .insert(launchUpdates)
      .values({
        ...validatedData,
        authorId: req.user!.id
      })
      .returning();

    res.status(201).json({
      message: "Launch update created successfully",
      update
    });
  } catch (error) {
    console.error("Error creating launch update:", error);
    if (error.name === "ZodError") {
      return res.status(400).json({ 
        error: "Invalid input data",
        details: error.errors 
      });
    }
    res.status(500).json({ error: "Failed to create launch update" });
  }
});

router.patch("/launch-updates/:id", async (req: AuthRequest, res) => {
  try {
    const updateId = parseInt(req.params.id);
    const { title, content, isPublished } = req.body;

    const [updatedUpdate] = await db
      .update(launchUpdates)
      .set({ 
        title, 
        content, 
        isPublished,
        updatedAt: new Date()
      })
      .where(eq(launchUpdates.id, updateId))
      .returning();

    res.json({
      message: "Launch update updated successfully",
      update: updatedUpdate
    });
  } catch (error) {
    console.error("Error updating launch update:", error);
    res.status(500).json({ error: "Failed to update launch update" });
  }
});

router.delete("/launch-updates/:id", async (req: AuthRequest, res) => {
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

// User Management
router.get("/users", async (req: AuthRequest, res) => {
  try {
    const users = await db
      .select({
        id: adminUsers.id,
        username: adminUsers.username,
        email: adminUsers.email,
        role: adminUsers.role,
        isApproved: adminUsers.isApproved,
        createdAt: adminUsers.createdAt
      })
      .from(adminUsers)
      .orderBy(desc(adminUsers.createdAt));

    res.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.patch("/users/:id/approve", async (req: AuthRequest, res) => {
  try {
    const userId = parseInt(req.params.id);
    
    const [approvedUser] = await db
      .update(adminUsers)
      .set({ 
        isApproved: true, 
        updatedAt: new Date() 
      })
      .where(eq(adminUsers.id, userId))
      .returning({
        id: adminUsers.id,
        username: adminUsers.username,
        email: adminUsers.email
      });

    res.json({ 
      message: "User approved successfully",
      user: approvedUser 
    });
  } catch (error) {
    console.error("Error approving user:", error);
    res.status(500).json({ error: "Failed to approve user" });
  }
});

router.delete("/users/:id", async (req: AuthRequest, res) => {
  try {
    const userId = parseInt(req.params.id);
    
    // Prevent self-deletion
    if (userId === req.user!.id) {
      return res.status(400).json({ error: "Cannot delete your own account" });
    }

    await db
      .delete(adminUsers)
      .where(eq(adminUsers.id, userId));

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

export { router as adminRoutes };