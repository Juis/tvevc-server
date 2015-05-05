for(var i in collections){
	Meteor.subscribe(collectionsName[i]);
}

Meteor.subscribe('contentPagination', Session.get('limit'));
Meteor.subscribe('notifyPagination', Session.get('limit'));
Meteor.subscribe('pollPagination', Session.get('limit'));
Meteor.subscribe('userPagination', Session.get('limit'));