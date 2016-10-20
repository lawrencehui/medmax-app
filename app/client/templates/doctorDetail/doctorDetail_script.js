Template.ionNavBar.events({
	"click .star.btn-fa-star": function(event, template){
		let arr = Session.get('favDoctor') || [];
		arr = _.without(arr,Router.current().params.doc_id);
		Session.update('favDoctor',arr)
	},

	"click .star.btn-fa-star-o": function(event, template){
		let arr = Session.get('favDoctor') || [];
		Session.update('favDoctor',[...arr, Router.current().params.doc_id])
	},
});

Template.doctorDetail.helpers({


	emergency_avail(){
		return ~this.emergency_avail
	},



	qualifications(){
		return Doctors.findOne({doc_id:parseInt(Router.current().params.doc_id)})[`${Session.get('lang')}_qualifications`].replaceAll(",","</br>");;
	},

	zh_services(){
		return Doctors.findOne({doc_id:parseInt(Router.current().params.doc_id)})[`${Session.get('lang')}_zh_services`];
	},

	specialist(){
		return Doctors.findOne({doc_id:parseInt(Router.current().params.doc_id)})[`${Session.get('lang')}_specialist`];
	},

	allEmpty(){
		const {Mon, Tue, Wed, Thur, Fri, Sat, Sun} = this;
		return _.all([Mon, Tue, Wed, Thur, Fri, Sat, Sun],_.isEmpty)
	},

	star(){
		// console.log(this);
		return ~Session.get('favDoctor').indexOf(Router.current().params.doc_id)?"fa-star":"fa-star-o";
	},
	Doctor(){
		return Doctors.findOne({doc_id:parseInt(Router.current().params.doc_id)});
	},
	DoctorInfo(){
		const doc_id =  parseInt(Router.current().params.doc_id);
		let doc = Doctors.findOne({doc_id});
		if (doc) doc.address = Address.find({doc_id}).fetch();
		return doc;
	},
	addressObject(){
		return Object.keys(this).map((item)=> {return {key:item,value:this[item]}} )
	},
	latLng(){
		return {lat:this.lat,Lng:this.long}
	},
	getGender(){
		const map = {
			M:"fa-mars",
			F:"fa-venus"
		}
		return map[this.gender]
	},

	building(){
		return this[`${Session.get('lang')}_building`];
	},

	addressDoc(){
		return this[`${Session.get('lang')}_address`].replaceAll(",","</br>");
	},
});

Template.doctorDetail.events({
	'click .detailInfoItem.address'(e){

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


		console.log(this)
		const {latLng} = this;
		latLng.name = Doctors.findOne()[`${Session.get('lang')}_name`]
		Router.go("simpleMap",{},{query:$.param(latLng)})
	}

});

Template.doctorDetail.onCreated(function(){

	Meteor.setTimeout(()=>{
		DocSubs.subscribe("getDoctorById", Router.current().params.doc_id );
		// this.subscribe("getDoctorAddressById", Router.current().params.doc_id );

	}, 0);

});

Template.doctorDetail.onRendered(function(){


});
