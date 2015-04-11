Router.map(function() {

  this.route('notify', 
    {path: '/notificacoes'}
  );

  this.route('notifyUpdate', {
      path: '/notificacoes/atualizar/:_id',
      data: function(){
        return Notify.find({_id:this.params._id, status:1});
      }
    }
  );

  this.route('notifyNew', {
      path: '/notificacoes/registrar',
      waitOn: function() {
        Meteor.subscribe('getUrl', this.params._id);
      }
    }
  );

});