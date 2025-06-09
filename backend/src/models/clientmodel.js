const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    unique: false,
  },
  cin: {
    type: String,
    required: false,
  },
  address: {
    rue: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: true,
    },
    postalCode: {
      type: Number,
      required: false,
    },
  },
  fisc: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("clientmodel", userSchema);
