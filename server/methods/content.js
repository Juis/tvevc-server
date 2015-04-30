Meteor.methods({
	'insertContent': function(data){
	    if(data[0] !== 111){
	    	return false;
    	}

      	Content.insert(
      		{
      			status:1, 
      			program_id:data[1], 
      			user_id:data[2], 
      			text:data[3], 
      			img:data[4], 
      			date_record:Meteor.call('dateNow'), 
      			date_change:Meteor.call('dateNow')
      		}
  		);
  		return true;	    
  	},

	'deleteContent': function(data){
		if(data[0] !== 333){
			return false;
		}

	  	Content.remove({_id:data[1]});
	  	return true;
	}
});