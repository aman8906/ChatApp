import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./SocketIO/server.js";

dotenv.config();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// MongoDB
const PORT = process.env.PORT || 3001;
const URI = process.env.MONGODB_URI;

try {
    mongoose.connect(URI);
    console.log("✅ Connected to MongoDB");
} catch (error) {
    console.log("❌ MongoDB Error:", error);
}

// API routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

// ✅ Root check (for Render health check)
app.get("/", (req, res) => {
  res.send("✅ SkillCart Backend is Running");
});

// Start server
server.listen(PORT, () => {
    console.log(`🚀 Server is Running on port ${PORT}`);
});
