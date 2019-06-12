const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const User = require('./schema/user');

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : process.env.JWTSECRET
    },
    function (jwtPayload, cb) {
        console.log('FROM JWT', jwtPayload);
        
        return cb(null, jwtPayload);
    }
));

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, 
    function (username, password, cb) {
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        console.log('in auth', username, password)
        return User.findOne({username, password})
            .then(user => {
                if (!user) {
                    return cb(null, false, {message: 'Incorrect username or password.'});
                } 
            
                let passMatch = (user.password === password);
                console.log(passMatch)
                if(passMatch) {
                    return cb(null, user, {message: 'Logged In Successfully'});
                } else {
                    return cb(null, false, {message: 'Incorrect username or password.'});
                }
            
            }).catch(err => cb(err));
    }
));