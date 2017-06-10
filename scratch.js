var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var clientInfo = require('./scratch2.json')
// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: clientInfo.web.client_id,//GOOGLE_CLIENT_ID,
    clientSecret: clientInfo.web.client_secret,//GOOGLE_CLIENT_SECRET,
    callbackURL: clientInfo.web.redirect_uri[0]//"http://www.example.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    //    User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //      return done(err, user);
    //    });
    console.log(params)
  }
));