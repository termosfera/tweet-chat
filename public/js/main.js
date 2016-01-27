"use strict";

var CustomMarkerList = (function() {

    var CustomMarkerList = function() {
        this.list = [];
    };

    CustomMarkerList.prototype.addMarker = function(marker) {
        this.list.push(marker);
    };

    return CustomMarkerList;

})();

$(document).ready(function() {

    // Map
    var center = new google.maps.LatLng(30.1928653,-5.6143691,3);
    var mapOptions = {
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: false,
        zoom: 3,
        center: center,
        disableDefaultUI: true
    };
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    map.set('styles', [
        {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "visibility": "off"
                },
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
                    "visibility": "off"
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
                    "visibility": "off"
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
    var markers = new CustomMarkerList();

    // User
    var user = new User();
    if (!user.getLogged()) {
        user.setAlias("Anonymous");
        user.setLocation({});
    }

    // Login modal
    var $modal = $('#loginModal');
    var $twitterButton = $("#twitterLoginButton");

    $modal.modal('show');

    $twitterButton.on('click', function() {
        $modal.modal('hide');
        oAuth();
    });

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

    // Events
    $("#chat-input").keypress(function(e) {
        if (e.which == 13) {
            console.log( $(this).val() );
            $(this).val("");
        }
    });

});