var socketio = require('socket.io');
var io = {};
var users = [];

module.exports = {

    startSocketServer: function (app) {
        io = socketio.listen(app);

        io.sockets.on('connection', function (socket) {

            socket.on("userConnected", function(user) {
                if (user) {
                    users.push(user);
                    io.sockets.emit("users", users);
                }
            });

            socket.on('newMessage', function (message) {
                if (message.text) {
                    io.sockets.emit('messages', message);
                }
            });

            socket.on('disconnect', function () {

            });
        });
    }
};