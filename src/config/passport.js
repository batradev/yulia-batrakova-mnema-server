const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../db'); 

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  async function(token, tokenSecret, profile, done) {
    try {
      
      let user = await db('users').where({ google_id: profile.id }).first();

      if (user) {
       
        return done(null, user);
      } else {
       
        const [id] = await db('users').insert({
          google_id: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value
        });

        user = await db('users').where({ id }).first();
        return done(null, user);
      }
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await db('users').where({ id }).first();
    done(null, user);
  } catch (err) {
    done(err);
  }
});
