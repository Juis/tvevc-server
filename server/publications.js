var collections = [];
collections[0] = [Notify, Program, Content, User, Publicity, Poll, Answer];
collections[1] = ['notify', 'program', 'content', 'user', 'publicity', 'poll', 'answer'];
for(var i in collections[0]){
	Meteor.publish(collections[1][i], function() {
	  return collections[0][i].find({status:1}, {fields:{user_record:0, user_change:0, date_record:0, date_change:0}});
	});
}