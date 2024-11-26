import express from "express";
import {
  forgetPassword,
  login,
  logout,
  resetPassword,
  signup,
  verifyEmail,
  checkAuth
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middleware/verifyToken.middleware.js";

const router = express.Router();

router.get("/check-auth",verifyJWT,checkAuth)

router.post("/signup", signup);
router.post("/verify-email", verifyEmail);
router.get("/logout", logout);
router.post("/login", login);
router.post("/forget-password", forgetPassword);
router.post("/reset-password/:token", resetPassword);
export default router;
