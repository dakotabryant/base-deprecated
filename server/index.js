/* eslint-disable */

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const socket = require('socket.io');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();
const { DATABASE_URL, PORT } = process.env;
const { User, Lobby } = require('./models');

let secret = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET
};

if (process.env.NODE_ENV != 'production') {
  secret = require('./secret');
}

const app = express();

app.use(passport.initialize());
app.use(bodyParser.json());

app.get(
  '/api/me',
  passport.authenticate('bearer', { session: false }),
  (req, res) => {
    return res.json(req.user);
  }
);

app.put(
  '/api/users/:googleId',
  passport.authenticate('bearer', { session: false }),
  (req, res) => {
    User.findOneAndUpdate(
      { googleId: req.params.googleId },
      {
        $set: {
          slider1: req.body.slider1,
          slider2: req.body.slider2,
          slider3: req.body.slider3,
          slider4: req.body.slider4,
          slider5: req.body.slider5,
          slider6: req.body.slider6
        }
      },
      { new: true }
    )
      .then(results => {
        console.log('result from put' + results);
        res.json(results).end();
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({ error: 'Put request fail' });
      });
  }
);

//lobby creation endpoint

app.post('/api/lobbies', (req, res) => {
  Lobby.create({
    lobby: req.body.lobby
  })
  .then(result => {
      return res.status(201).json(result.apiRepr());

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: 'Something went wrong!!!'});
    });
})

//get endpoint needs to find by game/platform/region
app.get('/api/lobbies/:platform/:region/:game', (req, res) => {
  console.log(req.params.platform)
  Lobby.find().where('lobby.platform').equals(req.params.platform)
  .where('lobby.region', req.params.region).where('lobby.game', req.params.game)
  .then(result => {
    console.log(result)
      return res.json(result);

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: 'Something went wrong!!!'});
    });
})

//Google Oath
passport.use(
  new GoogleStrategy(
    {
      clientID: secret.CLIENT_ID,
      clientSecret: secret.CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback'
    },
    (accessToken, refreshToken, profile, cb) => {
      User.findOne({ googleId: profile.id }, function(err, user) {
        if (!user) {
          User.create(
            {
              googleId: profile.id,
              name: profile.displayName,
              accessToken: accessToken,
              image: profile.photos[0].value
            },
            function(err, user) {
              return cb(null, user);
            }
          );
        } else {
          User.findOneAndUpdate(
            { googleId: profile.id },
            { accessToken },
            { new: true },
            function(err, user) {
              return cb(null, user);
            }
          );
        }
      });
    }
  )
);

passport.use(
  new BearerStrategy((token, done) => {
    User.findOne({ accessToken: token }, function(err, user) {
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    });
  })
);

app.get(
  '/api/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);

app.get(
  '/api/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    session: false
  }),
  (req, res) => {
    res.cookie('accessToken', req.user.accessToken, { expires: 0 });
    res.redirect('/');
  }
);

app.get('/api/auth/logout', (req, res) => {
  req.logout();
  res.clearCookie('accessToken');
  res.redirect('/');
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function

app.get(/^(?!\/api(\/|$))/, (req, res) => {
  const index = path.resolve(__dirname, '../client/build', 'index.html');
  res.sendFile(index);
});

let server;

function runServer(databaseUrl = DATABASE_URL, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app
        .listen(port, () => {
          console.log(`Your app is listening on port ${port}`);
          resolve();
        })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
      const io = socket(server);

      io.on('connection', socket => {
        console.log('made socket connection');

        socket.on('create-group', data => {
          console.log(data)
          const {
            platform,
            game,
            region,
            voice,
            title,
            startTime,
            partySize,
            description,
            roomNumber
          } = data.selection;
          const myRoom = roomNumber;
          socket.join(myRoom);
          console.log('creator joined',myRoom);
          const room = platform + region + game;
          room.toLowerCase().replace(/\s+/g, '');
          console.log(room)
          socket.to(room).emit('create-group', data);
        });

        socket.on('join-room', data => {
          // console.log('data', data);
          const { platform, game, region } = data.selection;
           const room = platform + region + game
          room.toLowerCase().replace(/\s+/g, '');
          console.log(room)
          socket.join(room);

        });

        socket.on('sign-up', (user) => {
           console.log('user is potatoes', user.user.roomNumber);
            const room = user.user.roomNumber;
            socket.join(room);
            socket.to(room).emit('sign-up', user);
        })

        socket.on('chat-room', message => {
          socket.emit('chat-room', message);
          console.log(message);
          // io.of('chat-room').emit('chat-room', message);
        })

      });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer();
}

module.exports = {
  app,
  runServer,
  closeServer
};
