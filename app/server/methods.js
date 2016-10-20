/*****************************************************************************/
/*  Server Methods */
/*****************************************************************************/

Meteor.methods({
  'server/method_name': function () {
    // server method logic
  },
  'getTotalNumber':function (query) {

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

    return Doctors.find(finalq).count();

  }
});
