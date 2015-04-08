// POLL NEW PAGE
Template.pollNew.rendered = function () { 
	Session.set('getup__form_answerIds', '');

	//testa se existe dados na collection local, se nao, envia pra pagina inicial de enquete
	if(Program.find().count() === 0){
		Router.go('poll');
		toastr.warning("Necessario ter algum programa cadastrado.", '', {"progressBar": true});
	}

	//preeche o select option de programa
	var programs = Program.find().map(function(a) {return [a._id, a.name]; });
	for(var i in programs){
		$("#poll_program").append("<option value=\""+programs[i][0]+"\">"+programs[i][1]+"<option/>");
		$(".dropdown-content").append("<li class=\"\"><span>"+programs[i][1]+"</span></li>");
	}

	$('select').material_select();

};

Template.pollNew.helpers({ 
	'imgBase64': function(){
		return Session.get('getup__form__imgBase64');
	},

	'answers': function(){
		return (Session.get('getup__form_answerIds'))? Answer.find({status: 1, _id:{ $in:Session.get('getup__form_answerIds') }}, {fields: {_id:1, description:1}}) : '';
	}
});

Template.pollNew.events({ 
	'click #addAnswer': function(form){
		if(form.target.ownerDocument.all.answerdescription.value === ''){
			toastr.warning("Preecha o campo de resposta.", '', {"progressBar": true});
		}else{
			Meteor.call('insertAnswer', [111, form.target.ownerDocument.all.answerdescription.value], function(err, data){
				var answerIds = (Session.get('getup__form_answerIds'))? Session.get('getup__form_answerIds') : [];
				answerIds[answerIds.length] = data;
			    Session.set('getup__form_answerIds', answerIds);
			});
			
			//remove os dados dos campos do form para evitar a duplicidade do registro
			form.target.ownerDocument.all.answerdescription.value = '';

			//mostra a mensagem de sucesso
			toastr.success("Resposta inserida com sucesso.", '', {"progressBar": true});
		}
	},

	'submit #pollForm': function(form){
		form.preventDefault();
		if(form.target[2].value === '' || form.target[3].value === '' || !Session.get('getup__form_answerIds')){
			toastr.warning("Preecha os campos obrigatórios.", '', {"progressBar": true});
		}else{
			Meteor.call('insertPoll', [111, form.target[2].value, form.target[3].value, Session.get('getup__form_answerIds'), Session.get('getup__form__imgBase64')]);
			
			//remove os dados dos campos do form para evitar a duplicidade do registro
			form.target[2].value = form.target[3].value = '';
			Session.set('getup__form__imgBase64', '');
			Session.set('getup__form_answerIds', '');

			//mostra a mensagem de sucesso, com botao OK para confirmar e ir para a lista
			toastr.success("Enquete inserida com sucesso.<br /><a href=\"/enquetes\" class=\"btn clear\" onclick=\"$('#toast-container').remove()\">Ok</a>", '', {"tapToDismiss": false, "timeOut": 0, "extendedTimeOut": 0});
		}
	},

	"change input[type='file']": function(event,template){
	    var files = event.target.files;
	    if(files.length === 0){
	      return;
	    }
	    var file = files[0];
	    if(file.size > (3*100000)){
	    	toastr.warning('A imagem ultrapassou o limite de 3mb.', '', {"progressBar": true});
	    }else{

		    var fileReader = new FileReader();
		    fileReader.onload = function(event){
		      Session.set('getup__form__imgBase64', (event.target.result)? event.target.result : 'undefined');
		    };
		    fileReader.readAsDataURL(file);
		}
  	}

});