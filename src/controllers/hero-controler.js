const express = require("express");

const authConfig = require('../middleware/auth');

const Hero = require("../models/heros-model");

const router = express.Router();


router.get("/", async (request, response) => {
  const listHeros = await Hero.find({});
  response.status(200).json({ listHeros });
});

router.post("/register", authConfig, async (request, response) => {
  const { name, power } = request.body;

  const searchHero = await Hero.findOne({ name }).exec();

  if (searchHero) {
    response.status(400).json({ error: "Hero  already Exists" });
  }
  const register = await Hero.create({ name, power });

  response.json({ herous: "successfully registered" });
});

router.put("/update/:id", authConfig ,async (request, response) => {
  const herous = await Hero.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
  });
  return response.json(herous);
});

router.delete("/delete/:id", authConfig,async (request, response) => {
  await Hero.findByIdAndRemove(request.params.id);
  return response.json({sucess:true});
});

module.exports = (app) => app.use("/herous", router);
