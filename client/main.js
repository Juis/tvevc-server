if (Meteor.isClient) {
	
	Template.programNew.events({
		'submit #program': function(form){
			var a = form.target[0].value;
			var b = form.target[1].value;
			var c = form.target[2].value;
			var d = form.target[4].value;
			var e = form.target[5].value;
			var f = form.target[5].value;
			if(form.target[1].value === 'undefined' || form.target[2].value === 'undefined' || form.target[4].value === 'undefined'){

			}else{
				//Program.insert({permission:DataKey(), status:1, user_record:1, user_change:1, date_record:new Date(), date_change:new Date(), category_id:1, name:form.find('#nome').value});
			}
		}
	});

}

if (Meteor.isServer) {
  Meteor.startup(function () {

  });
}