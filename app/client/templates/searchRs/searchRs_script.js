function compareNumbers(a, b) {
  return a - b;
}

function getDistanceFromItem(item) {


  const {
    lat: Flat,
    lng: Flng
  } = Geolocation.latLng();
  const fromCoord = new google.maps.LatLng(Flat, Flng);

  const {
    lat: Tlat,
    long: Tlng
  } = Address.findOne({
    doc_id: item.doc_id
  });
  const toCoord = new google.maps.LatLng(Tlat, Tlng);

  return findDistance(fromCoord, toCoord)

}


Template.searchRs.helpers({
  rs() {
    return Doctors.find(makeQ(getQ()));
  },

  notEmpty() {
    return Template.instance().total.get() > 0;
  },

  current() {
    return Doctors.find(makeQ(getQ())).count();
  },

  count() {
    return Template.instance().total.get();
  },

  isFinish() {
    return Template.instance().isfinish.get();
  },

  moreAva() {
    return Template.instance().total.get() > 10 && (Template.instance().total.get() - Template.instance().limit.get()) > 0
  },

  name() {
    return this[`${Session.get('lang')}_name`];
  },

  specialist() {
    return this[`${Session.get('lang')}_specialist`];
  },

  distance() {
    let { doc_id } = this;

    const { lat: Flat, lng: Flng } = Geolocation.latLng();
    const fromCoord = new google.maps.LatLng(Flat, Flng);

    const { lat: Tlat, long: Tlng } = Address.findOne({ doc_id });
    const toCoord = new google.maps.LatLng(Tlat, Tlng);

    // return Address.findOne({doc_id}) ? Address.findOne({doc_id}).lat : ""
    const mile = findDistance(fromCoord, toCoord)
    return mile > 10 ? " -- " : mile.toFixed(2);
  }

});

function findDistance(fromCoord, toCoord) {
  return Math.round(google.maps.geometry.spherical.computeDistanceBetween(fromCoord, toCoord) / 1000)
}

Template.searchRs.events({
  'click #lastPt' (e, t) {
    t.limit.set(t.limit.get() + 10);
  },

  'click .rsContainer-item' (e) {
    var target = e.target;
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


    let { docid: doc_id } = e.currentTarget.dataset;
    Router.go("doctorDetail", { doc_id });

    return false;
  },

  'click button' (e) {
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
    return false;
  },


});

Template.searchRs.onCreated(function() {
  // DocSubs.clear();
  var self = this;
  this.limit = new ReactiveVar(10);
  this.isfinish = new ReactiveVar(false);
  this.total = new ReactiveVar(0);



  this.autorun(function() {
    console.log(Geolocation.currentLocation());
    console.log(Geolocation.latLng());
    console.log(Geolocation.error());
  });


  Meteor.call("getTotalNumber", getQ(), function(error, result) {
    if (error) {
      console.log("error", error);
    }
    if (result) {
      self.total.set(result);
    }
  });



});



Template.searchRs.onRendered(function() {
  console.log("onRendered");
  let self = this;
  this.autorun(() => {
    const limit = this.limit.get();
    // isfinish.set(false);
    const handle = DocSubs.subscribe("getDoctorsWithparam", getQ(), limit, () => {
      //  self.isfinish.set(true);
      console.log("run new sub");
    });


    Tracker.afterFlush(function() {
      Meteor.defer(() => {
        self.isfinish.set(handle.ready());
      })
    });

    console.log("handle.ready", handle.ready())
  });
});
