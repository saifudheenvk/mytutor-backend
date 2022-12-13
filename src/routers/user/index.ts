import express from "express";
import { getUser, login, registerUser } from"../../controllers/user";
const router = express.Router();



router.post("/register", registerUser)
router.post("/login", login)
router.get("/:userId", getUser)

module.exports = router