Meteor.methods({
 	'dateNow': function(){
	   	var dateObj = new Date();
	    return dateObj.getDate() + '/' + (dateObj.getMonth()+1) + '/' + dateObj.getFullYear() + ' ' + dateObj.getHours() + ':' +  dateObj.getMinutes() + ':' + dateObj.getSeconds();
 	},

 	'timeCompare': function(dateTime){ 
 		var timeCompared = calc = undefined;
		var dtB = new Date();
	
		dtA_config = dateTime.split(' ');
		dtA_date = dtA_config[0].split('/');
		dtA_hour = dtA_config[1].split(':');

		if(dtB.getFullYear() > dtA_date[2]){
			calc = (dtB.getFullYear() - dtA_date[2]);
			timeCompared = calc + ' ano' + ((calc > 1)? 's ' : ' ');
		}else if(dtB.getMonth() > dtA_date[1]){
			calc = (dtB.getMonth() - dtA_date[1]);
			timeCompared = calc + ' m' + ((calc > 1)? 'eses ' : 'ês ');
		}else if(dtB.getDate() > dtA_date[0]){
			calc = (dtB.getDate() - dtA_date[0]);
			timeCompared = calc + ' dia' + ((calc > 1)? 's ' : ' ');
		}else if(dtB.getHours() > dtA_hour[0]){
			calc = (dtB.getHours() - dtA_hour[0]);
			timeCompared = calc + ' hora' + ((calc > 1)? 's ' : ' ');
		}else if(dtB.getMinutes() > dtA_hour[1]){
			calc = (dtB.getMinutes() - dtA_hour[1]);
			timeCompared = calc + ' minuto' + ((calc > 1)? 's ' : ' ');
		}else if(dtB.getSeconds() > dtA_hour[2]){
			calc = (dtB.getSeconds() - dtA_hour[2]);
			timeCompared = calc + ' segundo' + ((calc > 1)? 's ' : ' ');
		}else{
			timeCompared = '10 milissegundos';
		}

		return timeCompared;
 	}

});