const express = require('express');
const router  = express.Router();
const User = require('../schema/user');


router.get('/test', function (req, res, next) {
    res.status(200).json({
        loggedIn: true
    });
});

router.post('/follow/:userid', (req, res) => {
    console.log(req.user, 'to follow', req.params.userid);
});

router.get('/new', (req, res) => {
    User.find({}).select(["username", "gender"]).exec((err, users) => {
        res.status(200).json(users);
    });
});

module.exports = router;