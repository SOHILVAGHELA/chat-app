import express from "express";
import {
  getOtherUser,
  login,
  logout,
  register,
} from "../controllers/userController.js";
import IsAuthenticated from "../middleware/IsAuthenticated.js";
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/").get(IsAuthenticated, getOtherUser);
export default router;
