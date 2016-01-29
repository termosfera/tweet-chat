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

        OAuth.initialize('DGPBxDEJ59WaLZaRK1zn82gEU7Q');
        OAuth.popup('twitter', {cache: true}).done(function (twitter) {

        }).fail(function (err) {

        });

        var twitter = OAuth.create('twitter');

        return twitter.me();

    }

    function generateAnonymousUser() {
        var randomId = Math.random() * (10000 - 10) + 10;

        var user = new model.User();
        user.setId(randomId);
        user.setAlias("anonymous");

        return user;
    }

    return {
        oAuth: oAuth,
        getLocation: getLocation,
        generateAnonymousUser: generateAnonymousUser
    }

})();