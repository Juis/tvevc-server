Meteor.publish('listarTudo', function() {
  return Program.find({status:1},{fields:{status:0, permission:0}});
});