const mongoose = require("../database/mongodb");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const UserSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false },
  usersActive: { type: Boolean, default: false },
  createAt: { type: Date, default: Date.now },
});

UserSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
