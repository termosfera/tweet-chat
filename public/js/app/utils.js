window.Utils = (function() {

    var getLocation = function () {
        return new Promise( function (resolve, reject) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(location) {
                    resolve(location);
                });
            } else {
                reject("Geolocation is not supported by this browser.");
            }
        });
    };

    /**
     * Starts OAuth login process
     *
     * @param u
     */
    function oAuth() {
        var self = this;
        self.coords = {};

        OAuth.initialize('DGPBxDEJ59WaLZaRK1zn82gEU7Q');
        OAuth.popup('twitter', {cache: true}).done(function (twitter) {
            // handle correct popup execution
        }).fail(function (err) {
            // handle popup error
        });

        var twitter = OAuth.create('twitter');

        var user;
        var Socket = socket.getInstance();

        getLocation().then(function(position) {
            self.coords = position.coords || {};

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
                    user = generateAnonymousUser();
                }

                window.localUser = user;

                Socket.emit('newUser', user.toJSON());

            }).fail(function (err) {
                console.error(err);
                var user = generateAnonymousUser();
                window.localUser = user;
                Socket.emit('newUser', user);
            });

        }).catch(function(err) {
            console.error(err);
        });

    }

    function generateAnonymousUser() {
        var randomId = Math.random() * (10000 - 10) + 10;

        var user = new User();
        user.setId(randomId);
        user.setAlias("anonymous");

        return user;
    }

    return {
        oAuth: oAuth,
        generateAnonymousUser: generateAnonymousUser
    }

})();