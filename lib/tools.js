updateDateRecord = function(){
	var dateRecords = Session.get('getupDateRecods');
	for(var i in dateRecords){
		Meteor.call('timeCompare', dateRecords[i].date_record, function(error, result){
			Session.set('getupToolTimeCompare' + dateRecords[i]._id, result);
		});
	}
}

incrementLimit = function(inc) {
  	Session.set(
  		'limit', 
  		(Session.get('limit') + ((inc === undefined)? 5 : inc))
	);
}