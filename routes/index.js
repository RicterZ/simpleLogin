var express = require('express');
var router = express.Router();

var LoginHandler = require('../controllers/user');

/* GET home page. */
router.get('/', LoginHandler.index);
router.get('/api', LoginHandler.api);
router.post('/login/', LoginHandler.login);
router.post('/login2/', LoginHandler.login2);
router.post('/add/', LoginHandler.add);

router.all('/test/', LoginHandler.test);

module.exports = router;
