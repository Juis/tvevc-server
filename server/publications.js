Meteor.publish('listarTudo', function() {
  return Program.find({status:1},{fields:{status:0, permission:0}});
});

var tables = [Category, Program, Content, User, Publicity, Poll, Answer];
for(var i in tables){
  tables[i].allow({
    insert: function(userId, form){
      var key = ((1 + Math.floor(1e15)) + new Date().getSeconds(7)).toString(36).toUpperCase();
      return (form.permission === key)? true : false;
    },
    update: function(userId, form, fields, modifier){
      var key = ((1 + Math.floor(1e15)) + new Date().getSeconds(7)).toString(36).toUpperCase();
      return (form.permission === key)? true : false;
    },
    remove: function(userId, form){
      var key = ((1 + Math.floor(1e15)) + new Date().getSeconds(7)).toString(36).toUpperCase();
      return (form.permission === key)? true : false;
    }
  });
}