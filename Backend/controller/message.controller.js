import { getReceiverSocketId, io } from "../SocketIO/server.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const file = req.file;

    if ((!message || message.trim() === "") && !file) {
      return res.status(400).json({ error: "Message or file cannot be empty" });
    }

    const sanitizedMessage = message ? message.replace(/</g, "&lt;").replace(/>/g, "&gt;") : "";
    const { id: receiverId } = req.params;
    const senderId = req.user._id; 
    
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        members: [senderId, receiverId],
      });
    }

    const newMessageData = {
      senderId,
      receiverId,
      message: sanitizedMessage,
      status: "sent",
    };

    if (file) {
      newMessageData.fileUrl = `/uploads/${file.filename}`;
      newMessageData.fileType = file.mimetype.startsWith("image/") ? "image" : "video";
    }

    const newMessage = new Message(newMessageData);
    
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    await Promise.all([conversation.save(), newMessage.save()]); 
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: chatUser } = req.params;
    const senderId = req.user._id; 
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const messages = await Message.find({
      $or: [
        { senderId: senderId, receiverId: chatUser },
        { senderId: chatUser, receiverId: senderId }
      ]
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json(messages.reverse());
  } catch (error) {
    console.log("Error in getMessage", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const markMessageAsRead = async (req, res) => {
  try {
    const { id: messageId } = req.params;
    const message = await Message.findById(messageId);
    if (!message) return res.status(404).json({ error: "Message not found" });

    message.status = "read";
    await message.save();

    const senderSocketId = getReceiverSocketId(message.senderId);
    if (senderSocketId) {
      io.to(senderSocketId).emit("messageRead", { messageId, status: "read" });
    }

    res.status(200).json(message);
  } catch (error) {
    console.log("Error in markMessageAsRead", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { id: messageId } = req.params;
    const userId = req.user._id;

    const message = await Message.findById(messageId);
    if (!message) return res.status(404).json({ error: "Message not found" });

    if (message.senderId.toString() !== userId.toString()) {
      return res.status(403).json({ error: "Unauthorized to delete this message" });
    }

    await Message.findByIdAndDelete(messageId);

    const receiverSocketId = getReceiverSocketId(message.receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("messageDeleted", messageId);
    }

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.log("Error in deleteMessage", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const clearChat = async (req, res) => {
  try {
    const { id: chatUserId } = req.params;
    const userId = req.user._id;

    await Message.deleteMany({
      $or: [
        { senderId: userId, receiverId: chatUserId },
        { senderId: chatUserId, receiverId: userId }
      ]
    });

    res.status(200).json({ message: "Chat cleared successfully" });
  } catch (error) {
    console.log("Error in clearChat", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
