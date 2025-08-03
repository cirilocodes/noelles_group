import { Router } from "express";
import { db } from "../db.js";
import { adminUsers, insertAdminUserSchema } from "../../shared/schema.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

const router = Router();

// Register admin user
router.post("/register", async (req, res) => {
  try {
    const validatedData = insertAdminUserSchema.parse(req.body);
    
    // Check if username or email already exists
    const existing = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.username, validatedData.username))
      .limit(1);

    if (existing.length > 0) {
      return res.status(409).json({ 
        error: "Username already exists" 
      });
    }

    const existingEmail = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.email, validatedData.email))
      .limit(1);

    if (existingEmail.length > 0) {
      return res.status(409).json({ 
        error: "Email already exists" 
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(validatedData.password, saltRounds);

    const [user] = await db
      .insert(adminUsers)
      .values({
        username: validatedData.username,
        email: validatedData.email,
        password: hashedPassword,
        role: validatedData.role || "admin",
        isApproved: false // Requires approval
      })
      .returning({ 
        id: adminUsers.id, 
        username: adminUsers.username, 
        email: adminUsers.email,
        role: adminUsers.role,
        isApproved: adminUsers.isApproved
      });

    res.status(201).json({ 
      message: "Registration request submitted. Awaiting approval from hello@habigridglobal.com",
      user 
    });
  } catch (error) {
    console.error("Registration error:", error);
    if (error.name === "ZodError") {
      return res.status(400).json({ 
        error: "Invalid input data",
        details: error.errors 
      });
    }
    res.status(500).json({ 
      error: "Failed to register user" 
    });
  }
});

// Login admin user
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ 
        error: "Username and password are required" 
      });
    }

    const [user] = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.username, username))
      .limit(1);

    if (!user) {
      return res.status(401).json({ 
        error: "Invalid credentials" 
      });
    }

    if (!user.isApproved) {
      return res.status(401).json({ 
        error: "Account pending approval from hello@habigridglobal.com" 
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ 
        error: "Invalid credentials" 
      });
    }

    res.json({ 
      message: "Login successful",
      user: { 
        id: user.id, 
        username: user.username, 
        email: user.email,
        role: user.role 
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      error: "Failed to login" 
    });
  }
});

// Get pending users (for approval)
router.get("/pending-users", async (req, res) => {
  try {
    const pendingUsers = await db
      .select({
        id: adminUsers.id,
        username: adminUsers.username,
        email: adminUsers.email,
        role: adminUsers.role,
        createdAt: adminUsers.createdAt
      })
      .from(adminUsers)
      .where(eq(adminUsers.isApproved, false));

    res.json({ pendingUsers });
  } catch (error) {
    console.error("Error fetching pending users:", error);
    res.status(500).json({ error: "Failed to fetch pending users" });
  }
});

// Approve user
router.post("/approve-user/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    
    const [approvedUser] = await db
      .update(adminUsers)
      .set({ isApproved: true, updatedAt: new Date() })
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

export { router as authRoutes };