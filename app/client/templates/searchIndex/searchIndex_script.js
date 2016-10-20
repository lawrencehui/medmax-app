Template.searchIndex.helpers({
	getTypeValue(type){

		// return _.find(specialist,(item)=>item.en===queryDict.get(type))[Session.get('lang')]
		return listMap[type][queryDict.get(type)][Session.get('lang')]
	}
});

Template.searchIndex.events({
	'click .searchBtn'(e){
		const {type} = e.currentTarget.dataset;
		Router.go("searchCritria",{type})
	},
	'click .searchRsBtn'(){
		Router.go("searchRs")
	},
	'click button'(e){
		var target = e.target;
    if (target.tagName.toLowerCase() !== 'button') return false;
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
	}
});

Template.searchIndex.onRendered(function ( ){
	// DocSubs.clear();
})

Template.searchIndex.onCreated(function ( ){
	// DocSubs.clear();
})
