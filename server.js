// skeleton code from https://hackernoon.com/how-to-build-a-multiplayer-browser-game-4a793818c29b


// Dependencies
let express = require('express');
let http = require('http');
let path = require('path');
let socketIO = require('socket.io');

let app = express();
let server = http.Server(app);
let io = socketIO(server);
app.set('port', 5000);

// get files
app.use('/static', express.static(__dirname + '/static'));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/index.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.css'));
});
app.get('/lobby', function (req, res) {
  res.sendFile(path.join(__dirname, 'lobby.html'));
});

// Starts the server.
server.listen(5000, function () {
  console.log('Starting server on port 5000');
});

// lobby names are defined by users
lobbies = {};

// handle socket.io connections
io.on('connection', function (socket) {

  // creation of a new lobby
  socket.on('new lobby', function (name) {
    // err check - does the lobby already exist?
    if (name in lobbies) {
      io.to(socket.id).emit('failed to join lobby', { lobby_name: name, err: "A lobby with this name already exists. Please choose a different name." });
      return;
    }

    // if it does exist, add lobby and player

    lobbies[name] = { admin: socket.id, players: [], can_join: true };

    // let the client know they have joined the lobby as the admin
    io.to(socket.id).emit('joined lobby', { lobby_name: name, admin: true });
  });

  // join an existing lobby
  socket.on('join lobby', function (name) {
    // todo check if a player is already in the lobby? disconnect/reconnect issue?

    // err check - does the lobby exist?
    if (!(name in lobbies)) {
      io.to(socket.id).emit('failed to join lobby', { lobby_name: name, err: "This lobby does not exist!" });
      return;
    } 

    // if it does exist, add lobby and player
    lobbies[name]['players'].push(socket.id);

    // let the client know they have joined the lobby
    io.to(socket.id).emit('joined lobby', { lobby_name: name, admin: false });

  });
});

