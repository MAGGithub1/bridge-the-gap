let socket = io();
socket.on('keydown res', function(data){
  console.log(data);
});

document.addEventListener('keydown', function(event){
  socket.emit('keydown req', event.key);
});