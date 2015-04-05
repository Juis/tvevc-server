 Template.poll.rendered = function(){ }

 Template.poll.helpers({
	'polls': function(){
    	return Poll.find({status: 1});
	}
});

Template.poll.events({
	'click #btnDelete': function(form){
		toastr.warning("Deseja realmente remover a enquete e todas respostas equivalente?<br /><span class=\"btn clear\" onclick=\"Meteor.call('deletePoll', [333, '"+form.currentTarget.childNodes[1].value+"']); $('#toast-container').remove();\">Ok</span><span class=\"btn clear\" onclick=\"$('#toast-container').remove()\">Cancelar</span>", '', {"tapToDismiss": false, "timeOut": 0, "extendedTimeOut": 0});
	}
});