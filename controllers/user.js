var User = require('../models/users'),
    multiparty = require('multiparty');


function LoginHandler () {
    // nothing here
};


LoginHandler.index = function (request, response) {
    response.send('This is simpleLogin app!');
}


LoginHandler.login = function (request, response) {
    var user = new User({
        username: request.body.username,
        password: request.body.password
    });
    user.login(function (err, user) {
        console.log(user);
        if (err) {
            response.status(500).json({message: err.toString()})
            return;
        };
        if (!user) {
            response.status(401).json({message: 'Login Fail'});
            return;
        };
        response.status(200).json({user: 'Hello ' + user.username});
    });
};


/*
LoginHandler.api = function (request, response) {
    var apikey = request.query.apikey;
    User.find(apikey, function (err, user) {
        if (err) {
            response.status(500).json({message: err.toString()});
            return;
        };
        if (!user) {
            response.status(401).json({message: 'API Key is not correct'});
            return;
        };
        response.status(200).json({message: 'Hello ' + user.username});
    });
}*/


LoginHandler.add = function (request, response) {
    var user = new User({
        username: request.body.username,
        password: request.body.password
    });
    user.save(function (err, user) {
        if (err) {
            response.status(500).json({message: err.toString()});
            return;
        };
        response.status(200).json({user: user});
    });
};


module.exports = LoginHandler;
