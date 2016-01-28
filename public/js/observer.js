Observer = (function () {

    //var marker = {};

    // The Observer
    function Observer() {

        this.update = function (context) {
            console.log(context);
            console.log("marker");
            console.log(marker);
            //marker = new CustomMarker(context, map, {marker_id: '1234'});
        };
    }

    return {
        Observer: Observer,
        //marker: marker
    };

})();
