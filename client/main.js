if (Meteor.isClient) {
	Meteor.subscribe('program');
	Meteor.subscribe('category');
}

if (Meteor.isServer) { Meteor.startup(function () {}); }