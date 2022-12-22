import express from "express";
import { getUser, login, registerUser, getMyDetails, updateUserDetails } from "../../controllers/user";
import { verifyToken } from "../../middleware/auth";
const router = express.Router();



router.post("/register", registerUser)
router.post("/login", login)
router.get("/myinfo", verifyToken("GET_MY_PROFILE"), getMyDetails)
router.get("/:userId", verifyToken("GET_USER_PROFILE"), getUser)
router.put("/", verifyToken("UPDATE_USER_PROFILE"), updateUserDetails)

module.exports = router