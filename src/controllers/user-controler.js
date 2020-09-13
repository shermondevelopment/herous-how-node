const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const authConfig = require("../middleware/auth");
const User = require("../models/user-model");

const router = express.Router();

function generateToken(params) {
  return jwt.sign({ params }, process.env.JWT_KEY, { expiresIn: 86400 });
}

router.post("/signup", async (request, response) => {
  try {
    const { email } = request.body;
    if (await User.findOne({ email })) {
      return response.status(400).send({ error: "User already exists" });
    }
    const user = await User.create(request.body);
    user.password = undefined;
    response.send({
      user,
      token: generateToken({ id: user.id }),
    });
  } catch (err) {
    return response.status(400).send({ error: "Registration Failed" });
  }
});

router.post("/signin", async (request, response) => {
  const { email, password } = request.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return response.status(400).send({ error: "User Not Found" });
  }

  if (!await bcrypt.compare(password, user.password)){
    return response.status(400).send({ error: "Invalid Password" });
  }
  user.password = undefined;
  response.send({ user, token: generateToken({ id: user.id }) });
});

module.exports = (app) => app.use("/user", router);
