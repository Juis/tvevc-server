Meteor.publish('program', function() {
  return Program.find({status:1}, {fields:{user_record:0, user_change:0, date_record:0, date_change:0}});
});

Meteor.publish('notify', function() {
  return Notify.find({status:1}, {fields:{user_record:0, user_change:0, date_record:0, date_change:0}});
});

Meteor.publish('poll', function() {
  return Poll.find({status:1}, {fields:{user_record:0, user_change:0, date_record:0, date_change:0}});
});

Meteor.publish('answer', function() {
  return Answer.find({status:1}, {fields:{user_record:0, user_change:0, date_record:0, date_change:0}});
});