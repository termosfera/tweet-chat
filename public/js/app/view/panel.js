"use strict";

window.panel = (function() {

    var instance;

    function init() {

        return {
            draw: function(u) {
                console.log(u.getDescription());
                var $infoPanel = $("#user-info");
                var $infoName = $(".user-name");
                var $infoDescription = $(".user-description");

                $infoPanel.children("img").attr("src", u.getAvatar());
                $infoName.text(u.getAlias());
                $infoDescription.text(u.getDescription());

                $infoPanel.fadeIn( "slow", function() {
                    // Animation complete
                });
            }
        }
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