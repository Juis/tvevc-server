Template.userNew.rendered = function () {
	//testa se existe dados na collection local, se nao, envia pra pagina inicial de enquete
	if(Level.find().count() === 0){
		Router.go('user');
		toastr.warning(
			"Necessario ter algum nível de permissão cadastrado.", 
			'', 
			{"progressBar": true}
		);
	}

	document.querySelector("#program").style.display = 'none';

	//preeche os levels
	var levels = Level.find().map(function(a) {
		return [
			a.level, 
			a.description
		]; 
	});

	for(var i in levels){
		$("#user_nivel").append("<option value=\""+levels[i][0]+"\">"+levels[i][1]+"<option/>");
		$(".dropdown-content").append("<li class=\"\"><span>"+levels[i][1]+"</span></li>");
	}

	//preeche o select option de programa
	var programs = Program.find().map(function(a) {
		return [
			a._id, 
			a.name
		]; 
	});

	for(var x in programs){
		$("#user_program").append("<option value=\""+programs[x][0]+"\">"+programs[x][1]+"<option/>");
		$(".dropdown-content").append("<li class=\"\"><span>"+programs[x][1]+"</span></li>");
	}

	$('select').material_select();
}

Template.userNew.helpers({
	'imgBase64_avatar': function(){
		return Session.get('getupFormImgBase64Avatar');
	}
});

Template.userNew.events({ 
	'change #user_nivel': function(form){
		document.querySelector("#program").style.display = (form.target.selectedIndex === 3)? 'block' : 'none';
	},

	'submit #userForm': function(form){
		form.preventDefault();
		if(form.target[1].value === '' 
			|| form.target[2].value === '' 
			|| form.target[3].value === '' 
			|| form.target[5].value === ''
			|| (form.target[7].value === '' && form.target[5].value === '1')){
			toastr.warning(
				"Preecha os campos obrigatorios.", 
				'', 
				{"progressBar": true}
			);
		}else if((form.target[1].value).length > 200 || (form.target[2].value).length > 200 || (form.target[3].value).length > 200){
			toastr.warning(
				"rum, ultrapassou o limite de caracteres, somente possivel 200.", 
				'', 
				{"progressBar": true}
			);
		}else{
			notBlockNotify = (form.target[8].ownerDocument.all.user_block_all_notify.checked === true)? 1 : 0;
			Meteor.call(
				'insertUser', 
				[
					111, 
					form.target[1].value, 
					form.target[2].value, 
					CryptoJS.MD5(form.target[3].value).toString(), 
					form.target[5].value, 
					(form.target[7].value !== '')? form.target[7].value : null, 
					notBlockNotify,
		    		0,
		    		null,
		    		Session.get('getupFormImgBase64Avatar'), 
				]
			);
			
			//remove os dados dos campos do form para evitar a duplicidade do registro
			form.target[1].value = form.target[2].value = form.target[3].value = form.target[5].value = '';
			form.target[6].src = '';
			form.target[8].ownerDocument.all.user_block_all_notify.checked = false;

			//mostra a mensagem de sucesso, com botao OK para confirmar e ir para a lista
			toastr.success(
				"Usuário inserido com sucesso.<br /><a href=\"/usuarios\" class=\"btn clear\" onclick=\"$('#toast-container').remove()\">Ok</a>", 
				'', 
				{
					"tapToDismiss": false, 
					"timeOut": 0, 
					"extendedTimeOut": 0
				}
			);
		}
	},

	"change #avatar_upload": function(event,template){
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
			      	'getupFormImgBase64Avatar', 
			      	(event.target.result)? event.target.result : false
		      	);
		    };

		    fileReader.readAsDataURL(file);
		}
  	}
});