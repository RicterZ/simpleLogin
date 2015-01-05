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


LoginHandler.login2 = function (request, response) {
    var user = new User({
        username: request.body.username,
        password: request.body.password
    });
    user.login(function (err, user) {
        if (err) {
            response.status(500).json({message: err.toString()})
            return;
        };
        if (!user) {
            response.status(401).json({message: 'User not exist'});
            return;
        };
        if (user.password === request.body.password) {
            response.status(200).json({user: 'Hello ' + user.username});
        } else {
            response.status(401).json({message: 'Password is not correct'});
        };
    });
};


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
}


LoginHandler.add = function (request, response) {
    var user = new User({
        username: request.body.username,
        password: request.body.password
    });
    user.add(function (err, user) {
        if (err) {
            response.status(500).json({message: err.toString()});
            return;
        };
        response.status(200).json({user: user});
    });
};


LoginHandler.test = function (request, response) {
    console.log(request.query);
    console.log(request.params);
    console.log(request.body);
    var form = new multiparty.Form();
    form.parse(request, function(err, fields, files) {
        console.log(fields);
        console.log(files);
    });
    response.status(200).json({});
}

module.exports = LoginHandler;
