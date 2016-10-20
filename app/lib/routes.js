Router.configure({
  layoutTemplate: 'MasterLayout',
  // loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});



Router.route('/', {
  onBeforeAction(){
    this.redirect("searchIndex");
    this.next();
  }
});

Router.route('searchIndex', {
});
Router.route('test', {
});
Router.route('infobox', {
});
Router.route('searchRs', {
});
Router.route('favList', {
});
Router.route('settings', {
});
Router.route('nearBy', {
});
Router.route('simpleMap', {
});
Router.route('doctorDetail', {
  path:"doctorDetail/:doc_id",
});
Router.route('searchCritria', {
  path:"searchCritria/:type"
});
