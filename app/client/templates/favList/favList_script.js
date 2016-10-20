var isfinish = ReactiveVar(false);

Template.favList.helpers({
	
	name(){
		return this[`${Session.get('lang')}_name`];
	},

	specialist(){
		return this[`${Session.get('lang')}_specialist`];
	},

	rs(){
		const list = Session.get("favDoctor");
		return Doctors.find({doc_id:{$in: list.map((item) => parseInt(item)) }});
	},

	distance(){
		let {doc_id} = this;

		if(!Address.findOne({doc_id}) || !Geolocation.latLng())
		return "";

		const {lat:Flat, lng:Flng} = Geolocation.latLng();
		const fromCoord =  new google.maps.LatLng(Flat, Flng);

		const {lat:Tlat, long:Tlng} = Address.findOne({doc_id});
		const toCoord =  new google.maps.LatLng(Tlat, Tlng);

		return Math.round(google.maps.geometry.spherical.computeDistanceBetween(fromCoord,toCoord)/1000).toFixed(2);
		// return Address.findOne({doc_id}) ? Address.findOne({doc_id}).lat : ""
	},

	isfinish(){
		// return Template.instance().isfinish.get()
		return isfinish.get();
	}

});

Template.favList.events({
	'click .rsContainer-item'(e){

		var target = e.target;
    // if (target.tagName.toLowerCase() !== 'button') return false;
    var rect = target.getBoundingClientRect();
    var ripple = target.querySelector('.ripple');
    if (!ripple) {
        ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
        target.appendChild(ripple);
    }
    ripple.classList.remove('show');
    var top = e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop;
    var left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
    ripple.style.top = top + 'px';
    ripple.style.left = left + 'px';
    ripple.classList.add('show');


		let {docid:doc_id} = e.currentTarget.dataset;
		Router.go("doctorDetail",{doc_id});
	},
	'click #lastPt'(e,t){
		// console.log(t);
		// t.limit.set(t.limit.get()+5);
	}

});

Template.favList.onCreated(function(){
	this.isfinish = new ReactiveVar(false)

});

Template.favList.onRendered(function(){
	var self = this;
	this.autorun(()=>{
			// const limit = this.limit.get();
			Meteor.setTimeout(()=>{

				const list = Session.get("favDoctor");

				 this.subscribe("getDoctorById", list, ()=>{
					//  console.log(self.isfinish.get())
					//  self.isfinish.set(true);
					isfinish.set(true);
				 });

		 }, 0);

	});


});
