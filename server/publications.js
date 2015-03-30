Meteor.publish('program', function() {
  //return Program.find({status:1},{fields:{status:0}});
  return Program.find({}, {fields:{user_record:0, user_change:0, date_record:0, date_change:0}});
});

Meteor.publish('category', function() {
  //return Program.find({status:1},{fields:{status:0}});
  //return Category.find({status:1}, {fields:{user_record:0, user_change:0, date_record:0, date_change:0}});
  return Category.find({});
});