"use strict";

(function(domain) {

    var User = function() {
        this.id = 0;
        this.isLogged = false;
        this.alias = "";
        this.avatar = "";
        this.location = {};
        this.marker = {};
    };

    User.prototype.setId = function(id) {
        this.id = id;
    };

    User.prototype.setMarker = function(coords) {
        var latLng = new google.maps.LatLng(coords.latitude, coords.longitude);
        this.marker = new model.CustomMarker(latLng, model.Map, {marker_id: this.id});
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

    domain.User = User;

})( window.model || (window.model = {}) );