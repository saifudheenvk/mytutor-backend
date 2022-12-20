import express from "express";
import { getUser, login, registerUser } from "../../controllers/user";
import { verifyToken } from "../../middleware/auth";
const router = express.Router();



router.post("/register", registerUser)
router.post("/login", login)
router.get("/myinfo", verifyToken("GET_MY_PROFILE"), getUser)

module.exports = router