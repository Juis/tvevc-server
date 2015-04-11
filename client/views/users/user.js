 Template.notify.helpers({
	'notifyes': function(){
    	return Notify.find({status: 1});
	}
});

Template.notify.events({
	'click #btnDelete': function(form){
		toastr.warning("Deseja realmente remover a enquete e todas respostas equivalente?<br /><span class=\"btn clear\" onclick=\"Meteor.call('deleteNotify', [333, '"+form.currentTarget.childNodes[1].value+"']); $('#toast-container').remove();\">Ok</span><span class=\"btn clear\" onclick=\"$('#toast-container').remove()\">Cancelar</span>", '', {"tapToDismiss": false, "timeOut": 0, "extendedTimeOut": 0});
	}
});