if (Meteor.isClient) {
	subscribes = ['program', 'notify', 'poll', 'answer', 'user', 'level'];
	for(var i in subscribes){
		Meteor.subscribe(subscribes[i]);
	}
}

if (Meteor.isServer) { Meteor.startup(function () {}); }