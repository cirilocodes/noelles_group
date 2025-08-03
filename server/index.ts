import express from "express";
import cors from "cors";
import { db } from "./db.js";
import { newsletterRoutes } from "./routes/newsletter.js";
import { authRoutes } from "./routes/auth.js";
import { earlyAccessRoutes } from "./routes/early-access.js";
import { contactRoutes } from "./routes/contact.js";
import { launchUpdatesRoutes } from "./routes/launch-updates.js";
import { adminRoutes } from "./routes/admin.js";
import ViteExpress from "vite-express";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/early-access", earlyAccessRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/launch-updates", launchUpdatesRoutes);
app.use("/api/admin", adminRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

const port = parseInt(process.env.PORT || "5000", 10);

// Configure ViteExpress for proper client serving
ViteExpress.config({
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
});

// Start server with ViteExpress for frontend serving
ViteExpress.listen(app, port, () => {
  console.log(`🚀 Server running on http://0.0.0.0:${port}`);
  console.log(`📱 Frontend served by ViteExpress on the same port`);
  console.log(`🔧 Admin dashboard: http://0.0.0.0:${port}/admin/login`);
});