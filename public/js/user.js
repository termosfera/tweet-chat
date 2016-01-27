User = (function() {

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