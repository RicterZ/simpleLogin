var express = require('express');
var router = express.Router();

var LoginHandler = require('../controllers/user');

/* GET home page. */
router.get('/', LoginHandler.index);
router.post('/login/', LoginHandler.login);
router.post('/add/', LoginHandler.add);

module.exports = router;
