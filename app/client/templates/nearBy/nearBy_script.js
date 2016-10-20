var Marker ={};
var Markers =[];
var curDoc_id;
var coor = new ReactiveVar([0,0]) ;

Template.nearBy.helpers({

	geolocationError: function() {
    var error = Geolocation.error();
    return error && error.message;
  },

	exampleMapOptions: function() {
		var latLng = Geolocation.latLng();

	    // Make sure the maps API has loaded
    if (GoogleMaps.loaded() ) {
      // Map initialization options
			console.log("exampleMapOptions",GoogleMaps.loaded())
      return {
				center: new google.maps.LatLng(22.3217523, 114.1412012),
        zoom: 10,
				zoomControl: true,
			  mapTypeControl: false,
			  scaleControl: true,
			  streetViewControl: false,
			  rotateControl: true,
			  fullscreenControl: false
      };
    }

  },




});

Template.nearBy.events({

	'click .infoBox'(){
		Router.go("doctorDetail",{doc_id:curDoc_id})
	}

});

Template.nearBy.onCreated(function(){
	Marker = {}
	Markers = []






	GoogleMaps.ready('exampleMap', function(map) {
		console.log("exampleMap loaded")
    // Add a marker to the map once it's ready
    // var marker = new google.maps.Marker({
    //   position: map.options.center,
    //   map: map.instance
    // });

		GeoMarker = new GeolocationMarker(map.instance);
		GeoMarker.setCircleOptions({fillColor: '#808080'});


		google.maps.event.addListenerOnce(GeoMarker, 'position_changed', function() {
			 map.instance.setCenter(this.getPosition());
			//  map.instance.fitBounds(this.getBounds());
			 map.instance.setZoom(17);
			 updateDoctorOnMap(this.getPosition().lat(),this.getPosition().lng());
			 coor.set([this.getPosition().lat(), this.getPosition().lng()]);
		 });
		google.maps.event.addListener(GeoMarker, 'position_changed', function() {
			//  map.instance.setCenter(this.getPosition());
			// //  map.instance.fitBounds(this.getBounds());
			//  map.instance.setZoom(17);
			 updateDoctorOnMap(this.getPosition().lat(),this.getPosition().lng());
		 });

		 google.maps.event.addListener(GeoMarker, 'geolocation_error', function(e) {
			//  alert('There was an error obtaining your position. Message: ' + e.message);
			 alert(i18n("geoProblem"))
		 });

		 map.instance.addListener('click', function() {
		  Markers.map((item) => item.ib.close() )
		 });

	//  GeoMarker.setMap(map.instance);


		 updateDoctorOnMap(coor.get()[0], coor.get()[1]);
  });

	// this.autorun(()=>{
	// 	//  console.log(Geolocation.currentLocation());
	// 	//  console.log(Geolocation.latLng());
	// 	//  console.log(Geolocation.error());
	// 	 //
	// 	//  if(Geolocation.latLng()){
	//
	// 	//  }
	//
	// });


});

Template.nearBy.onRendered(function(){

});
Template.nearBy.onDestroyed(function(){
	//  DocSubs.clear();
});

function updateDoctorOnMap(lat,lng) {
	console.log("updateDoctorOnMap");
	console.log({lat, lng});
	if(lat===0, lng===0){
		lat = 22.3097896;
		lng = 114.22488240000007;
	}
	Meteor.subscribe("getDoctorByll", [lat, lng],()=>{
		console.log("getDoctorByll finished");
		Address.find().fetch().map((item) => {
			createMarker(item.lat, item.long, Doctors.findOne({doc_id:item.doc_id}),  item)
		})
	});
}


function createMarker(lat, long, docInfo,address) {

	if(Marker[docInfo.doc_id])
		return false

	var boxText = document.createElement("div");
        // boxText.style.cssText = "font-size: 1.3rem; height:100px; border: 1px solid #333; border-radius: 5px; margin-top: 8px; background: #66BCD5; padding: 10px;";
        boxText.style.cssText = "";
        // boxText.innerHTML = docInfo[`${Session.get('lang')}_name`];
				docInfo.spec = docInfo[`${Session.get('lang')}_specialist`];
				// console.log(docInfo);
        boxText.innerHTML = Blaze.toHTMLWithData(Template.infobox,docInfo)


	var myOptions = {
		 content: boxText
		,disableAutoPan: false
		,maxWidth: 0
		// ,pixelOffset: new google.maps.Size(-140, 0)
		,pixelOffset: new google.maps.Size(0, 0)
		,zIndex: null
		,boxStyle: {
		  // background: "url('tipbox.gif') no-repeat"
		  // ,opacity: 0.75
		  width: "170px"
		 }
		,closeBoxMargin: "13px 11px 11px 5px"
		// ,closeBoxURL: ""
		,closeBoxURL: Meteor.absoluteUrl('cross-out.png')
		,infoBoxClearance: new google.maps.Size(1, 1)
		,isHidden: false
		,pane: "floatPane"
		,enableEventPropagation: true
	};




	var marker = new google.maps.Marker({
	  position: new google.maps.LatLng(lat, long),
		animation: google.maps.Animation.DROP,
	  map: GoogleMaps.maps.exampleMap.instance
	});

	var ib = new InfoBox(myOptions);

	marker.ib = ib;
	marker.doc_id = docInfo.doc_id;

	marker.addListener('click', ()=>{
		Meteor.setTimeout(function() {
			Markers.map((item) => item.ib.close())
      GoogleMaps.maps.exampleMap.instance.panTo(marker.getPosition());
			marker.ib.open(GoogleMaps.maps.exampleMap.instance, marker);
			curDoc_id = docInfo.doc_id
    }, 0);
	});

	// google.maps.event.addDomListener(ib,'click',()=>{
	// 	Router.go("doctorDetail",{doc_id:docInfo.doc_id})
	// });


	// var closeInfoBox = document.getElementById("close-button");
	// google.maps.event.addDomListener(closeInfoBox, 'click', function(){
	// 		ib.close(GoogleMaps.maps.exampleMap.instance, marker);
	// });


	// ib.open(GoogleMaps.maps.exampleMap.instance, marker);

	Markers.push(marker);
	Marker[docInfo.doc_id] = marker;


}
