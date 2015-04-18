Template.notify.rendered = function(){ 
	
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

 Template.notify.helpers({
	'notifyes': function(){
    	return Notify.find({}).map(
    		function(a) {
    			return {
    				_id:a._id, 
    				description:a.description, 
    				program:Program.find({_id:a.program_id}).map(
    					function(p){
    						return p.name;
						}
					),
    				status:(a.status === 1)? 'Ativada' : 'Desativada'
    			}; 
    		}
		);
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
	}
});