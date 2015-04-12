Meteor.methods({

	'insertNotify': function(data){
		if(data[0] === 111){
		    Notify.insert({status:1, description:data[1], date_begin:data[2], date_end:data[3], user_record:1, user_change:1, date_record:Meteor.call('dateNow'), date_change:Meteor.call('dateNow')});
		}else{
		  //erro aqui
		}
	},

	'updateNotify': function(data){
		if(data[0] === 222 && Meteor.call('validateProgram', data)){
		    Notify.update({_id:data[1]},{$set: {description:data[2], date_begin:data[3], date_end:data[4], user_change:1, date_change:Meteor.call('dateNow')}});
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