// PROGRAM NEW PAGE
Template.programNew.rendered = function () { 
	Session.set('getup__form__imgBase64_topo', ''); 
	Session.set('getup__form__imgBase64_avatar', ''); 
};

Template.programNew.helpers({
	'imgBase64_topo': function(){
		return Session.get('getup__form__imgBase64_topo');
	},

	'imgBase64_avatar': function(){
		return Session.get('getup__form__imgBase64_avatar');
	}
});

Template.programNew.events({
	'submit #programForm': function(form){
		form.preventDefault();
		if(form.target[1].value === '' || !Session.get('getup__form__imgBase64_topo') || !Session.get('getup__form__imgBase64_avatar')){
			toastr.warning("Preecha os campos obrigatórios.", '', {"progressBar": true});
		}else{
			form.target[2].value = (form.target[2].value)? form.target[2].value : ' ';
			Meteor.call('insertProgram', [111, form.target[1].value, form.target[2].value, Session.get('getup__form__imgBase64_topo'), Session.get('getup__form__imgBase64_avatar')]);
			
			//remove os dados dos campos do form para evitar a duplicidade do registro
			form.target[2].value = form.target[3].value = '';
			Session.set('getup__form__imgBase64_topo', '');
			Session.set('getup__form__imgBase64_avatar', '');

			//mostra a mensagem de sucesso, com botao OK para confirmar e ir para a lista
			toastr.success("Programa inserido com sucesso.<br /><a href=\"/programas\" class=\"btn clear\" onclick=\"$('#toast-container').remove()\">Ok</a>", '', {"tapToDismiss": false, "timeOut": 0, "extendedTimeOut": 0});
		}
	},

	"change #topo_upload": function(event,template){
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
		      Session.set('getup__form__imgBase64_topo', (event.target.result)? event.target.result : false);
		    };
		    fileReader.readAsDataURL(file);
		}
  	},

	"change #avatar_upload": function(event,template){
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
		      Session.set('getup__form__imgBase64_avatar', (event.target.result)? event.target.result : false);
		    };
		    fileReader.readAsDataURL(file);
		}
  	}
});