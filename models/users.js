var db = require('../db'),
    crypto = require('crypto');

function User(data) {
    this.username = data.username;
    this.password = data.password;
    this.apikey = null;
}


User.prototype.login = function (callback) {
    var _user = {
        username: this.username,
        password: this.password
    };

    db.open(function (err, db) {
        if (err) return callback(err);
        db.collection('users', function (err, collection) {
            if (err) {
                db.close();
                return callback(err);
            };
            collection.findOne(_user, function (err, user) {
                db.close();
                if (err) {
                    return callback(err);
                };

                if (user) {
                    return callback(null, user);
                } else {
                    return callback();
                };
            });
        });
    });
}


User.prototype.add = function (callback) {
    var _user = {
        username: this.username,
        password: this.password,
        apikey: crypto.randomBytes(30).toString('base64')
    };

    db.open(function (err, db) {
        if (err) return callback(err);
        db.collection('users', function (err, collection) {
            if (err) {
                db.close();
                return callback(err);
            };
            collection.insert(_user, function (err, user) {
                db.close();
                if (err) return callback(err);
                return callback(null, user);
            });
        });
    });
}


User.find = function (apikey, callback) {
    db.open(function (err, db) {
        if (err) return callback(err);
        db.collection('users', function (err, collection) {
            if (err) {
                db.close();
                return callback(err);
            };
            collection.findOne({
                apikey: apikey
            }, function (err, user) {
                db.close();
                if (err) return callback(err);
                return callback(null, user);
            });
        });
    });
}


module.exports = User;
