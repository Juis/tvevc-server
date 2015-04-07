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

  // PROGRAMAS
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
      path: '/programas/atualizar/:_id',
      data: function(){
        return Program.find({_id:this.params._id, status:1});
      }
    }
  );

  this.route('programNew', {
      path: '/programas/registrar',
      waitOn: function() {
        Meteor.subscribe('getUrl', this.params._id);
      }
    }
  );

  // ENQUETES
  this.route('poll', 
    {path: '/enquetes'}
  );

  this.route('pollUpdate', {
      path: '/enquetes/atualizar/:_id',
      data: function(){
        return Poll.find({_id:this.params._id, status:1});
      }
    }
  );

  this.route('pollNew', {
      path: '/enquetes/registrar',
      waitOn: function() {
        Meteor.subscribe('getUrl', this.params._id);
      }
    }
  );

  // NOTIFICAÇÕES
  this.route('notifications', 
    {path: '/notificacoes'}
  );

  this.route('notificationUpdate', {
      path: '/notificacoes/atualizar/:_id',
      data: function(){
        return Notifications.find({_id:this.params._id, status:1});
      }
    }
  );

  this.route('notificationNew', {
      path: '/notificacoes/registrar',
      waitOn: function() {
        Meteor.subscribe('getUrl', this.params._id);
      }
    }
  );

});
