 Template.user.helpers({
	'notifyes': function(){
    	return User.find({status: 1});
	}
});

Template.user.events({
	'click #btnDelete': function(form){
		toastr.warning("Deseja realmente remover o usuário e todas as suas interações equivalente?<br /><span class=\"btn clear\" onclick=\"Meteor.call('deleteUser', [333, '"+form.currentTarget.childNodes[1].value+"']); $('#toast-container').remove();\">Ok</span><span class=\"btn clear\" onclick=\"$('#toast-container').remove()\">Cancelar</span>", '', {"tapToDismiss": false, "timeOut": 0, "extendedTimeOut": 0});
	}
});