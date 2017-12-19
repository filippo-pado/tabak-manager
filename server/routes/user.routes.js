var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    User = require('../models/User.js');

/*
POST /login
POST /register
*/

/* LOGIN */
router.post('/login', function (req, res) {
    //User.findOne({ username: req.body.username.toLowerCase()}, 'username hashedPassword', function (err, user) {
    User.findOne({}, 'username hashedPassword', function (err, user) {
        if (err) return next(err);
        if (!user) {
            return res.status(401).send('Authentication failed. User not found.');
        }
        if (!user.comparePassword(req.body.password)) {
            return res.status(401).send('Authentication failed. Wrong password.');
        }
        let token = jwt.sign({ username: user.username }, process.env.SECRET, { expiresIn: '12h' });

        // return the information including token as JSON                   
        return res.json({
            message: 'Authentication successful!',
            token: token
        });
    });
});

/* REGISTER */
/*router.post('/register', function (req, res) {
    let newUser = new User(req.body);
    newUser.hashPassword(req.body.password);
    newUser.save(function (err, user) {
        if (err) return next(err);
        user.hashedPassword = undefined;
        res.json(user);
    });
});*/

module.exports = router;