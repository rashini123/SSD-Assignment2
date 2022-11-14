import express from "express";
import {
  downloadDocument,
  saveDocument,
  viewAllDocuments,
} from "../controllers/documentController.js";

import {
  adminAuth,
  managerAuth,
  protect,
} from "../middleware/authMiddleware.js";

import { fileUpload } from "../middleware/fileUploadMiddleware.js";
import cors from "cors";

const router = express.Router();

router.route("/").post(protect, managerAuth, fileUpload, saveDocument);
router.route("/").get(protect, managerAuth, viewAllDocuments);
router.route("/download/:id/:token").get(
  cors({
    exposedHeaders: ["Content-Disposition"],
  }),
  downloadDocument
);

export default router;
