const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Importez le module cors
const authRouter = require("./routes/auth");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors()); // Utilisez le module cors pour autoriser les requêtes de toutes les origines
app.use(authRouter);

const DB =
  "mongodb+srv://houssemzorgui10:5plXOI0r7RkgVfd7@cluster0.b8jhtwq.mongodb.net/Pim2024-Sim-2?retryWrites=true&w=majority";

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connexion réussie à la base de données MongoDB");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Serveur connecté au port ${PORT}`);
});
