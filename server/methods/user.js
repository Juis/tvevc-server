//Level.insert({status:1, description:"Administrador"});Level.insert({status:1, description:"Sistema"});Level.insert({status:1, description:"Aplicativo"});

Meteor.methods({

	'insertUser': function(data){
		if(data[0] === 111){
		    User.insert(
		    	{
		    		status:1, 
		    		name:data[1], 
		    		email:data[2], 
		    		password:data[3], 
		    		level:data[4], 
		    		not_block_notify_all:data[5], 
		    		social_network:data[6],
		    		social_network_id:data[7],
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

	'updateUser': function(data){
		if(data[0] === 222){
	   		User.update(
	   			{_id:data[1]},
	   			{$set: 
	   				{
	   					name:data[2], 
	   					email:data[3], 
	   					password:data[4], 
	   					level:data[5], 
	   					not_block_notify_all:data[6], 
	   					user_change:1, 
	   					date_change:Meteor.call('dateNow')
	   				}
	   			}
   			);
		}else{
		  //erro aqui
		}
	},

	'deleteUser': function(data){
		if(data[0] === 333){
		  	User.update(
		  		{_id:data[1]},
		  		{$set: 
		  			{
		  				status:0, 
		  				user_change:1, 
		  				date_change:Meteor.call('dateNow')
		  			}
		  		}
	  		);
		}
	},

	'insertLevel': function(){
		Level.insert({status:1, description: 'usuario'});
		Level.insert({status:1, description: 'administrador'});
		return true;
	}

});