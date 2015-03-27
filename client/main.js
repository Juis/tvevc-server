if (Meteor.isClient) {
	Meteor.subscribe('programListAllActive');
	Meteor.subscribe('programListAllDisabled');
	Meteor.subscribe('categoryListAllActive');
	Meteor.subscribe('categoryListAllDisabled');
}

if (Meteor.isServer) { Meteor.startup(function () {}); }