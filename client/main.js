if (Meteor.isClient) {
	Meteor.subscribe('program');
	Meteor.subscribe('category');
	Meteor.subscribe('poll');
	Meteor.subscribe('answer');
	Meteor.subscribe('notifications');
}

if (Meteor.isServer) { Meteor.startup(function () {}); }