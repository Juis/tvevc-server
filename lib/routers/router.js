Router.configure({
  layoutTemplate: 'layout'
});

Meteor.startup(function () {
  if (Meteor.isClient) {
    var location = Iron.Location.get();
    if (location.queryObject.platformOverride) {
      Session.set('platformOverride', location.queryObject.platformOverride);
    }
  }
});

Router.map(function() {
  this.route('index', 
    {path: '/'}
  );
  this.route('programs', 
    {path: '/programas'}
  );
  this.route('programShow', 
    {path: '/programas/programa'}
  );
  this.route('programNew', 
    {path: '/programas/novo'}
  );
  this.route('poll', 
    {path: '/enquetes'}
  );
  this.route('pollShow', 
    {path: '/enquetes/enquete'}
  );
  this.route('pollNew', 
    {path: '/enquetes/novo'}
  );
});
