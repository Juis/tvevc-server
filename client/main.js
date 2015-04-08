if (Meteor.isClient) {
	var collections = ['notify', 'program', 'content', 'user', 'publicity', 'poll', 'answer'];
	for(var i in collections){
		Meteor.subscribe(collections[i]);
	}
}

if (Meteor.isServer) { Meteor.startup(function () {}); }