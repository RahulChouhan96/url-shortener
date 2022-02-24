const passport = require('passport');
const express = require('express');

const router = express.Router();


// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
router.get('/google', function (req, res, next) {
    // var params = encodeURI(JSON.stringify({ provider: req.subdomains[0], hostname: req.get('old-host') || req.hostname }));
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
});

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/google/callback', function (req, res, next) {
    passport.authenticate("google", { callbackURL: cbURL(req, 'google'), failureRedirect: "/login" })(req, res, next)
}, function (req, res) {
    if (req.user.__v == 0) {
        ga.events.sendNewUserEvent(req.subdomains[0] || 'main');
        ses_mailer.welcome.call(req, req.user.givenName || 'Student', req.user.email);
    }
    else
        ga.events.sendReloginEvent(req.subdomains[0] || 'main');

    signIn(req, res);
});

router.post('/signup', passport.authenticate('local-signup'), (req, res) => res.sendStatus(200));

router.post('/login', passport.authenticate('local-login'), (req, res) => res.sendStatus(200));

module.exports = router;