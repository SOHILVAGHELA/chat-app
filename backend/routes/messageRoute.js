import express from "express";
import { getMessage, sendMessage } from "../controllers/messageController.js";
import IsAuthenticated from "../middleware/IsAuthenticated.js";

const router = express.Router();
router.route("/send/:id").post(IsAuthenticated, sendMessage);
router.route("/:id").get(IsAuthenticated, getMessage);

export default router;
