Utils = (function() {

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
    function oAuth(u) {
        var self = this;

        self.user = u;

        OAuth.initialize('DGPBxDEJ59WaLZaRK1zn82gEU7Q');

        OAuth.popup('twitter', {cache: true}).done(function (twitter) {
            // handle correct popup execution
        }).fail(function (err) {
            // handle popup error
        });

        var twitter = OAuth.create('twitter');

        twitter.me().done(function (me) {
            self.user.setAlias(me.alias);
            self.user.setAvatar(me.raw.profile_image_url);
            self.user.notify( self.user );
        }).fail(function (err) {
            // Handle login error
        });
    }

    /**
     * Extend an object with an extension
     *
     * @param obj
     * @param extension
     */
    function extend( obj, extension ){
        for ( var key in extension ){
            obj[key] = extension[key];
        }
    }

    return {
        getLocation: getLocation,
        oAuth: oAuth,
        extend: extend
    }

})();