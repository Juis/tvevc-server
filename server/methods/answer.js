Meteor.methods({
	
	'insertAnswer': function(data){
	    if(data[0] === 111 && data[1] !== ''){
	    	var pollId = (data[2])? data[2] : 'undefined';
	      	return Answer.insert(
	      		{
	      			status:1, 
	      			poll_id:pollId, 
	      			description:data[1], 
	      			user_record:1, 
	      			user_change:1, 
	      			date_record:Meteor.call('dateNow'), 
	      			date_change:Meteor.call('dateNow')
	      		}
      		);
	    }else{
	      //erro aqui
	    }
  	},

	'updateAnswer': function(data){
		if(data[0] === 222){
		    Answer.update(
		    	{_id:data[1]},
		    	{$set: 
		    		{
		    			description:data[2], 
		    			user_change:1, 
		    			date_change:Meteor.call('dateNow')
		    		}
		    	}
	    	);
		}else{
		  //erro aqui
		}
	},

	'deleteAnswer': function(data){
		if(data[0] === 333){
		  Answer.remove({_id:data[1]});
		}
	}

});