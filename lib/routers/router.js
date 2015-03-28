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

  this.route('programs', {
      path: '/programas/',
      data: function(){
          return {
              success: this.params.success
          };
      }
    }
  );

  this.route('programUpdate', {
      path: '/programas/novo/:_id',
      data: function(){
        return Program.find({_id:this.params._id, status:1});
      }
    }
  );

  this.route('programNew', 
    {path: '/programas/novo',
  waitOn: function() {
    Meteor.subscribe('getUrl', this.params._id);
  }}
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
