Template.searchCritria.helpers({
	type(){
		return i18n(Router.current().params.type);
	},
	typeItem(){
		// return listMap[Router.current().params.type];
		return Template.instance().items.get();
	},
	getLang(){
		return this[Session.get('lang')]
	},

	active(index){
		return parseInt(queryDict.get(Router.current().params.type))===index? "active" :""
	}
});

Template.searchCritria.events({
	'click [data-typevalue]'(e){
		// let q = queryDict.get();
		// q = lodash.set(q,`${Router.current().params.type}`,e.currentTarget.dataset.typevalue)
		// console.log(q);
		// queryDict.set(q);
		// queryDict.set(Router.current().params.type, e.currentTarget.dataset.typevalue);
		queryDict.set(Router.current().params.type, e.currentTarget.dataset.id);
		Router.go("searchIndex");
	}

});

Template.searchCritria.onCreated(function(){
	this.items = new ReactiveVar([]);

});

Template.searchCritria.onRendered(function(){

	let self = this;
	Meteor.setTimeout(function () {
		self.items.set(listMap[Router.current().params.type]);
	}, 400);

});
