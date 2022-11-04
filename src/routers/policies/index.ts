import express from "express";
import { createPolicy } from"../../controllers/policies";
import { verifyToken } from "../../middleware/auth";
import { CREATE_POLICY_GRUPS } from "../../resources/policies/policies";
const router = express.Router();


router.put("/create", verifyToken(CREATE_POLICY_GRUPS), createPolicy)

module.exports = router