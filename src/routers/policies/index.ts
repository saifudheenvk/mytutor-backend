import express from "express";
import { createPolicy } from"../../controllers/policies";
const router = express.Router();


router.put("/create", createPolicy)

module.exports = router