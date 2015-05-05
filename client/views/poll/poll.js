Meteor.setInterval(updateDateRecord, 1000 * 60);

Template.poll.rendered = function(){ 
	Session.set('limit', 5);

	if(Session.get('getupFormPollId') && Session.get('getupFormProgramId')){
		
		// Deixar somente uma enquete ativa por programa
		searchPoll = Poll.find(
			{
				status:1, 
				program_id:Session.get('getupFormProgramId')
			}).map(
				function(a) {
					return [a._id]; 
				}
			);

		if(searchPoll.length > 0){
			Meteor.call(
				'updateStatusPoll', 
				[
					222, 
					searchPoll[0][0], 
					0
				]
			);
		}

		// Deixa ativo a enquete escolhida
		Meteor.call(
			'updateStatusPoll', 
			[
				222, 
				Session.get('getupFormPollId'), 
				1
			]
		);

		Session.set(
			'getupFormPollId', 
			null
		);

		Session.set(
			'getupFormProgramId', 
			null
		);

		toastr.success(
			"Enquete ativada com sucesso.", 
			'', 
			{"progressBar": true}
		);
	}
}

Template.notify.destroyed = function() {
    Meteor.clearInterval();
};

Template.poll.helpers({
	'polls': function(){
		var dateRecords = [];
		var i = 0;
    	return Poll.find({}, {limit: Session.get('limit')}, {sort: {status:-1}}).map(
    		function(p) {
    			dateRecords[i] = {
    				_id:p._id, 
    				date_record:p.date_record
    			};
    			Session.set('getupDateRecods', dateRecords);
    			i++;
    			
    			Meteor.call(
    				'timeCompare', 
    				p.date_record, 
    				function(error, result){
    					Session.set('getupToolTimeCompare' + p._id, result);
    				}
				);

    			return {
    				_id:p._id, 
    				description:p.description, 
    				timeCompared:Session.get('getupToolTimeCompare' + p._id),
    				status:(p.status === 1)? 'Ativada' : 'Desativada'
    			}; 
    		}
		);
	},

    'mais': function(){
        return (Session.get('limit') >= Poll.find().count())? 'display:none' : 'display:block';
    }
});

Template.poll.events({
	'click #btnDelete': function(form){
		toastr.warning(
			"Deseja realmente remover a enquete e todas respostas equivalente?<br /><span class=\"btn clear\" onclick=\"Meteor.call('deletePoll', [333, '"+form.currentTarget.childNodes[1].value+"']); $('#toast-container').remove();\">Ok</span><span class=\"btn clear\" onclick=\"$('#toast-container').remove()\">Cancelar</span>", 
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