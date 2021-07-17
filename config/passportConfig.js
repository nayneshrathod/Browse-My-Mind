const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

var Manager = mongoose.model('Manager');

passport.use(
    new localStrategy({ usernameField: 'email' },
        (username, password, done) => {
            Manager.findOne({ email: username },
                (err, manager) => {
                    if (err)
                        return done(err);
                    // unknown manager
                    else if (!manager)
                        return done(null, false, { message: 'Email is not registered' });
                    // wrong password
                    else if (!manager.verifyPassword(password))
                        return done(null, false, { message: 'Wrong password.' });
                    // authentication succeeded
                    else
                        return done(null, manager);
                });
        })
);