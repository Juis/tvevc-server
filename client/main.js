if (Meteor.isClient) {
	subscribes = ['program', 'notify', 'poll', 'answer'];
	for(var i in subscribes){
		Meteor.subscribe(subscribes[i]);
	}
}

if (Meteor.isServer) { Meteor.startup(function () {}); }