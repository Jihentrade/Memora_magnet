const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  number: { type: Number, required: true, default: 0 },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "clientmodel",
    required: false,
  },
  numeroCommande: {
    type: String,
    default: function () {
      const now = new Date();
      const year = now.getFullYear();
      let month = (now.getMonth() + 1).toString().padStart(2, "0");
      return `${year}-${month}${this.incrementValue}`;
    },
  },
  modePayement: { type: String, required: false },
  montantTotal: { type: Number, required: true },
  dateCommande: { type: Date, default: Date.now },
  image: [{ type: String, required: true }],
});

module.exports = mongoose.model("commandemodel", userSchema);
