Notify = new Meteor.Collection("notify");
Program = new Meteor.Collection("program");
Content = new Meteor.Collection("content");
User = new Meteor.Collection("user");
Publicity = new Meteor.Collection("publicity");
Poll = new Meteor.Collection("poll");
Answer = new Meteor.Collection("answer");
PollUser = new Meteor.Collection("polluser");
Level = new Meteor.Collection("level");

collectionsName = {
	Notify: 'notify', 
	Program: 'program', 
	Content: 'content', 
	User: 'user', 
	Publicity: 'publicity', 
	Poll: 'poll', 
	PollUser: 'polluser',
	Answer: 'answer',
	Level: 'level'
};

collections = {
	Notify: Notify, 
	Program: Program, 
	Content: Content, 
	User: User, 
	Publicity: Publicity, 
	Poll: Poll, 
	PollUser: PollUser,
	Answer: Answer,
	Level: Level,
};