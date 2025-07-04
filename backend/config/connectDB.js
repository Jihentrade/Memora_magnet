const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Vérifier si l'URL MongoDB est définie

    await mongoose.connect(process.env.MONGO_URL, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
    });
    console.log("✅ La base de données MongoDB est connectée sur:", mongoUrl);
  } catch (error) {
    console.log("❌ ERREUR DE CONNEXION À LA BASE DE DONNÉES:");
  }
};

module.exports = connectDB;
