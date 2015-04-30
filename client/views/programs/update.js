// PROGRAM NEW PAGE
Template.programUpdate.rendered = function () {
	var programId = Router.current().params._id;
	if(programId !== null){
		//preenche os outros campos
		document.querySelector("#program_id").value = this.data.collection._docs['_map'][programId]['_id'];
		document.querySelector("#program_name").value = this.data.collection._docs['_map'][programId]['name'];
		document.querySelector("#program_description").value = this.data.collection._docs['_map'][programId]['description'];
		document.querySelector("#program_day").value = this.data.collection._docs['_map'][programId]['day'];
		document.querySelector("#program_hour").value = this.data.collection._docs['_map'][programId]['hour'];
		document.querySelector("#topo_upload").src = this.data.collection._docs['_map'][programId]['img_topo'];
		document.querySelector("#avatar_upload").src = this.data.collection._docs['_map'][programId]['img_avatar'];
		Session.set(
			'getupFormImgBase64Top', 
			this.data.collection._docs['_map'][programId]['img_topo']
		);
		Session.set(
			'getupFormImgBase64Avatar', 
			this.data.collection._docs['_map'][programId]['img_avatar']
		);
	}
};

Template.programUpdate.helpers({
	'imgBase64_topo': function(){
		return Session.get('getupFormImgBase64Top');
	},

	'imgBase64_avatar': function(){
		return Session.get('getupFormImgBase64Avatar');
	}
});

Template.programUpdate.events({
	'submit #programForm': function(form){
		form.preventDefault();
		if(form.target[1].value === '' || Session.get('getupFormImgBase64Top') === 'undefined' || Session.get('getupFormImgBase64Avatar') === 'undefined'){
			toastr.warning(
				"Preecha os campos obrigatórios.", 
				'', 
				{"progressBar": true}
			);
		}else{
			Meteor.call(
				'updateProgram', 
				[
					222, 
					form.target[0].value, 
					form.target[1].value, 
					form.target[2].value, 
					Session.get('getupFormImgBase64Top'), 
					Session.get('getupFormImgBase64Avatar')
				]
			);

			toastr.success(
				"Programa atualizado com sucesso.", 
				'', 
				{"progressBar": true}
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