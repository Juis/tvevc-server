Meteor.setInterval(updateDateRecord, 1000 * 60);

Template.notify.rendered = function(){ 
	Session.set('limit', 5);

	if(Session.get('getupFormNotifyId') && Session.get('getupFormProgramId')){

		// Deixar somente uma notificacao ativa por programa
		searchNotify = Notify.find(
			{
				status:1, 
				program_id:Session.get('getupFormProgramId')
			}).map(
				function(a) {
					return [a._id]; 
				}
			);

		if(searchNotify.length > 0){
			Meteor.call(
				'updateStatusNotify', 
				[
					222, 
					searchNotify[0][0], 
					0
				]
			);
		}

		// Deixa ativo a notifycacao escolhida
		Meteor.call(
			'updateStatusNotify', 
			[
				222, 
				Session.get('getupFormNotifyId'), 
				1
			]
		);

		Session.set(
			'getupFormNotifyId', 
			null
		);

		Session.set(
			'getupFormProgramId', 
			null
		);

		toastr.success(
			"Notificacao ativada com sucesso.", 
			'', 
			{"progressBar": true}
		);
	}
 }

Template.notify.destroyed = function() {
    Meteor.clearInterval();
};

Template.notify.helpers({
	'notifyes': function(){
		var dateRecords = [];
		var i = 0;
		return Notify.find({}, {limit: Session.get('limit')}, {sort: {status:1}}).map(
    		function(n) {
    			dateRecords[i] = {
    				_id:n._id, 
    				date_record:n.date_record
    			};
    			Session.set('getupDateRecods', dateRecords);
    			i++;

    			Meteor.call(
    				'timeCompare', 
    				n.date_record, 
    				function(error, result){
    					Session.set('getupToolTimeCompare' + n._id, result);
    				}
				);
    			
    			return {
    				_id:n._id, 
    				description:n.description, 
    				timeCompared:Session.get('getupToolTimeCompare' + n._id),
    				program:Program.find({_id:n.program_id}).map(
    					function(p){
    						return p.name;
						}
					),
    				status:(n.status === 1)? 'Ativada' : 'Desativada'
    			}; 
    		}
		);
	},

    'mais': function(){
        return (Session.get('limit') >= Notify.find().count())? 'display:none' : 'display:block';
    }
});

Template.notify.events({
	'click #btnDelete': function(form){
		toastr.warning(
			"Deseja realmente remover a notificacao?<br /><span class=\"btn clear\" onclick=\"Meteor.call('deleteNotify', [333, '"+form.currentTarget.childNodes[1].value+"']); $('#toast-container').remove();\">Ok</span><span class=\"btn clear\" onclick=\"$('#toast-container').remove()\">Cancelar</span>", 
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

