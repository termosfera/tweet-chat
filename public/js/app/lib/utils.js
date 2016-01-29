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

    function generateAnonymousUser() {
        var randomId = Math.random() * (10000 - 10) + 10;

        var user = new model.User();
        user.setId(randomId);
        user.setAlias("anonymous");

        return user;
    }

    return {
        getLocation: getLocation,
        generateAnonymousUser: generateAnonymousUser
    }

})();