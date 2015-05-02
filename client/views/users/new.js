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

	//preeche o select option de programa
	var levels = Level.find().map(function(a) {
		return [
			a._id, 
			a.description
		]; 
	});

	for(var i in levels){
		$("#user_nivel").append("<option value=\""+levels[i][0]+"\">"+levels[i][1]+"<option/>");
		$(".dropdown-content").append("<li class=\"\"><span>"+levels[i][1]+"</span></li>");
	}

	$('select').material_select();
}

Template.userNew.events({ 
	'submit #userForm': function(form){
		form.preventDefault();
		if(form.target[1].value === '' || form.target[2].value === '' || form.target[3].value === '' || form.target[5].value === ''){
			toastr.warning(
				"Preecha os campos obrigatorios.", 
				'', 
				{"progressBar": true}
			);
		}else if((form.target[1].value).length > 200 || form.target[2].value).length > 200 || form.target[3].value).length > 200){
			toastr.warning(
				"rum, ultrapassou o limite de caracteres, somente possivel 200.", 
				'', 
				{"progressBar": true}
			);
		}else{
			notBlockNotify = (form.target[6].ownerDocument.all.user_block_all_notify.checked === true)? 1 : 0;
			Meteor.call(
				'insertUser', 
				[
					111, 
					form.target[1].value, 
					form.target[2].value, 
					CryptoJS.MD5(form.target[3].value).toString(), 
					form.target[5].value, 
					notBlockNotify
				]
			);
			
			//remove os dados dos campos do form para evitar a duplicidade do registro
			form.target[1].value = form.target[2].value = form.target[3].value = form.target[5].value = '';
			form.target[6].ownerDocument.all.user_block_all_notify.checked = false;

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
	}
});