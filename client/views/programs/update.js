// PROGRAM NEW PAGE
Template.programUpdate.rendered = function () {
	var programId = Router.current().params._id;
	if(programId !== null){
		//preenche os outros campos
		document.querySelector("#program_id").value = this.data.collection._docs['_map'][programId]['_id'];//programSearch[0]['_id'];
		document.querySelector("#program_name").value = this.data.collection._docs['_map'][programId]['name'];//programSearch[0]['name'];
		document.querySelector("#program_description").value = this.data.collection._docs['_map'][programId]['description'];//programSearch[0]['description'];
		document.querySelector("#program_imgBase64").src = this.data.collection._docs['_map'][programId]['img'];//programSearch[0]['description'];
		Session.set('getup__form__imgBase64', this.data.collection._docs['_map'][programId]['img']);//programSearch[0]['img']);
	}
};

Template.programUpdate.helpers({
	'imgBase64': function(){
		return Session.get('getup__form__imgBase64');
	}
});

Template.programUpdate.events({
	'submit #programForm': function(form){
		form.preventDefault();
		if(form.target[1].value === '' || Session.get('getup__form__imgBase64') === 'undefined'){
			toastr.warning("Preecha os campos obrigatórios.", '', {"progressBar": true});
		}else{
			Meteor.call('updateProgram', [222, form.target[0].value, form.target[1].value, form.target[2].value, Session.get('getup__form__imgBase64')]);
			toastr.success("Programa atualizado com sucesso.", '', {"progressBar": true});
		}
	},

	"change input[type='file']": function(event,template){
	    var files = event.target.files;
	    if(files.length === 0){
	      return;
	    }
	    var file = files[0];
	    if(file.size > (3*100000)){
	    	toastr.warning("A logomarca ultrapassou o limite de 3mb.", '', {"progressBar": true});
	    }else{
		    var fileReader = new FileReader();
		    fileReader.onload = function(event){
		      Session.set('getup__form__imgBase64', (event.target.result)? event.target.result : 'undefined');
		    };
		    fileReader.readAsDataURL(file);
		}
  	}
});