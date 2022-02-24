const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const passportMethods = function (passport, userObj) {

    // passport local strategy for local-login, local refers to this app
    passport.use('local-login', new LocalStrategy(
        function (userName, password, done) {
            if (userObj[userName] && userObj[userName].password == password) {
                return done(null, userObj[userName]);
            } else {
                return done(null, false, { "message": "User not found." });
            }
        })
    );

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    }, function (req, email, password, done) {
        if (!userObj[email])
            userObj[email] = { password };
    }));

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        // callbackURL: "http://localhost:3001/auth/google/callback",
        passReqToCallback: true
    }, (request, accessToken, refreshToken, profile, done) => {
        return done(null, profile);
    }));

}

module.exports = passportMethods;