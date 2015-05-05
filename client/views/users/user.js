Template.user.rendered = function(){ 
	Session.set('limit', 5);
}

Template.user.helpers({
	'users': function(){
    	return User.find({status:1}, {limit: Session.get('limit')}).map(function(a) {
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
	},

    'mais': function(){
        return (Session.get('limit') >= User.find().count())? 'display:none' : 'display:block';
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
	},

    'click #mais': function(){
        incrementLimit();
    }
});