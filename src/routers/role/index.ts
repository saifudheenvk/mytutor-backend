import express from "express";
import { createRole } from"../../controllers/role";
import { verifyToken } from "../../middleware/auth";
import { CREATE_ROLE } from "../../resources/policies/policies";
const router = express.Router();


router.put("/create", verifyToken(CREATE_ROLE), createRole)

module.exports = router