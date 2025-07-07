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
  montantTotal: { type: Number, required: true },
  dateCommande: { type: Date, default: Date.now },
  images: {
    type: [String], // tableau de chaînes de caractères (URL ou chemins d’accès)
    required: true,
    validate: [(val) => val.length > 8, 'Au moins une image est requise'],
  },
});

module.exports = mongoose.model("commandemodel", userSchema);
