if (Meteor.isClient) {
	Meteor.subscribe('program');
	Meteor.subscribe('category');
	Meteor.subscribe('poll');
	Meteor.subscribe('answer');
}

if (Meteor.isServer) { Meteor.startup(function () {}); }