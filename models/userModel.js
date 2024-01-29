const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: { type: String },
  github: { type: String },
  linkedin: { type: String },
});

const users = model("users", userSchema);

module.exports = users;
