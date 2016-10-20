queryDict = new ReactiveDict('myDict');
Session.setDefaultPersistent("favDoctor", [])
Session.setDefaultPersistent('lang',"en");

queryDict.setDefault("SPECIALIST",0)
queryDict.setDefault("DISTRICT",0)
queryDict.setDefault("PRACTIVE",0)
queryDict.setDefault("GENDER",0)

DocSubs = new SubsManager();



if (Meteor.isClient) {
  Meteor.startup(function() {

    i18n.setLanguage(Session.get('lang')||'en')

    // GoogleMaps.load();
    GoogleMaps.load({ v: '3', libraries: 'geometry,places' });
    GoogleMaps.loadUtilityLibrary('http://google-maps-utility-library-v3.googlecode.com/svn/trunk/geolocationmarker/src/geolocationmarker-compiled.js')
    GoogleMaps.loadUtilityLibrary('http://google-maps-utility-library-v3.googlecode.com/svn/tags/infobox/1.1.9/src/infobox_packed.js')
  });

  Tracker.autorun(function(){
    i18n.setLanguage(Session.get('lang'));
    console.log(i18n.getLanguage());
  });
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};








// makeQ


makeQ=(query)=>{

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

	return finalq

  // console.log({finalq});

  // let doctorHandle = Doctors.find(finalq,{limit});
	//
  // const allDocId = doctorHandle.fetch().map((item) => item.doc_id)

}



getQ=()=>{
  return {
   SPECIALIST:listMap["SPECIALIST"][queryDict.get("SPECIALIST")]['en'],
   DISTRICT:listMap["DISTRICT"][queryDict.get("DISTRICT")]["en"],
   PRACTIVE:listMap["PRACTIVE"][queryDict.get("PRACTIVE")]["en"],
   GENDER:listMap["GENDER"][queryDict.get("GENDER")]["en"],
 }
}
