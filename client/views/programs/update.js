// PROGRAM NEW PAGE
Template.programUpdate.rendered = function () {
	$('select').material_select();
	if(Router.current().params._id !== null){
		document.querySelector("#program_id").value = this.data.collection._docs['_map'][Router.current().params._id]['_id'];//programSearch[0]['_id'];
		document.querySelector("#program_category").value = this.data.collection._docs['_map'][Router.current().params._id]['category'];//programSearch[0]['category'];
		document.querySelector("#program_name").value = this.data.collection._docs['_map'][Router.current().params._id]['name'];//programSearch[0]['name'];
		document.querySelector("#program_description").value = this.data.collection._docs['_map'][Router.current().params._id]['description'];//programSearch[0]['description'];
		document.querySelector("#program_imgBase64").src = this.data.collection._docs['_map'][Router.current().params._id]['img'];// programSearch[0]['img'];
		Session.get('getup__form__imgBase64', this.data.collection._docs['_map'][Router.current().params._id]['img']);//programSearch[0]['img']);
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
		if(form.target[2].value === '' || form.target[3].value === '' || Session.get('getup__form__imgBase64') === 'undefined'){
			toast('Necessário preencher os campos obrigatórios!', 4000);
		}else{
			Meteor.call('updateProgram', [222, form.target[0].value, form.target[2].value, form.target[3].value, form.target[4].value, Session.get('getup__form__imgBase64')]);
			toast('Programa atualizado com sucesso.', 4000, 'rounded');
		}
	},

	"change input[type='file']": function(event,template){
	    var files = event.target.files;
	    if(files.length === 0){
	      return;
	    }
	    var file = files[0];
	    if(file.size > (3*100000)){
	    	toast('A logomarca ultrapassou o limite de 3mb.', 4000);
	    }else{

		    var fileReader = new FileReader();
		    fileReader.onload = function(event){
		      Session.set('getup__form__imgBase64', (event.target.result)? event.target.result : 'undefined');
		    };
		    fileReader.readAsDataURL(file);
		}
  	}
});