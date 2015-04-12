Template.pollUpdate.rendered = function(){

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
		Session.get('getup__form__imgBase64', this.data.collection._docs['_map'][enquete_id]['img']);
		
		//preeche as respostas da enquete
		var answers = Answer.find({poll_id:enquete_id}).map(function(a) {return [a._id, a.description]; });
		for(var i in answers){
			$(".section").append("<div class=\"input-field col s12\"><span>"+answers[i][1]+"</span></div>");
			answerIds = (Session.get('getup__form_answerIds'))? Session.get('getup__form_answerIds') : [];
			answerIds[answerIds.length] = answers[i][0];
		    Session.set('getup__form_answerIds', answerIds);
		}
	}

	$('select').material_select();
}

Template.pollUpdate.helpers({
	'imgBase64': function(){
		return Session.get('getup__form__imgBase64');
	}
});

Template.pollUpdate.events({
	'click #addAnswer': function(form){
		if(form.target.ownerDocument.all.answerdescription.value === ''){
			toastr.warning("Preecha o campo de resposta.", '', {"progressBar": true});
		}else{
			Meteor.call('insertAnswer', [111, form.target.ownerDocument.all.answerdescription.value], function(err, data){
				var answerIds = (Session.get('getup__form_answerIds'))? Session.get('getup__form_answerIds') : [];
				answerIds[answerIds.length] = data;
			    Session.set('getup__form_answerIds', answerIds);
			});

			//mostra a mensagem de sucesso
			toastr.success("Resposta inserida com sucesso.", '', {"progressBar": true});
		}
	},

	'submit #pollForm': function(form){
		form.preventDefault();
		if(form.target[2].value === '' || form.target[3].value === '' || !Session.get('getup__form_answerIds')){
			toastr.warning("Preecha os campos obrigatórios.", '', {"progressBar": true});
		}else{
			notDisablePoll = 0;
			if(form.target[5].ownerDocument.all.poll_active.checked === true){
				// Deixar somente uma enquete ativa por programa
				searchPoll = Poll.find({status:1, program_id:form.target[2].value}).map(function(a) {return [a._id]; });
				if(searchPoll.length > 0){
					Meteor.call('updateStatusPoll', [222, searchPoll[0][0], 0]);
				}
				notDisablePoll = 1;
			}

			Meteor.call('updatePoll', [222, form.target[0].value, form.target[2].value, form.target[3].value, Session.get('getup__form_answerIds'), Session.get('getup__form__imgBase64'), notDisablePoll]);
			toastr.success("Enquete atualizada com sucesso.", '', {"progressBar": true});
		}
	},

	"change input[type='file']": function(event,template){
	    var files = event.target.files;
	    if(files.length === 0){
	      return;
	    }
	    var file = files[0];
	    if(file.size > (3*100000)){
	    	toastr.warning("A logomarca ultrapassou o limite de 3mb.", '', {"progressBar": true});
	    }else{
		    var fileReader = new FileReader();
		    fileReader.onload = function(event){
		      Session.set('getup__form__imgBase64', (event.target.result)? event.target.result : 'undefined');
		    };
		    fileReader.readAsDataURL(file);
		}
  	}
});