Category = new Meteor.Collection("category");
Program = new Meteor.Collection("program");
Content = new Meteor.Collection("content");
User = new Meteor.Collection("user");
Publicity = new Meteor.Collection("publicity");
Poll = new Meteor.Collection("poll");
Answer = new Meteor.Collection("answer");

DataKey = function(){
	return ((1 + Math.floor(1e15)) + new Date().getSeconds(7)).toString(36).toUpperCase();
};