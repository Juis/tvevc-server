Template.userNew.rendered = function () {
	$('select').material_select();
}

Template.userNew.events({ 
	'submit #userForm': function(form){
		form.preventDefault();
		if(form.target[1].value === '' || form.target[2].value === '' || form.target[3].value === ''){
			toastr.warning("Preecha os campos obrigatorios.", '', {"progressBar": true});
		}else{
			Meteor.call('insertUser', [111, form.target[1].value, form.target[2].value, form.target[3].value]);
			
			//remove os dados dos campos do form para evitar a duplicidade do registro
			form.target[1].value = form.target[2].value = form.target[3].value = '';

			//mostra a mensagem de sucesso, com botao OK para confirmar e ir para a lista
			toastr.success("Notificacao inserida com sucesso.<br /><a href=\"/notificacoes\" class=\"btn clear\" onclick=\"$('#toast-container').remove()\">Ok</a>", '', {"tapToDismiss": false, "timeOut": 0, "extendedTimeOut": 0});
		}
	}
});