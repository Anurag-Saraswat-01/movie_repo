const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
  console.log(req.body);
});

router.post("/login", (req, res) => {
  console.log(req.body);
});
