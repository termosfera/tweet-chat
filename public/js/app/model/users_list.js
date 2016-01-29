"use strict";

(function (domain) {

    var UsersList = function () {
        this.list = [];
    };

    UsersList.prototype.addUser = function (user) {
        this.list.push(user);
    };

    UsersList.prototype.count = function () {
        return this.list.length;
    };

    UsersList.prototype.get = function (index) {
        if (index > -1 && index < this.list.length) {
            return this.list[index];
        }
    };

    UsersList.prototype.getById = function (id) {
        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].getId() == id) {
                return this.list[i];
            }
        }
    };

    UsersList.prototype.indexOf = function (obj, startIndex) {
        var i = startIndex;

        while (i < this.list.length) {
            if (this.list[i] === obj) {
                return i;
            }
            i++;
        }

        return -1;
    };

    UsersList.prototype.removeAt = function (index) {
        this.list.splice(index, 1);
    };

    domain.UsersList = UsersList;

})( window.model || (window.model = {}) );