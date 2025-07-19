const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { log } = require("console");

const router = express.Router();

//@route POST/api/users/register
//@desc Register a new user
//@access Public
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //Register logic
    res.send({ name, email, password });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
