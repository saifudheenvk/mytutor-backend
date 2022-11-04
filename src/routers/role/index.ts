import express from "express";
import { createRole, updateRole } from"../../controllers/role";
const router = express.Router();



router.post("/create", createRole)
router.put("/update", updateRole)

module.exports = router