"use strict";

var app = {};
app.model = {};
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

    User.prototype.getLogged = function() {
        return this.isLogged;
    };

    User.prototype.setAlias = function(alias) {
        this.alias = alias;
    };

    User.prototype.getAlias = function() {
        return this.alias;
    };

    User.prototype.setAvatar = function(avatarUrl) {
        this.avatar = avatarUrl;
    };

    User.prototype.getAvatar = function() {
        return this.avatar;
    };

    return User;

})();
app.model.CustomMarkerList = (function() {

    var CustomMarkerList = function() {
        this.list = [];
    };

    CustomMarkerList.prototype.addMarker = function(marker) {
        this.list.push(marker);
    };

    return CustomMarkerList;

})();
app.model.CustomMarker = (function() {

    function CustomMarker(latlng, map, args) {
        this.latlng = latlng;
        this.args = args;
        this.setMap(map);
    }

    CustomMarker.prototype = new google.maps.OverlayView();

    CustomMarker.prototype.draw = function() {

        var self = this;

        var div = this.div;

        if (!div) {

            // Create marker container
            div = this.div = document.createElement('div');

            // Create marker elements
            var span = document.createElement("SPAN");
            this.div.appendChild(span);
            this.div.appendChild(span);
            this.div.appendChild(span);

            div.className = 'marker';

            div.style.cursor = 'pointer';

            if (typeof(self.args.marker_id) !== 'undefined') {
                div.dataset.marker_id = self.args.marker_id;
            }

            google.maps.event.addDomListener(div, "click", function(event) {
                alert('You clicked on a custom marker!');
                google.maps.event.trigger(self, "click");
            });

            var panes = this.getPanes();
            panes.overlayImage.appendChild(div);
        }

        var point = this.getProjection().fromLatLngToDivPixel(this.latlng);

        if (point) {
            div.style.left = (point.x - 10) + 'px';
            div.style.top = (point.y - 20) + 'px';
        }
    };

    CustomMarker.prototype.remove = function() {
        if (this.div) {
            this.div.parentNode.removeChild(this.div);
            this.div = null;
        }
    };

    CustomMarker.prototype.getPosition = function() {
        return this.latlng;
    };

    return CustomMarker;

})();

$(document).ready(function() {

    // Map
    var myLatlng = new google.maps.LatLng(-31.9546781,115.852662);
    var mapOptions = {
        zoom: 4,
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
    var markers = new app.model.CustomMarkerList();

    // User
    var user = new app.model.User();
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
            user.setAlias(me.alias);
            user.setAvatar(me.raw.profile_image_url);

            var marker = new app.model.CustomMarker(new google.maps.LatLng(-17.9546781,120.852662), map, {marker_id: '1234'});
            markers.addMarker(marker);

            console.log(user);
        }).fail(function(err) {

        });
    }

});