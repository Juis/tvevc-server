
// PERMISSIONS
for(var i in collections){
  collections[i].allow({
    insert: function(userId, form){
      return false;
    },
    update: function(userId, form, fields, modifier){
      return false;
    },
    remove: function(userId, form){
      return false;
    }
  });
}

// PUBLICATIONS
Meteor.publish('program', function() {
  return Program.find(
    {status:1}, 
    {fields:
      {
        user_record:0, 
        user_change:0, 
        date_record:0, 
        date_change:0
      }
    }
  );
});

Meteor.publish('notify', function() {
  return Notify.find(
    {status:1}, 
    {fields:
      {
        user_record:0, 
        user_change:0, 
        date_record:0, 
        date_change:0
      }
    }
  );
});

Meteor.publish('poll', function() {
  return Poll.find(
    {}, 
    {fields:
      {
        user_record:0, 
        user_change:0, 
        date_record:0, 
        date_change:0
      }
    }
  );
});

Meteor.publish('answer', function() {
  return Answer.find(
    {status:1}, 
    {fields:
      {
        user_record:0, 
        user_change:0, 
        date_record:0, 
        date_change:0
      }
    }
  );
});

Meteor.publish('polluser', function() {
  return PollUser.find(
    {status:1}, 
    {fields:
      {
        date_record:0, 
        date_change:0
      }
    }
  );
});

Meteor.publish('user', function() {
  return User.find(
    {status:1}, 
    {fields:
      {
        user_record:0, 
        user_change:0, 
        date_record:0, 
        date_change:0
      }
    }
  );
});

Meteor.publish('level', function() {
  return Level.find(
    {status:1}, 
    {fields:
      {
        user_record:0, 
        user_change:0, 
        date_record:0, 
        date_change:0
      }
    }
  );
});