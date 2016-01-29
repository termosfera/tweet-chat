"use strict";

var socket = (function() {
    var instance;

    function init() {
        return io();
    }

    return {
        getInstance: function() {
            if ( !instance ) {
                instance = init();
            }
            return instance;
        }
    }

})();