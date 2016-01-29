"use strict";

$(document).ready(function () {
    model.initializeMap();

    var $modal = $('#loginModal');
    $modal.modal('show');

    var $twitterButton = $('#twitterLoginButton');
    var $chatRoom = $('#chat-room');
    var $chatInput = $('#chat-input');

    // Sockets
    var socket = io();
    var counter = 0;

    socket.on('writtenMessage', function (writtenMessage) {
        var receivedMessage = "<div class='comment'><span class='alias'>" + user.getAlias() + "</span></span><p>" +
            writtenMessage + "</p></div>";

        if (counter > 13) {
            $chatRoom.children().first().remove();
        }

        $chatRoom.append(receivedMessage);
        counter = $chatRoom.children().length;
    });

    // Events
    $twitterButton.on('click', function () {
        $modal.modal('hide');
        Utils.oAuth();
    });

    $chatInput.keypress(function (e) {
        var message = $(this).val();

        if (e.which == 13 && message) {
            $(this).val("");
            socket.emit('newMessage', message);
        }
    });

});
