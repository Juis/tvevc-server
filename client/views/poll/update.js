Template.pollUpdate.rendered = function(){
	Session.set(
		'getupFormAnswerIds', 
		true
	);

	Session.set(
		'getupFormEnqueteId', 
		null
	);

	Session.set(
		'getupFormEnqueteId', 
		Router.current().params._id
	);

	//testa se existe dados na collection local, se nao, envia pra pagina inicial de enquete
	if(Program.find().count() === 0){
		Router.go('poll');
	}

	var enquete_id = Router.current().params._id;
	if(enquete_id !== null){
		var activeSelected = activeAnswer = answerIds = '';

		//preeche o select option de programa
		var programs = Program.find().map(function(a) {return [a._id, a.name]; });
		for(var i in programs){
			activeSelected = (this.data.collection._docs['_map'][enquete_id]['program_id'] === programs[i][0])? ['active', 'selected'] : ['',''];

			$("#poll_program").append("<option value=\""+programs[i][0]+"\" "+activeSelected[1]+">"+programs[i][1]+"<option/>");
			$(".dropdown-content").append("<li class=\""+activeSelected[0]+"\"><span>"+programs[i][1]+"</span></li>");
		}

		//preenche os outros campos
		document.querySelector("#poll_id").value = this.data.collection._docs['_map'][enquete_id]['_id'];
		document.querySelector("#poll_name").value = this.data.collection._docs['_map'][enquete_id]['description'];
		document.querySelector("#poll_active").checked = (this.data.collection._docs['_map'][enquete_id]['status'] === 1)? true : false;
		document.querySelector("#poll_imgBase64").src = this.data.collection._docs['_map'][enquete_id]['img'];
		Session.set(
			'getupFormImgBase64', 
			this.data.collection._docs['_map'][enquete_id]['img']
		);
	}

	$('select').material_select();
}

Template.pollUpdate.helpers({
	'imgBase64': function(){
		return Session.get('getupFormImgBase64');
	},

	'answers': function(){
		return Answer.find({poll_id:Session.get('getupFormEnqueteId')}).map(
			function(a) {
				return {
					_id:a._id, 
					description:a.description
				}; 
			}
		);
	}
});

Template.pollUpdate.events({
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
					form.target.ownerDocument.all.answerNewDescription.value, 
					Session.get('getupFormEnqueteId')
				]
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
			notDisablePoll = 0;
			if(form.target[5].ownerDocument.all.poll_active.checked === true){
				// Deixar somente uma enquete ativa por programa
				searchPoll = Poll.find({status:1, program_id:form.target[2].value}).map(
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
				notDisablePoll = 1;
			}

			Meteor.call(
				'updatePoll', 
				[
					222, 
					form.target[0].value, 
					form.target[2].value, 
					form.target[3].value, 
					Session.get('getupFormAnswerIds'), 
					Session.get('getupFormImgBase64'), 
					notDisablePoll
				]
			);

			toastr.success(
				"Enquete atualizada com sucesso.", 
				'', 
				{"progressBar": true}
			);
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
	    		"A logomarca ultrapassou o limite de 3mb.", 
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