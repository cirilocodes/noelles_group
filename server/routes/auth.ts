import { Router } from "express";
import { db } from "../db.js";
import { users, insertUserSchema } from "../../shared/schema.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

const router = Router();

// Register user
router.post("/register", async (req, res) => {
  try {
    const validatedData = insertUserSchema.parse(req.body);
    
    // Check if username already exists
    const existing = await db
      .select()
      .from(users)
      .where(eq(users.username, validatedData.username))
      .limit(1);

    if (existing.length > 0) {
      return res.status(409).json({ 
        error: "Username already exists" 
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(validatedData.password, saltRounds);

    const [user] = await db
      .insert(users)
      .values({
        username: validatedData.username,
        password: hashedPassword
      })
      .returning({ id: users.id, username: users.username });

    res.status(201).json({ 
      message: "User registered successfully",
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

// Login user
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
      .from(users)
      .where(eq(users.username, username))
      .limit(1);

    if (!user) {
      return res.status(401).json({ 
        error: "Invalid credentials" 
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
      user: { id: user.id, username: user.username }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      error: "Failed to login" 
    });
  }
});

export { router as authRoutes };