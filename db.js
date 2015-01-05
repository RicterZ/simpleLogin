var config = require('./config'),
    Db = require('mongoose');

module.exports = Db.connect('mongodb://' + config.host + ':' + config.port + '/' + config.database);
