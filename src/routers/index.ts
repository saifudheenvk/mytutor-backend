import express from "express";
const router = express.Router();

const userRouter = require("./user")
const roleRouter = require("./role")
const policyRouter = require("./policies")



  router.use("/users", userRouter)
  router.use("/roles", roleRouter)
  router.use("/policies", policyRouter)

  module.exports = router