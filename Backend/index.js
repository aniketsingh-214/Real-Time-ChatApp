import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./SocketIO/server.js";

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "https://real-time-chat-app-2bcv.vercel.app",  
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

const PORT = process.env.PORT;
const URI = process.env.MONGODB_URI;

try {
    await mongoose.connect(URI);
    console.log("MongoDB Connected Successfully");
} catch (error) {
    console.error("MongoDB Connection Error:", error.message);
}

app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

server.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`);
});
