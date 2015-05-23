Template.user.rendered = function(){ 
	Session.set('limit', 5);
}

Template.user.helpers({
	'users': function(){
    	return User.find({status:1}, {limit: Session.get('limit')}).map(function(u) {
    		return {
    			_id:u._id, 
    			name:u.name, 
    			email:u.email, 
    			picture:u.picture,
    			level:(Level.find({level:u.level}).map(
	    				function(l) {
	    					return l.description; 
						}
					)
				)
    		}; 
    	});
	},

    'mais': function(){
        return (Session.get('limit') >= User.find().count())? 'display:none' : 'display:block';
    },

    'admin': function(){
		var userSearch = User.findOne({_id:Meteor.userId2}, {$fields: {_id:1, level:1}});
        return (userSearch !== undefined && userSearch.level !== '2')? false : true;
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