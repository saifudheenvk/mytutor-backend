import express from "express";
import { login, registerUser } from"../../controllers/user";
const router = express.Router();



router.post("/register", registerUser)
router.post("/login", login)

module.exports = router