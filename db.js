var config = require('./config'),
    Db = require('mongodb').Db,
    Server = require('mongodb').Server;


module.exports = new Db(
    config.database,
    new Server(config.host, config.port),
    {safe: true}
);
