Template.simpleMap.helpers({
	exampleMapOptions: function() {

		const lat = parseFloat(Router.current().params.query.lat)
		const lng = parseFloat(Router.current().params.query.Lng)

		// console.log(lat,lng);
	    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()  ) {
      // Map initialization options
      return {
        center: new google.maps.LatLng(lat, lng),
        zoom: 17,
				zoomControl: true,
				mapTypeControl: false,
				scaleControl: true,
				streetViewControl: false,
				rotateControl: true,
				fullscreenControl: false
      };
    }
  },


	name(){
		return Router.current().params.query.name
	}

});

Template.simpleMap.events({


});

Template.simpleMap.onDestroyed(function(){
	 DocSubs.clear();


});


Template.simpleMap.onCreated(function(){
	GoogleMaps.load();

});

Template.simpleMap.onRendered(function(){

	GoogleMaps.ready('exampleMap2', function(map) {
		console.log("exampleMap loaded")
    // Add a marker to the map once it's ready
    var marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance
    });


  });

});
