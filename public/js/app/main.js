"use strict";

$(document).ready(function () {
    var Map = map.getInstance();

    var $modal = $('#loginModal');
    $modal.modal({backdrop: 'static', keyboard: false});
    $modal.modal('show');

    window.users = new model.UsersList();
    window.localUser = new model.User();

    var $anonymousLoginButton = $('#anonymousLoginButton');
    var $twitterButton = $('#twitterLoginButton');
    var $chatRoom = $('#chat-room');
    var $chatInput = $('#chat-input');

    // Sockets
    var Socket = socket.getInstance();
    var counter = 0;

    Socket.on('incomingUser', function(u) {
        if (u.id != window.localUser.getId()) {
            var user = new model.User();
            user.setId(u.id);
            user.setAvatar(u.avatar);
            user.setAlias(u.alias);
            user.setDescription(u.description);

            if (user.getAlias() != "anonymous") {
                var point = new google.maps.LatLng(u.location.latitude, u.location.longitude, 3);
                var marker = new model.CustomMarker(point, Map, {marker_id: u.id});

                user.setMarker(marker);
            }
            window.users.addUser(user);
        }
    });

    Socket.on('incomingMessage', function (im) {
        var isOwner = false;

        if (window.localUser.getId() == im.user.id) {
            isOwner = true;
        }

        var alias = isOwner ? window.localUser.getAlias() : im.user.alias;
        var ownerClass = isOwner ? 'owner' : '';
        var $commentUser = $("<span class='alias'></span>").text(alias);
        var $commentText = $("<p></p>").text(im.message);

        var $comment = $("<div class='comment'></div>");
        $comment.append($commentUser);
        $comment.append($commentText);

        $comment.addClass(ownerClass);

        if (counter > 12) {
            $chatRoom.children().first().remove();
        }

        $chatRoom.append($comment);
        counter = $chatRoom.children().length;
    });

    // Events
    $anonymousLoginButton.on('click', function() {
        $modal.modal('hide');
        window.localUser = Utils.generateAnonymousUser();
        Socket.emit("newUser", window.localUser.toJSON());
    });

    $twitterButton.on('click', function () {
        $modal.modal('hide');

        OAuth.initialize('DGPBxDEJ59WaLZaRK1zn82gEU7Q');
        OAuth.popup('twitter', {cache: true}).done(function (twitter) {
            twitter.me().done(function(me) {
                window.localUser.setId(me.id);
                window.localUser.setAlias(me.alias);
                window.localUser.setDescription(me.raw.description);
                window.localUser.setAvatar(me.raw.profile_image_url);
                window.localUser.setLogged(true);

                Utils.getLocation().then(function(location) {
                    var point = new google.maps.LatLng(location.coords.latitude, location.coords.longitude, 3);
                    var marker = new model.CustomMarker(point, Map, {marker_id: me.id});

                    window.localUser.setMarker(marker);
                    window.localUser.setLocation(location);
                    window.users.addUser(window.localUser);

                    Socket.emit("newUser", window.localUser.toJSON());

                }).catch(function(err) {
                    console.error(err);
                });

            }).fail(function(err) {
                console.error(err);
            });
        }).fail(function () {
            window.localUser = Utils.generateAnonymousUser();
            Socket.emit("newUser", window.localUser.toJSON());
        });

    });

    $chatInput.on('keypress', function (e) {
        if (e.which == 13) {
            var text = $(this).val();
            var message = {
                user: window.localUser.toJSON(),
                message: text
            };

            $(this).val("");
            Socket.emit('newMessage', message);
        }
    });

});
