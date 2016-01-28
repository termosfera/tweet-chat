CustomMarkerObserverList = (function () {

    var CustomMarkerObserverList = function () {
        this.list = [];
    };

    CustomMarkerObserverList.prototype.addMarker = function (marker) {
        this.list.push(marker);
    };

    CustomMarkerObserverList.prototype.count = function () {
        return this.list.length;
    };

    CustomMarkerObserverList.prototype.get = function (index) {
        if (index > -1 && index < this.list.length) {
            return this.list[index];
        }
    };

    CustomMarkerObserverList.prototype.indexOf = function (obj, startIndex) {
        var i = startIndex;

        while (i < this.list.length) {
            if (this.list[i] === obj) {
                return i;
            }
            i++;
        }

        return -1;
    };

    CustomMarkerObserverList.prototype.removeAt = function (index) {
        this.list.splice(index, 1);
    };

    return CustomMarkerObserverList;

})();