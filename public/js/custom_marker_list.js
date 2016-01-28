CustomMarkerList = (function () {

    var CustomMarkerList = function () {
        this.list = [];
    };

    CustomMarkerList.prototype.addMarker = function (marker) {
        this.list.push(marker);
    };

    return CustomMarkerList;

})();