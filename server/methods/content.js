Meteor.methods({
	'insertContent': function(data){
	    if(data[0] === 111){
	      	Content.insert(
	      		{
	      			status:1, 
	      			program_id:data[1], 
	      			user_id:data[2], 
	      			text:data[3], 
	      			img:data[4], 
	      			permission:data[5],
	      			date_record:Meteor.call('dateNow'), 
	      			date_change:Meteor.call('dateNow')
	      		}
      		);
      		return true;
	    }else{
	      return false;
	    }
  	}
});