 Template.poll.rendered = function(){ 

	if(Session.get('getup__form__pollId') && Session.get('getup__form__programId')){
		
		// Deixar somente uma enquete ativa por programa
		searchPoll = Poll.find({status:1, program_id:Session.get('getup__form__programId')}).map(function(a) {return [a._id]; });
		if(searchPoll.length > 0){
			Meteor.call('updateStatusPoll', [222, searchPoll[0][0], 0]);
		}

		// Deixa ativo a enquete escolhida
		Meteor.call('updateStatusPoll', [222, Session.get('getup__form__pollId'), 1]);

		Session.set('getup__form__pollId', '');
		Session.set('getup__form__programId', '');
		toastr.success("Enquete ativada com sucesso.", '', {"progressBar": true});
	}
 }

 Template.poll.helpers({
	'polls': function(){
    	return Poll.find({}).map(function(a) {return {_id:a._id, description:a.description, status:(a.status === 1)? 'Ativada' : 'Desativada'}; });
	}
});

Template.poll.events({
	'click #btnDelete': function(form){
		toastr.warning("Deseja realmente remover a enquete e todas respostas equivalente?<br /><span class=\"btn clear\" onclick=\"Meteor.call('deletePoll', [333, '"+form.currentTarget.childNodes[1].value+"']); $('#toast-container').remove();\">Ok</span><span class=\"btn clear\" onclick=\"$('#toast-container').remove()\">Cancelar</span>", '', {"tapToDismiss": false, "timeOut": 0, "extendedTimeOut": 0});
	}
});