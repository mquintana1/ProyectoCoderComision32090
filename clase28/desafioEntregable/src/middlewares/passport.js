import passport from 'passport';

import * as strategies from './passportStrategies.js';
import users from '../containers/MongodbContainer.js';

passport.use('registro', strategies.registroLocal);
passport.use('login', strategies.loginLocal);

export const passportMiddleware = passport.initialize();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser( async (id, done) => {
  try {
    const user = await users.getUserbyId(id);
    if (!user){
        done(null, false)
    }
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export const passportSessionHandler = passport.session();