// OAuth
function oAuth() {
    OAuth.initialize('DGPBxDEJ59WaLZaRK1zn82gEU7Q');

    OAuth.popup('twitter', {cache: true}).done(function(twitter) {
        // handle correct popup execution
    }).fail(function(err) {
        // handle popup error
    });

    var twitter = OAuth.create('twitter');

    twitter.me().done(function(me) {
        var marker;

        user.setAlias(me.alias);
        user.setAvatar(me.raw.profile_image_url);

        getLocation(function(position) {
            user.setLocation({
                latitude: position.coords.latitude || "",
                longitude: position.coords.longitude || ""
            });

            // make new marker
            var coords = user.getLocation();
            var lat = coords.latitude;
            var lng = coords.longitude;

            marker = new CustomMarker(new google.maps.LatLng(lat, lng), map, { marker_id: '1234' });
            markers.addMarker(marker);
        });

        console.log(user);
    }).fail(function(err) {

    });
}

// Location
function getLocation(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(callback);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}