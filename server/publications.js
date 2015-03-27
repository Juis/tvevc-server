Meteor.publish('programListarTudoAtivo', function() {
  //return Program.find({status:1},{fields:{status:0}});
  return Program.find({status:1});
});

Meteor.publish('programListarTudoDesativado', function() {
  //return Program.find({status:1},{fields:{status:0}});
  return Program.find({status:0});
});