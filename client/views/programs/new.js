// PROGRAM NEW PAGE
Template.programNew.rendered = function () { 
	Session.set(
		'getupFormImgBase64Top', 
		null
	); 
	Session.set(
		'getupFormImgBase64Avatar', 
		null
	); 

	VMasker(this.find("[data-vm-mask-hour]")).maskPattern("99:99");
};

Template.programNew.helpers({
	'imgBase64_topo': function(){
		return Session.get('getupFormImgBase64Top');
	},

	'imgBase64_avatar': function(){
		return Session.get('getupFormImgBase64Avatar');
	}
});

Template.programNew.events({
	'submit #programForm': function(form){
		form.preventDefault();
		if(form.target[1].value === '' || form.target[3].value === '' || form.target[4].value === '' || !Session.get('getupFormImgBase64Top') || !Session.get('getupFormImgBase64Avatar')){
			toastr.warning(
				"Preecha os campos obrigatórios.", 
				'', 
				{"progressBar": true}
			);
		}else if((form.target[1].value).length > 200 || (form.target[2].value).length > 200 || (form.target[4].value).length > 200){
			toastr.warning(
				"rum, ultrapassou o limite de caracteres, somente possivel 200.", 
				'', 
				{"progressBar": true}
			);
		}else{
			form.target[2].value = (form.target[2].value) ? form.target[2].value : ' ';
			Meteor.call(
				'insertProgram', 
				[
					111, 
					form.target[1].value, 
					form.target[2].value, 
					form.target[3].value, 
					form.target[4].value, 
					Session.get('getupFormImgBase64Top'), 
					Session.get('getupFormImgBase64Avatar'),
					form.target[5].value,
					form.target[6].value
				]
			);
			
			//remove os dados dos campos do form para evitar a duplicidade do registro
			form.target[2].value = form.target[3].value = '';
			Session.set(
				'getupFormImgBase64Top', 
				null
			);

			Session.set(
				'getupFormImgBase64Avatar', 
				null
			);

			//mostra a mensagem de sucesso, com botao OK para confirmar e ir para a lista
			toastr.success(
				"Programa inserido com sucesso.<br /><a href=\"/programas\" class=\"btn clear\" onclick=\"$('#toast-container').remove()\">Ok</a>", 
				'', 
				{
					"tapToDismiss": false, 
					"timeOut": 0, 
					"extendedTimeOut": 0
				}
			);
		}
	},

	"change #topo_upload": function(event,template){
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
			      	'getupFormImgBase64Top', 
			      	(event.target.result)? event.target.result : false
	      		);
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