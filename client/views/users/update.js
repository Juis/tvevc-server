Template.userUpdate.rendered = function(){
	var activeSelected = '';
	var user_id = Router.current().params._id;
	if(user_id !== null){

		Session.set(
			'getupFormPassword',
			this.data.collection._docs['_map'][user_id]['password']
		);
		
		document.querySelector("#user_id").value = this.data.collection._docs['_map'][user_id]['_id'];
		document.querySelector("#user_name").value = this.data.collection._docs['_map'][user_id]['name'];
		document.querySelector("#user_email").value = this.data.collection._docs['_map'][user_id]['email'];
		document.querySelector("#user_password").value = '';
		document.querySelector("#user_block_all_notify").checked = (this.data.collection._docs['_map'][user_id]['not_block_notify_all'] === 1)? true : false;
		document.querySelector("#avatar_upload").src = this.data.collection._docs['_map'][user_id]['picture'];
		document.querySelector("#program").style.display = 'none';

		Session.set(
			'getupFormImgBase64Avatar', 
			this.data.collection._docs['_map'][user_id]['picture']
		);

		//preeche o select option de programa
		var levels = Level.find().map(function(a) {
			return [
				a.level, 
				a.description
			]; 
		});

		for(var i in levels){
			activeSelected = (this.data.collection._docs['_map'][user_id]['level'] === levels[i][0])? ['active', 'selected'] : ['',''];

			$("#user_nivel").append("<option value=\""+levels[i][0]+"\" "+activeSelected[1]+">"+levels[i][1]+"<option/>");
			$(".dropdown-content").append("<li class=\""+activeSelected[0]+"\"><span>"+levels[i][1]+"</span></li>");
		}

		//preeche o select option de programa
		var programs = Program.find().map(function(a) {
			return [
				a._id, 
				a.name
			]; 
		});

		for(var x in programs){
			activeSelected = (this.data.collection._docs['_map'][user_id]['_id'] === programs[x][0])? ['active', 'selected'] : ['',''];

			$("#user_program").append("<option value=\""+programs[x][0]+"\">"+programs[x][1]+"<option/>");
			$(".dropdown-content").append("<li class=\"\"><span>"+programs[x][1]+"</span></li>");
		}

		$('select').material_select();
	}
}

Template.userUpdate.helpers({
	'imgBase64_avatar': function(){
		return Session.get('getupFormImgBase64Avatar');
	}
});

Template.userUpdate.events({
	'change #user_nivel': function(form){
		document.querySelector("#program").style.display = (form.target.selectedIndex === 3)? 'block' : 'none';
	},

	'submit #userForm': function(form){
		form.preventDefault();
		if(form.target[1].value === '' 
			|| form.target[2].value === '' 
			|| form.target[5].value === ''
			|| (form.target[7].value === '' && form.target[5].value === '1')){
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
			notBlockNotify = (form.target[8].ownerDocument.all.user_block_all_notify.checked === true)? 1 : 0;
			Meteor.call(
				'updateUser', 
				[
					222, 
					form.target[0].value, 
					form.target[1].value, 
					form.target[2].value, 
					(form.target[3].value !== '')? CryptoJS.MD5(form.target[3].value).toString() : Session.get('getupFormPassword'), 
					form.target[5].value, 
					(form.target[7].value !== '')? form.target[7].value : null, 
					notBlockNotify,
					Session.get('getupFormImgBase64Avatar'),
				]
			);

			toastr.success(
				"Usuário atualizado com sucesso.", 
				'', 
				{"progressBar": true}
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