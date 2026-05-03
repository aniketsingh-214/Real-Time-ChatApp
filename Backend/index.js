import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./SocketIO/server.js";
import rateLimit from "express-rate-limit";
import path from "path";
import fs from "fs";

app.use(express.json());
app.use(cookieParser());

const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
app.use("/uploads", express.static(uploadsDir));
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

const PORT = process.env.PORT || 8001;
const URI = process.env.MONGODB_URI;

try {
    await mongoose.connect(URI);
    console.log("MongoDB Connected Successfully");
    
    server.listen(PORT, "0.0.0.0", () => {
        console.log(`Server is Running on port ${PORT}`);
    });
} catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
}

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: "Too many requests from this IP, please try again after 15 minutes"
});
app.use("/api", limiter);

app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});
