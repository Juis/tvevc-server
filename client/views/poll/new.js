// POLL NEW PAGE
Template.pollNew.rendered = function () { 
	Session.set(
		'getupFormAnswerIds', 
		null
	);

	Session.set(
		'getupFormPollId', 
		null
	);

	//testa se existe dados na collection local, se nao, envia pra pagina inicial de enquete
	if(Program.find().count() === 0){
		Router.go('poll');
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
		$("#poll_program").append("<option value=\""+programs[i][0]+"\">"+programs[i][1]+"<option/>");
		$(".dropdown-content").append("<li class=\"\"><span>"+programs[i][1]+"</span></li>");
	}

	$('select').material_select();

};

Template.pollNew.helpers({ 
	'imgBase64': function(){
		return Session.get('getupFormImgBase64');
	},

	'answers': function(){
		return (Session.get('getupFormAnswerIds'))? 
					Answer.find(
						{
							status: 1, 
							_id:{ $in:Session.get('getupFormAnswerIds') }
						}, 
						{fields: 
							{
								_id:1, 
								description:1
							}
						}
					) 
				: '';
	}
});

Template.pollNew.events({ 
	'click #addAnswer': function(form){
		if(form.target.ownerDocument.all.answerNewDescription.value === ''){
			toastr.warning(
				"Preecha o campo de resposta.", 
				'', 
				{"progressBar": true}
			);
		}else if((form.target.ownerDocument.all.answerNewDescription.value).length > 200){
			toastr.warning(
				"rum, ultrapassou o limite de caracteres, somente possivel 200.", 
				'', 
				{"progressBar": true}
			);
		}else{
			Meteor.call(
				'insertAnswer', 
				[
					111, 
					form.target.ownerDocument.all.answerNewDescription.value
				], 
				function(err, data){
					var answerIds = (Session.get('getupFormAnswerIds'))? Session.get('getupFormAnswerIds') : [];
					answerIds[answerIds.length] = data;
				    Session.set('getupFormAnswerIds', answerIds);
				}
			);
			
			//remove os dados dos campos do form para evitar a duplicidade do registro
			form.target.ownerDocument.all.answerNewDescription.value = '';

			//mostra a mensagem de sucesso
			toastr.success(
				"Resposta inserida com sucesso.", 
				'', 
				{"progressBar": true}
			);
		}
	},

	'click #btnAnswerUpdate': function(form){
		if(form.currentTarget.ownerDocument.all["answerDescription"+form.currentTarget.children[0].value]['value'] === ''){
			toastr.warning(
				"Necessario preencher o campo da resposta a ser alterada.", 
				'', 
				{"progressBar": true}
			);
		}else if((form.currentTarget.ownerDocument.all["answerDescription"+form.currentTarget.children[0].value]['value']).length > 200){
			toastr.warning(
				"rum, ultrapassou o limite de caracteres, somente possivel 200.", 
				'', 
				{"progressBar": true}
			);
		}else{
			Meteor.call(
				'updateAnswer', 
				[
					222, 
					form.currentTarget.children[0].value, 
					form.currentTarget.ownerDocument.all["answerDescription"+form.currentTarget.children[0].value]['value']
				]
			);

			toastr.success(
				"Resposta atualizada com sucesso.", 
				'', 
				{"progressBar": true}
			);
		}
	},

	'click #btnAnswerDelete': function(form){
		toastr.warning(
			"Deseja realmente remover esta resposta?<br /><span class=\"btn clear\" onclick=\"Meteor.call('deleteAnswer', [333, '"+form.currentTarget.childNodes[1].value+"']); $('#toast-container').remove();\">Ok</span><span class=\"btn clear\" onclick=\"$('#toast-container').remove()\">Cancelar</span>", 
			'', 
			{
				"tapToDismiss": false, 
				"timeOut": 0, 
				"extendedTimeOut": 0
			}
		);
	},

	'submit #pollForm': function(form){
		form.preventDefault();
		if(form.target[2].value === '' || form.target[3].value === '' || !Session.get('getupFormAnswerIds')){
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
			var searchPoll = '';

			//verificar se ja existe uma enquete com a mesma pergunta
			searchPoll = Poll.find({description:form.target[3].value}).map(function(a) {return [a._id]; });
			if(searchPoll.length > 0){
				Session.set(
					'getupFormPollId', 
					searchPoll[0][0]
				);

				Session.set(
					'getupFormProgramId', 
					form.target[2].value
				);

				toastr.warning(
					"Já existe uma enquete registrada com esta pergunta, deseja ativa-lá?<br /><a href=\"/enquetes\" class=\"btn clear\" onclick=\"$('#toast-container').remove()\">Sim</a><a href=\"#\" class=\"btn clear\" onclick=\"$('#toast-container').remove()\">Não</a>", 
					'', 
					{"progressBar": true}
				);
			}else{

				// Deixar somente uma enquete ativa por programa
				searchPoll = Poll.find(
					{
						status:1, 
						program_id:form.target[2].value
					}
				).map(
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

				// insere a nova enquete ativa
				Meteor.call(
					'insertPoll', 
					[
						111, 
						form.target[2].value, 
						form.target[3].value, 
						Session.get('getupFormAnswerIds'), 
						Session.get('getupFormImgBase64')
					]
				);
				
				//remove os dados dos campos do form para evitar a duplicidade do registro
				form.target[2].value = form.target[3].value = '';
				Session.set(
					'getupFormImgBase64', 
					null
				);

				Session.set(
					'getupFormAnswerIds', 
					null
				);

				Session.set(
					'getupFormProgramId', 
					null
				);

				Session.set(
					'getupFormPollId', 
					null
				);

				//mostra a mensagem de sucesso, com botao OK para confirmar e ir para a lista
				toastr.success(
					"Enquete inserida com sucesso.<br /><a href=\"/enquetes\" class=\"btn clear\" onclick=\"$('#toast-container').remove()\">Ok</a>", 
					'', 
					{
						"tapToDismiss": false, 
						"timeOut": 0, 
						"extendedTimeOut": 0
					}
				);
			}
		}
	},

	"change input[type='file']": function(event,template){
	    var files = event.target.files;
	    if(files.length === 0){
	      return;
	    }
	    var file = files[0];
	    if(file.size > (3*100000)){
	    	toastr.warning(
	    		'A imagem ultrapassou o limite de 3mb.', 
	    		'', 
	    		{"progressBar": true}
    		);
	    }else{

		    var fileReader = new FileReader();
		    fileReader.onload = function(event){
		      	Session.set(
			      	'getupFormImgBase64', 
			      	(event.target.result)? event.target.result : 'undefined'
		      	);
		    };

		    fileReader.readAsDataURL(file);
		}
  	}

});