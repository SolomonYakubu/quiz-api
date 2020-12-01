const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  displayProfile: {
    type: String,
    required: true,
    default: "ninja",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});
userSchema.plugin(uniqueValidator, { message: "Email already in use" });
module.exports = mongoose.model("User", userSchema);
