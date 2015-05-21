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
    			text:data[4], 
    			img:data[3], 
    			date_record:Meteor.call('dateNow'), 
    			date_change:Meteor.call('dateNow')
    		}
  		);
  		return true;	    
	},

  'updateContent': function(data){
    if(data[0] === 222){
      Content.update(
        {_id:data[1]},
        {$set: 
          {
            text:data[3], 
            img:data[2],
            date_change:Meteor.call('dateNow')
          }
        }
      );
    }else{
      //erro aqui
    }
  },

  'updateContentStatus': function(data){
    if(data[0] === 222){
      Content.update(
        {_id:data[1]},
        {$set: 
          {
            status:2, 
            date_change:Meteor.call('dateNow')
          }
        }
      );
    }else{
      //erro aqui
    }
  },

	'deleteContent': function(data){
		if(data[0] !== 333){
			return false;
		}

  	Content.remove({_id:data[1]});
  	return true;
	}
});