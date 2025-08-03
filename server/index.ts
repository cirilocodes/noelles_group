import express from "express";
import cors from "cors";
import { db } from "./db.js";
import { newsletterRoutes } from "./routes/newsletter.js";
import { authRoutes } from "./routes/auth.js";
import { earlyAccessRoutes } from "./routes/early-access.js";
import { contactRoutes } from "./routes/contact.js";
import { launchUpdatesRoutes } from "./routes/launch-updates.js";
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

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

const port = parseInt(process.env.PORT || "3000", 10);

// In development, use ViteExpress to serve both frontend and backend
if (process.env.NODE_ENV === "development") {
  ViteExpress.listen(app, port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
} else {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}