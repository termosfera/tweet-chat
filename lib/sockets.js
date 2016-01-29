var socketio = require('socket.io');
var io = {};

module.exports = {

    startSocketServer: function (app) {
        io = socketio.listen(app);

        io.sockets.on('connection', function (socket) {

            socket.on("newUser", function(user) {
                if (user) {
                    console.log(user.location);
                    io.sockets.emit("incomingUser", user);
                }
            });

            socket.on('newMessage', function (newMessage) {
                if (newMessage) {
                    io.sockets.emit('incomingMessage', newMessage);
                }
            });

            socket.on('disconnect', function () {

            });
        });
    }
};