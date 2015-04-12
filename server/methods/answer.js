Meteor.methods({
	
	'insertAnswer': function(data){
	    if(data[0] === 111 && data[1] !== ''){
	      return Answer.insert({status:1, poll_id:'undefined', description:data[1], user_record:1, user_change:1, date_record:Meteor.call('dateNow'), date_change:Meteor.call('dateNow')});
	    }else{
	      //erro aqui
	    }
  	}

});