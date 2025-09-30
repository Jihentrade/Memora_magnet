// Point d'entrée pour Vercel
console.log("🚀 Démarrage du backend Vercel...");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("MONGODB_URI défini:", !!process.env.MONGODB_URI);
console.log("JWT_SECRET défini:", !!process.env.JWT_SECRET);

const app = require("./app");

// Export pour Vercel
module.exports = app;
