const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("🔍 Tentative de connexion MongoDB...");
    console.log("MONGODB_URI défini:", !!process.env.MONGODB_URI);

    await mongoose.connect(process.env.MONGODB_URI, {});
    console.log("✅ Base de données connectée avec succès !");
  } catch (error) {
    console.log("❌ ERREUR CONNEXION DB:", error.message);
    console.log("MONGODB_URI disponible:", !!process.env.MONGODB_URI);
  }
};

module.exports = connectDB;
