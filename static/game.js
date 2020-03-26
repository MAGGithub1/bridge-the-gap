let socket = io();

// RESPONSES

socket.on('joined lobby', function(data){
  console.log("joined lobby ", data);
});
socket.on('failed to join lobby', function(data){
  console.log("could not join lobby ", data);
});


// REQUESTS

// entry page

function createLobby(lobby_name) {
  socket.emit('new lobby', lobby_name);
}

function joinLobby(lobby_name) {
  socket.emit('join lobby', lobby_name);
}
