Meteor.startup(function () {
  smtpServer = {
    username: 'alissonplus2@gmail.com',
    password: '$12345678',
    server:   'smtp.gmail.com',
    port: 465
  }

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtpServer.username) + ':' + encodeURIComponent(smtpServer.password) + '@' + encodeURIComponent(smtpServer.server) + ':' + smtpServer.port;

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
      {}, 
      {fields:
        {
          user_record:0, 
          user_change:0, 
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

  Meteor.publish('content', function() {
    return Content.find(
      {}, 
      {fields:
        {
          user_record:0, 
          user_change:0, 
          date_change:0
        }
      }
    );
  });

  Meteor.publish('contentPagination', function(limit) {
    if (limit > Content.find().count()) {
      limit = 0;
    }

    return Content.find(
      {}, 
      {fields:
        {
          user_record:0, 
          user_change:0, 
          date_change:0
        }
      },
      { limit: limit }
    );
  });

  Meteor.publish('notifyPagination', function(limit) {
    if (limit > Notify.find().count()) {
      limit = 0;
    }

    return Notify.find(
      {}, 
      {fields:
        {
          user_record:0, 
          user_change:0, 
          date_change:0
        }
      },
      { limit: limit }
    );
  });

  Meteor.publish('pollPagination', function(limit) {
    if (limit > Poll.find().count()) {
      limit = 0;
    }

    return Poll.find(
      {}, 
      {fields:
        {
          user_record:0, 
          user_change:0, 
          date_change:0
        }
      },
      { limit: limit }
    );
  });

  Meteor.publish('userPagination', function(limit) {
    if (limit > User.find().count()) {
      limit = 0;
    }

    return User.find(
      {status:1}, 
      {fields:
        {
          user_record:0, 
          user_change:0, 
          date_change:0
        }
      },
      { limit: limit }
    );
  });

  Meteor.publish('programPagination', function(limit) {
    if (limit > Program.find().count()) {
      limit = 0;
    }

    return Program.find(
      {status:1}, 
      {fields:
        {
          user_record:0, 
          user_change:0, 
          date_record:0,
          date_change:0
        }
      },
      { limit: limit }
    );
  });
});