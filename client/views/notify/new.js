Template.notifyNew.rendered = function () {
	Session.set(
		'getupFormProgramId', 
		null
	);

	Session.set(
		'getupFormNotifyId', 
		null
	);

    //VMasker(this.find("[data-vm-mask-date-begin]")).maskPattern("99/99/9999");
	//testa se existe dados na collection local, se nao, envia pra pagina inicial de enquete
	if(Program.find().count() === 0){
		Router.go('notify');
		toastr.warning(
			"Necessario ter algum programa cadastrado.", 
			'', 
			{"progressBar": true}
		);
	}

	//preeche o select option de programa
	var programs = Program.find().map(function(a) {
		return [
			a._id, 
			a.name
		]; 
	});

	for(var i in programs){
		$("#notify_program").append("<option value=\""+programs[i][0]+"\">"+programs[i][1]+"<option/>");
		$(".dropdown-content").append("<li class=\"\"><span>"+programs[i][1]+"</span></li>");
	}

	$('select').material_select();
}

Template.notifyNew.events({ 
	'submit #notifyForm': function(form){
		form.preventDefault();
		if(form.target[2].value === '' || form.target[3].value === ''){
			toastr.warning(
				"Preecha os campos obrigatórios.", 
				'', 
				{"progressBar": true}
			);
		}else if((form.target[3].value).length > 200){
			toastr.warning(
				"rum, ultrapassou o limite de caracteres, somente possivel 200.", 
				'', 
				{"progressBar": true}
			);
		}else{
			var searchNotify = '';

			//verificar se ja existe uma notificacao com a mesma descricao, para o programa escolhido
			searchNotify = Notify.find({program_id:form.target[2].value, description:form.target[3].value}).map(function(a) {return [a._id]; });
			if(searchNotify.length > 0){
				Session.set(
					'getupFormNotifyId', 
					searchNotify[0][0]
				);

				Session.set(
					'getupFormProgramId', 
					form.target[2].value
				);

				toastr.warning(
					"Já existe esta notificacao registrada para o programa escolhido, deseja ativa-lá?<br /><a href=\"/notificacoes\" class=\"btn clear\" onclick=\"$('#toast-container').remove()\">Sim</a><a href=\"#\" class=\"btn clear\" onclick=\"$('#toast-container').remove()\">Não</a>", 
					'', 
					{"progressBar": true}
				);
			}else{
				// Deixar somente uma notificacao ativa por programa
				searchNotify = Notify.find(
					{
						status:1, 
						program_id:form.target[2].value
					}
				).map(
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

				// insere a nova notifycacao ativa
				Meteor.call(
					'insertNotify', 
					[
						111, 
						form.target[2].value, 
						form.target[3].value
					]
				);
				
				//remove os dados dos campos do form para evitar a duplicidade do registro
				form.target[2].value = form.target[3].value = '';
				Session.set(
					'getupFormProgramId', 
					null
				);

				Session.set(
					'getupFormNotifyId', 
					null
				);

				//mostra a mensagem de sucesso, com botao OK para confirmar e ir para a lista
				toastr.success(
					"Notificacao inserida com sucesso.<br /><a href=\"/notificacoes\" class=\"btn clear\" onclick=\"$('#toast-container').remove()\">Ok</a>", 
					'', 
					{
						"tapToDismiss": false, 
						"timeOut": 0, 
						"extendedTimeOut": 0
					}
				);
			}
		}
	}
});