import express from "express";
import {
  createAdminUser,
  getUserAccountByID,
  createUser,
  getUsers,
  loginUser,
  deleteUser,
  validateUserToken,
} from "../controllers/userController.js";

import {
  protect,
  adminAuth,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Dev ------------------------------------------------------------
router.route("/admin").post(createAdminUser);

// User ------------------------------------------------------------
// @Admin
router.route("/").post(protect, adminAuth, createUser);
router.route("/").get(protect, adminAuth, getUsers);
router.route("/:id").delete(protect, adminAuth, deleteUser);

// @Authenticated User
router.route("/:id").get(protect, getUserAccountByID);

// @Public
router.route("/login").post(loginUser);
router.route("/token/:tokenID").get(validateUserToken);

export default router;
