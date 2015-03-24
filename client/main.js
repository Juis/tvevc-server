if (Meteor.isClient) {

	var throwError = function(message) {
  		Errors.insert({message: message})
	};
	
}

if (Meteor.isServer) {
  Meteor.startup(function () {

  });
}