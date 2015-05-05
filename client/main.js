for(var i in collections){
	Meteor.subscribe(collectionsName[i]);
}

Meteor.subscribe('contentPagination', Session.get('limit'));