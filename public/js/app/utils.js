window.Utils = (function() {

    /**
     * Get users location
     *
     * @param callback
     */
    function getLocation(callback) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(callback);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    /**
     * Starts OAuth login process
     *
     * @param u
     */
    function oAuth() {
        var self = this;
        self.coords = {};

        getLocation(function (position) {
            self.coords = position.coords || {};
        });

        OAuth.initialize('DGPBxDEJ59WaLZaRK1zn82gEU7Q');
        OAuth.popup('twitter', {cache: true}).done(function (twitter) {
            // handle correct popup execution
        }).fail(function (err) {
            // handle popup error
        });

        var twitter = OAuth.create('twitter');

        var user;
        var Socket = socket.getInstance();

        twitter.me().done(function (me) {
            if (me) {
                user = new model.User();
                user.setId(me.id);

                var userMap = map.getInstance();
                var point = new google.maps.LatLng(self.coords.latitude, self.coords.longitude, 3);
                var marker = new model.CustomMarker(point, userMap, {marker_id: me.id});

                user.setMarker(marker);
                user.setLocation(self.coords);
                user.setAlias(me.alias);
                user.setAvatar(me.raw.profile_image_url);
                user.setLogged(true);
            } else {
                user = generateAnonymousUser(user);
            }

            window.localUser = user;

            Socket.emit('newUser', user.getUserShadow());

        }).fail(function (err) {
            console.error(err);
            var user = generateAnonymousUser(user);
            window.localUser = user;
            Socket.emit('newUser', user);
        });
    }

    function generateAnonymousUser(user) {
        var randomId = Math.random() * (10000 - 10) + 10;

        user = new User();
        user.setId(randomId);
        user.setAlias("anonymous");

        return user;
    }

    return {
        oAuth: oAuth
    }

})();