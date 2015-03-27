Meteor.publish('programListAllActive', function() {
  //return Program.find({status:1},{fields:{status:0}});
  return Program.find({status:1}, {fields:{user_record:0, user_change:0, date_record:0, date_change:0}});
});

Meteor.publish('programListAllDisabled', function() {
  //return Program.find({status:1},{fields:{status:0}});
  return Program.find({status:0}, {fields:{user_record:0, user_change:0, date_record:0, date_change:0}});
});

Meteor.publish('categoryListAllActive', function() {
  //return Program.find({status:1},{fields:{status:0}});
  return Category.find({status:1}, {fields:{user_record:0, user_change:0, date_record:0, date_change:0}});
});

Meteor.publish('categoryListAllDisabled', function() {
  //return Program.find({status:1},{fields:{status:0}});
  return Category.find({status:0}, {fields:{user_record:0, user_change:0, date_record:0, date_change:0}});
});