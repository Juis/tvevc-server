if (Meteor.isClient) {

	Meteor.subscribe('programListarTudoAtivo');


	var throwError = function(message) {
  		Errors.insert({message: message})
	};

}

if (Meteor.isServer) { Meteor.startup(function () {}); }