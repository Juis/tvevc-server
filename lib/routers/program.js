Router.map(function() {

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

});