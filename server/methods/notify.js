Meteor.methods({

	'insertNotify': function(data){
		if(data[0] === 111){
		    Notify.insert(
		    	{
		    		status:1, 
		    		program_id:data[1],
		    		description:data[2], 
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

  'updateStatusNotify': function(data){
    if(data[0] === 222 && data[1] !== ''){
      Notify.update(
        {_id:data[1]},
        {$set: 
          {
            status:data[2], 
            user_change:1, 
            date_change:Meteor.call('dateNow')
          }
        }
      );
    }else{
      //erro aqui
    }
  },

	'updateNotify': function(data){
		if(data[0] === 222){
		    Notify.update(
		    	{_id:data[1]},
		    	{$set: 
		    		{
		    			program_id:data[2],
		    			description:data[3], 
		    			status:data[4],
		    			user_change:1, 
		    			date_change:Meteor.call('dateNow')
		    		}
		    	}
	    	);
		}else{
		  //erro aqui
		}
	},

	'deleteNotify': function(data){
		if(data[0] === 333){
		  Notify.remove({_id:data[1]});
		}
	}

});