const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
const passport = require("passport");

/* POST login. */
router.post('/login', function (req, res, next) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'invalid username or passdfsword'
            });
        }
        req.login(user, {session: false}, (err) => {
           if (err) {
               res.send(err);
           }
           // generate a signed son web token with the contents of user object and return it in the response
           console.log('login', user, user.children, info);
           let JWTdata = {
               userId: user._id,
               timestamp: Date.now()
           };
           const token = jwt.sign(JWTdata, process.env.JWTSECRET);
           res.cookie('jwt', token);
           return res.json({token});
        });
    })(req, res);
});

module.exports = router;