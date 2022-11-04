import express from "express";
import { createRole } from"../../controllers/role";
const router = express.Router();


router.put("/create", createRole)

module.exports = router