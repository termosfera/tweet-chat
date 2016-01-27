
var app = {};
app.model.User = (function() {

    var User = function() {
        this.isLogged = false;
        this.alias = "";
        this.avatar = "";
        this.location = {};
    };

    User.prototype.setLocation = function(location) {
        this.location = location;
    };

    User.prototype.getLocation = function() {
        return this.location;
    };

    User.prototype.setLogged = function(logged) {
        this.isLogged = logged;
    };

    User.prototype.setAlias = function(alias) {
        this.alias = alias;
    };

    User.prototype.setAvatar = function(avatarUrl) {
        this.avatar = avatarUrl;
    };

    return User;

});

function initialize() {

    var myLatlng = new google.maps.LatLng(-31.9546781,115.852662);
    var mapOptions = {
        zoom: 14,
        center: myLatlng,
        disableDefaultUI: true
    };

    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    map.set('styles', [
        {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#3e606f"
                },
                {
                    "weight": 2
                },
                {
                    "gamma": 0.84
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [
                {
                    "weight": 0.6
                },
                {
                    "color": "#82c3e0"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#bee3f3"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#2c5a71"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#406d80"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#2c5a71"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#29768a"
                },
                {
                    "lightness": -37
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#406d80"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#8eb4c8"
                }
            ]
        }
    ]);

    overlay = new CustomMarker(myLatlng, map, {marker_id: '123'});

}

google.maps.event.addDomListener(window, 'load', initialize);