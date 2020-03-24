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


app.use('/static', express.static(__dirname + '/static'));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Starts the server.
server.listen(5000, function() {
  console.log('Starting server on port 5000');
});

// Add the WebSocket handlers
io.on('connection', function(socket) {
  // for testing
  socket.on('keydown req', function(data){
    res = 'player ' + socket.id + ' pressed key ' + data;
    io.sockets.emit('keydown res', res);
  });
});

