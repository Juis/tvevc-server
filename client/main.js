subscribes = ['program', 'notify', 'poll', 'answer', 'user', 'level'];
for(var i in subscribes){
	Meteor.subscribe(subscribes[i]);
}