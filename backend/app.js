const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require('path');

const dotEnv = require("dotenv").config();
const userMGDB = (process.env.USER);
const passwordMGDB = (process.env.PASSWORD);


const stuffRoutes = require("./routes/stuff");
const userRoutes = require("./routes/user");


//DOT.ENV
//password validator exige un nombre particulier de caractères, et peut exiger d'ajouter des
//caractères spéciaux/chiffre/MAJ

// HELMET Valider les headers des requêtes
// Rate limit limite les injections SQL


mongoose.connect(`mongodb+srv://${userMGDB}:${passwordMGDB}@mon-vieux-grimoire.nujfefc.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB Atlas réussie !!!'))
  .catch(() => console.log('Connexion à MongoDB Atlas échouée !'));

const app = express();



app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());
// app.use(bodyParser.json());

app.use("/api/books", stuffRoutes);
app.use("/api/auth", userRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
