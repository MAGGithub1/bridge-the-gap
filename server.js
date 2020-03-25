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

// lobby names are defined by the users

lobbies_open = {};    // lobbies that can currently be joined
lobbies_closed = {};  // lobbies that cannot be joined

// handle socket.io connections
io.on('connection', function (socket) {
  // for testing
  socket.on('keydown req', function (data) {
    res = 'player ' + socket.id + ' pressed key ' + data;
    io.sockets.emit('keydown res', res);
  });

  // creation of a new lobby
  socket.on('new lobby', function (name) {
    // todo check the lobby with name = name does not exist

    // if it does exist, add lobby and player

    lobbies_open[name] = [socket.id];

    // send the updated list of available lobbies to everyone
    io.sockets.emit('new lobby available', Object.keys(lobbies_open));

    // let the client know they have joined the lobby
    socket.broadcast.to(socket.id).emit('joined lobby', { lobby_name: name, admin: true });
  });

  socket.on('join lobby', function (name) {
    // todo check the lobby with name = name exists

    // if it does exist, add lobby and player
    lobbies_open[name].push(socket.id);

    // let the client know they have joined the lobby
    socket.broadcast.to(socket.id).emit('joined lobby', { lobby_name: name, admin: false });

  });
});

