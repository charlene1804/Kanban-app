// TOUJOURS les envvars en premier
require('dotenv').config();
const express = require('express');
const router = require('./app/router');

// on crée une application express
const app = express();

// Quelques middlewares bien pratique
app.use( express.urlencoded({extended: true}) );

// ROUTAGE
app.use(router);

// on définit le PORT d'écoute 
const PORT = process.env.PORT || 3000;

// on lance l'application
app.listen(PORT, () => {
    console.log(`API Listening on ${PORT}`);
});