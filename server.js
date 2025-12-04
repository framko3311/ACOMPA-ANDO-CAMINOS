const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Sirve el archivo index.html
app.use(express.static(__dirname));

// Lógica de comunicación de Socket.IO
io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado');

  // 1. Cuando un celular envía la acción 'cambiar_color'
  socket.on('cambiar_color', (color) => {
    console.log(`Recibido color: ${color}`);
    
    // 2. Reenvía el mensaje a TODOS los clientes conectados (incluido el que lo envió)
    io.emit('actualizar_color', color); 
  });

  socket.on('disconnect', () => {
    console.log('Un usuario se ha desconectado');
  });
});

// Configura el puerto para Render o entorno local
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
