// PROGRAM NEW PAGE
Template.programNew.rendered = function () {

	//testa se existe dados na collection local, se nao, envia pra pagina inicial de programa
	if(Category.find().count() === 0){
		Router.go('programs');
	}

	//preeche o select option de categoria
	var categoryes = Category.find().map(function(a) {return [a._id, a.description]; });
	for(var i in categoryes){
		$("#program_category").append("<option value=\""+categoryes[i][0]+"\">"+categoryes[i][1]+"<option/>");
		$(".dropdown-content").append("<li class=\"\"><span>"+categoryes[i][1]+"</span></li>");
	}

	$('select').material_select();
};

Template.programNew.helpers({
	'imgBase64': function(){
		return Session.get('getup__form__imgBase64');
	}
});

Template.programNew.events({
	'submit #programForm': function(form){
		form.preventDefault();
		if(form.target[2].value === '' || form.target[3].value === '' || Session.get('getup__form__imgBase64') === 'undefined'){
			toastr.warning("Preecha os campos obrigatórios.", '', {"progressBar": true});
		}else{
			form.target[4].value = (form.target[4].value)? form.target[4].value : ' ';
			Meteor.call('insertProgram', [111, form.target[2].value, form.target[3].value, form.target[4].value, Session.get('getup__form__imgBase64')]);
			
			//remove os dados dos campos do form para evitar a duplicidade do registro
			form.target[2].value = form.target[3].value = form.target[4].value ='';
			Session.set('getup__form__imgBase64', '');

			//mostra a mensagem de sucesso, com botao OK para confirmar e ir para a lista
			toastr.success("Programa inserido com sucesso.<br /><a href=\"/programas\" class=\"btn clear\" onclick=\"$('#toast-container').remove()\">Ok</a>", '', {"tapToDismiss": false, "timeOut": 0, "extendedTimeOut": 0});
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