const io = require('socket.io')(3000);
const redis = require('socket.io-redis');
io.adapter(redis({ host: 'redis', port: 6379 }));

const os = require('os');
const hostname = os.hostname();

io.on('connection', (socket) => {
    console.log('Connection opened', socket.id);
    socket.on('message', (message) => {
        console.log('Got message', message);
        socket.broadcast.emit(message.userId, message.data);
    });
});

io.emit('hi', 'all sockets');
