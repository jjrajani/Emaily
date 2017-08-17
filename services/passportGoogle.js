const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  // user.id here is NOT googleId or facebookId,
  // it is the database ID for this user record
  done(null, user.id);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(user => {
        if (user) {
          // we already have a record with given profileId
          // console.log('User exists', user);
          // call done to continue auth process, perhaps redirect to wherever...
          // null === error object we could return if we liked, should something have gone wrong
          // done function sends user to serializeUser
          done(null, user);
        } else {
          // create user then send that user back
          new User({ googleId: profile.id }).save().then(user => {
            // done function sends user to serializeUser
            done(null, user);
          });
        }
      });
    }
  )
);
