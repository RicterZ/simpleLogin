var db = require('../db'),
    crypto = require('crypto');


var _User = new db.Schema({
    username: String,
    password: String,
    apikey: String
});


_User.methods.login = function (callback) {
    var user = this.model('users').findOne({
        'username': this.username,
        'password': this.password
    }, function (err, user) {
        if (err) {return callback (err)}
        if (user) {
            return callback(null, user);
        } else {
            return callback();
        };
   });
}

var User = db.model('users', _User);

module.exports = User;
