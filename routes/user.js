
// CE QUI PERMET DE FAIRE DES REQUETES AU SERVEUR MANGODB //

const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const password = require('../middleware/password-middle')

router.post('/signup', password, userCtrl.signup);
router.post('/login', userCtrl.login);


module.exports = router;



