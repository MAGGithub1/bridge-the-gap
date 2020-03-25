let socket = io();

socket.on('new lobby available', function(data){
  console.log("lobbies available: ", data)
})
socket.on('joined lobby', function(data){
  console.log("joined lobby ", data);
});


// entry page

function createLobby(lobby_name) {
  console.log("creating lobby");
  socket.emit('new lobby', lobby_name);
}

function joinLobby(lobby_name) {
  console.log("joining lobby");
  socket.emit('join lobby', lobby_name)
}
