Meteor.startup(function () {

  // Address.find().fetch().map((item) => {
  //   const {lat,long} = item
  //   if(!item.coord)
  //     Address.update({_id:item._id},{$set:{coord: [lat,long] }})
  //
  //   if(lat==="" || long==="" )
  //     Address.update({_id:item._id},{$unset:{coord:""}})
  // })

  Doctors._ensureIndex({ "doc_id": 1,gender:1,en_specialist:1,zh_specialist:1,practice_type:1,});
  Address._ensureIndex({ "doc_id": 1});


  Kadira.connect('k5kmSW9EP6cHHsCjm', 'fd4caa69-4c38-47d2-a96f-102111066eb3');

});
