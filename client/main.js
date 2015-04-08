if (Meteor.isClient) {
	Meteor.subscribe('program');
	Meteor.subscribe('notify');
	Meteor.subscribe('poll');
	Meteor.subscribe('answer');
}

if (Meteor.isServer) { Meteor.startup(function () {}); }