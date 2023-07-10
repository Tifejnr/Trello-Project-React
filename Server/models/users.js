const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 40,
  },
  email: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 250,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 1250,
  },

  isPaid: {
    type: Boolean,
    default: false,
  },

  credits: {
    type: Number,
    max: 3000000000000,
    min: 0,
    default: 0,
  },
});

// userSchema.methods.generateAuthToken = function () {
//   const token = jwt.sign({ _id: this._id }, JWT_PRIVATE_KEY);
//   return token;
// };

const user = mongoose.model("CFTUsers", userSchema);

exports.user = user;