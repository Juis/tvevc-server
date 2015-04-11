Router.map(function() {

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
  
});