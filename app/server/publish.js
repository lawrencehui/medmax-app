
Meteor.publish("getDoctorsWithparam", function(query,limit=5){


  const genderList = {
    Male:"M",
    Female:"F"
  }

  // console.log(query);

  const filterQ = lodash.pickBy(query, (value)=>value.toUpperCase()!=="ANY");

  // console.log(filterQ);

  let doc_id = null

  if(filterQ.DISTRICT)
    doc_id = _.pluck(Address.find({district:query.DISTRICT}).fetch(),'doc_id');

  const finalq = {};


  if(filterQ.SPECIALIST)
    finalq["$or"]=[{en_specialist:filterQ.SPECIALIST},{zh_specialist:filterQ.SPECIALIST}]

  if(doc_id)
    finalq.doc_id = {$in:doc_id};

  if(filterQ.GENDER)
    finalq.gender = genderList[filterQ.GENDER]

  if(filterQ.PRACTIVE)
    finalq.practice_type = filterQ.PRACTIVE

  // console.log({finalq});

  let doctorHandle = Doctors.find(finalq,{limit});

  const allDocId = doctorHandle.fetch().map((item) => item.doc_id)

  // console.log({allDocId});

  // console.log("count",Doctors.find(finalq,{limit}).count())
  // Counts.publish(this,'doctorsCount',Doctors.find(finalq))
  return [
    Doctors.find(finalq,{limit}),
    Address.find({doc_id:{$in:allDocId}}),
  ];
});


Meteor.publish("getDoctorAddressById", function(doc_id){
  doc_id = parseInt(doc_id);
  return Doctors.find({doc_id})
});
Meteor.publish("getDoctorById", function(doc_id){
  let arr = [];

  if(!Array.isArray(doc_id))
    arr.push(doc_id);
  else {
    arr = doc_id
  }

  arr = arr.map((item) => parseInt(item) )

  console.log(arr);

  return [
    Address.find({doc_id:{$in:arr}}),
    Doctors.find({doc_id:{$in:arr}})
  ]
});

Meteor.publish("getDoctorByll", function(loc){
  // return Address.find({coord:{$geoWithin :{$center: [ loc ,0.01] }}},{zh_address:1,coord:1})
  let addressHandle = Address.find({coord:{$near:loc, $maxDistance: 0.01 }},{zh_address:1,coord:1, limit:100})
  const allDocId = addressHandle.fetch().map((item) => item.doc_id)
  return [
    Doctors.find({doc_id:{$in:allDocId}}),
    addressHandle
  ]
});
