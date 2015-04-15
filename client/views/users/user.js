 Template.user.helpers({
	'users': function(){
    	return User.find({status:1}).map(function(a) {
    		return {
    			_id:a._id, 
    			name:a.name, 
    			email:a.email, 
    			level:(Level.find({_id:a.level}).map(
	    				function(a) {
	    					return a.description; 
						}
					)
				)
    		}; 
    	});
	}
});

Template.user.events({
	'click #btnDelete': function(form){
		toastr.warning(
			"Deseja realmente desabilitar o usuário?<br /><span class=\"btn clear\" onclick=\"Meteor.call('deleteUser', [333, '"+form.currentTarget.childNodes[1].value+"']); $('#toast-container').remove();\">Ok</span><span class=\"btn clear\" onclick=\"$('#toast-container').remove()\">Cancelar</span>", 
			'', 
			{
				"tapToDismiss": false, 
				"timeOut": 0, 
				"extendedTimeOut": 0
			}
		);
	}
});