Meteor.methods({
	
 	'dateNow': function(){
	   	var dateObj = new Date();
	    return dateObj.getDate() + '/' + (dateObj.getMonth()+1) + '/' + dateObj.getFullYear();
 	}

});