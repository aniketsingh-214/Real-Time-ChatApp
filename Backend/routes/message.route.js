import express from "express";
import { getMessage, sendMessage, markMessageAsRead, deleteMessage, clearChat } from "../controller/message.controller.js";
import secureRoute from "../middleware/secureRoute.js";
import upload from "../middleware/multer.config.js";

const router = express.Router();
router.post("/send/:id", secureRoute, upload.single("file"), sendMessage);
router.get("/get/:id", secureRoute, getMessage);
router.put("/read/:id", secureRoute, markMessageAsRead);
router.delete("/delete/:id", secureRoute, deleteMessage);
router.delete("/clear/:id", secureRoute, clearChat);

export default router;
