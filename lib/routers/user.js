Router.map(function() {

  this.route('user', {
      path: '/usuarios/',
      data: function(){
          return {
              success: this.params.success
          };
      }
    }
  );

  this.route('userUpdate', {
      path: '/usuarios/atualizar/:_id',
      data: function(){
        return User.find({_id:this.params._id, status:1});
      }
    }
  );

  this.route('userNew', {
      path: '/usuarios/registrar',
      waitOn: function() {
        Meteor.subscribe('getUrl', this.params._id);
      }
    }
  );

});