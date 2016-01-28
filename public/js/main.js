"use strict";

$(document).ready(function () {
    var markers = new CustomMarkerObserverList();
    var marker;
    var $modal = $('#loginModal');
    var $twitterButton = $("#twitterLoginButton");
    var $chatRoom = $("#chat-room");
    var $chatInput = $("#chat-input");

    var map = initializeMap();

    $modal.modal('show');

    // User
    var user = new User();
    if (!user.getLogged()) {
        user.setAlias("Anonymous");
        user.setLocation({});
    }

    Utils.extend(user, new Subject());

    Utils.getLocation(function (position) {
        user.setLocation({
            latitude: position.coords.latitude || "",
            longitude: position.coords.longitude || ""
        });
        user.notify( user );

        marker = new CustomMarker(user, map, {marker_id: '1234'});
        markers.addMarker(marker);
    });

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
        Utils.oAuth(user);
    });

    $chatInput.keypress(function (e) {
        var message = $(this).val();

        if (e.which == 13 && message) {
            $(this).val("");
            socket.emit('newMessage', message);
        }
    });

});
