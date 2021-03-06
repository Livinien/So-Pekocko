
// LES PACKAGES NPM INSTALLES //

const express = require('express');
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config()


// ROUTES PERMETTENT D'ALLER CHERCHER LES INFORMATIONS DANS L'API

const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user'); 


// UTILISER POUR LIMITER LA REPETITION DE REQUETE //

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100 
});


// CONNEXION A MANGODB // 


mongoose.connect(process.env.DB_URI,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();
app.use(helmet());



// AUTORISE 

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });




// LES ROUTES POUR ACCEDER A L'API //

app.use(bodyParser.json());

app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);
app.use(limiter);

app.use('/images', express.static(path.join(__dirname, 'images')));


module.exports = app;