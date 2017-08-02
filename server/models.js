const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  googleId: {type: String, required: true},
  name: {type: String, required: true},
  accessToken: {type: String, required: true},
  slider1: {type: Number, default: 50},
  slider2: {type: Number, default: 50},
  slider3: {type: Number, default: 50},
  slider4: {type: Number, default: 50},
  slider5: {type: Number, default: 50},
  slider6: {type: Number, default: 50},
  image: {type: String}
});

userSchema.methods.apiRepr = function() {
  return {
    name: this.name
  };
};

const User = mongoose.model('User', userSchema);

//---------------------

const lobbySchema = mongoose.Schema({
  lobby: {type: {}}
});

lobbySchema.methods.apiRepr = function() {
  return {
    lobby: this.lobby
  };
};

const Lobby = mongoose.model('Lobby', lobbySchema);


module.exports = {User, Lobby};