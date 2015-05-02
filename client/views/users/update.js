Template.userUpdate.rendered = function(){
	var activeSelected = '';
	var user_id = Router.current().params._id;
	if(user_id !== null){
		document.querySelector("#user_id").value = this.data.collection._docs['_map'][user_id]['_id'];
		document.querySelector("#user_name").value = this.data.collection._docs['_map'][user_id]['name'];
		document.querySelector("#user_email").value = this.data.collection._docs['_map'][user_id]['email'];
		document.querySelector("#user_password").value = this.data.collection._docs['_map'][user_id]['password'];
		document.querySelector("#user_block_all_notify").checked = (this.data.collection._docs['_map'][user_id]['not_block_notify_all'] === 1)? true : false;

		//preeche o select option de programa
		var levels = Level.find().map(function(a) {
			return [
				a._id, 
				a.description
			]; 
		});

		for(var i in levels){
			activeSelected = (this.data.collection._docs['_map'][user_id]['level'] === levels[i][0])? ['active', 'selected'] : ['',''];

			$("#user_nivel").append("<option value=\""+levels[i][0]+"\" "+activeSelected[1]+">"+levels[i][1]+"<option/>");
			$(".dropdown-content").append("<li class=\""+activeSelected[0]+"\"><span>"+levels[i][1]+"</span></li>");
		}

		$('select').material_select();
	}
}

Template.userUpdate.events({
	'submit #userForm': function(form){
		form.preventDefault();
		if(form.target[1].value === '' || form.target[2].value === '' || form.target[3].value === '' || form.target[5].value === ''){
			toastr.warning(
				"Preecha os campos obrigatórios.", 
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
			notBlockNotify = (form.target[6].ownerDocument.all.user_block_all_notify.checked === true)? 1 : 0;
			Meteor.call(
				'updateUser', 
				[
					222, 
					form.target[0].value, 
					form.target[1].value, 
					form.target[2].value, 
					CryptoJS.MD5(form.target[3].value).toString(), 
					form.target[5].value, 
					notBlockNotify
				]
			);

			toastr.success(
				"Usuário atualizado com sucesso.", 
				'', 
				{"progressBar": true}
			);
		}
	}
});