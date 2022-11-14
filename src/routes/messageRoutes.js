import express from "express";
import {
  deleteMessage,
  getAllMessages,
  getAllReceivedMessages,
  getAllSentMessages,
  saveMessage,
} from "../controllers/messageController.js";

import {
  adminAuth,
  managerAuth,
  protect,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, adminAuth, getAllMessages);
router.route("/").post(protect, saveMessage);
router.route("/received/:id").get(protect, getAllReceivedMessages);
router.route("/sent/:id").get(protect, getAllSentMessages);

router.route("/:id").delete(protect, managerAuth, deleteMessage);

export default router;
