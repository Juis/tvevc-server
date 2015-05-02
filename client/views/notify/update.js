Template.notifyUpdate.rendered = function(){
	//testa se existe dados na collection local, se nao, envia pra pagina inicial de notificacao
	if(Program.find().count() === 0){
		Router.go('notify');
	}

	var notify_id = Router.current().params._id;
	if(notify_id !== null){
		//preeche o select option de programa
		var programs = Program.find().map(function(a) {return [a._id, a.name]; });
		for(var i in programs){
			activeSelected = (this.data.collection._docs['_map'][notify_id]['program_id'] === programs[i][0])? ['active', 'selected'] : ['',''];

			$("#notify_program").append("<option value=\""+programs[i][0]+"\" "+activeSelected[1]+">"+programs[i][1]+"<option/>");
			$(".dropdown-content").append("<li class=\""+activeSelected[0]+"\"><span>"+programs[i][1]+"</span></li>");
		}

		document.querySelector("#notify_id").value = this.data.collection._docs['_map'][notify_id]['_id'];//programSearch[0]['_id'];
		document.querySelector("#notify_name").value = this.data.collection._docs['_map'][notify_id]['description'];//programSearch[0]['name'];
		document.querySelector("#notify_active").checked = (this.data.collection._docs['_map'][notify_id]['status'] === 1)? true : false;
	}

	$('select').material_select();
}

Template.notifyUpdate.events({
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

			notDisableNotify = 0;
			if(form.target[4].ownerDocument.all.notify_active.checked === true){
				// Deixar somente uma enquete ativa por programa
				searchNotify = Notify.find({status:1, program_id:form.target[2].value}).map(
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
				notDisableNotify = 1;
			}

			Meteor.call(
				'updateNotify', 
				[
					222, 
					form.target[0].value, 
					form.target[2].value, 
					form.target[3].value,
					notDisableNotify
				]
			);

			toastr.success(
				"Notificacao atualizada com sucesso.", 
				'', 
				{"progressBar": true}
			);
		}
	}
});