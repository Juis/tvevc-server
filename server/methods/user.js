Meteor.methods({

	'insertUser': function(data){
		if(data[0] === 111){
		    return User.insert(
		    	{
		    		status:1,
		    		name:data[1],
		    		email:data[2],
		    		password:data[3],
		    		level:data[4],
		    		program_id:data[5],
		    		not_block_notify_all:data[6],
		    		social_network:data[7],
		    		social_network_id:data[8],
		    		picture:data[9],
		    		user_record:1,
		    		user_change:1,
		    		date_record:Meteor.call('dateNow'),
		    		date_change:Meteor.call('dateNow')
		    	}
	    	);
	    	//return true;
		}else{
			return false;
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
	   					program_id:data[6],
	   					not_block_notify_all:data[7],
			    		picture:data[8],
	   					user_change:1,
	   					date_change:Meteor.call('dateNow')
	   				}
	   			}
   			);
		}else{
		  //erro aqui
		}
	},

	'updateUserPassword': function(data){
		if(data[0] === 222){
	   		User.update(
	   			{_id:data[1]},
	   			{$set:
	   				{
	   					password:CryptoJS.MD5(data[2]).toString(),
	   					date_change:Meteor.call('dateNow')
	   				}
	   			}
   			);
		}else{
		  //erro aqui
		}
	},

	'updateUserNofity': function(data){
		if(data[0] === 222){
	   		User.update(
	   			{_id:data[1]},
	   			{$set:
	   				{
	   					not_block_notify_all:data[2],
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
		Level.insert({status:1, level:'0', description:'Usuario'});
		Level.insert({status:1, level:'1', description:'Programa'});
		Level.insert({status:1, level:'2', description:'Administrador'});
		return true;
	},

	'insertUserAdmin': function(){
		User.insert(
	    	{
	    		status:1,
	    		name:'Admin',
	    		email:'admin@gmail.com',
	    		password:CryptoJS.MD5('123').toString(),
	    		level:'2',
	    		program_id:null,
	    		not_block_notify_all:false,
	    		social_network:null,
	    		social_network_id:null,
	    		picture:null,
	    		user_record:1,
	    		user_change:1,
	    		date_record:Meteor.call('dateNow'),
	    		date_change:Meteor.call('dateNow')
	    	}
    	);
		return true;
	}

});