"use strict";

(function (domain) {

    function CustomMarker(latLng, map, args) {
        this.latlng = latLng;
        this.args = args;
        this.setMap(map);
    }

    CustomMarker.prototype = new google.maps.OverlayView();

    CustomMarker.prototype.draw = function () {
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

            google.maps.event.addDomListener(div, "click", function (event) {
                var user = window.users.getById(self.args.marker_id);
                var Panel = panel.getInstance();
                Panel.draw(user);
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

    CustomMarker.prototype.remove = function () {
        if (this.div) {
            this.div.parentNode.removeChild(this.div);
            this.div = null;
        }
    };

    CustomMarker.prototype.getPosition = function () {
        return this.latlng;
    };

    domain.CustomMarker = CustomMarker;

})( window.model || (window.model = {}) );