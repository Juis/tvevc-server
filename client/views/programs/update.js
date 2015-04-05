// PROGRAM NEW PAGE
Template.programUpdate.rendered = function () {
	//testa se existe dados na collection local, se nao, envia pra pagina inicial de programa
	if(Category.find().count() === 0){
		Router.go('programs');
	}

	if(Router.current().params._id !== null){

		//preeche o select option de categoria
		var activeSelected = '';
		var categoryes = Category.find().map(function(a) {return [a._id, a.description]; });
		for(var i in categoryes){
			activeSelected = (this.data.collection._docs['_map'][Router.current().params._id]['category_id'] === categoryes[i][0])? ['active', 'selected'] : ['',''];

			$("#program_category").append("<option value=\""+categoryes[i][0]+"\" "+activeSelected[1]+">"+categoryes[i][1]+"<option/>");
			$(".dropdown-content").append("<li class=\""+activeSelected[0]+"\"><span>"+categoryes[i][1]+"</span></li>");
		}

		//preenche os outros campos
		document.querySelector("#program_id").value = this.data.collection._docs['_map'][Router.current().params._id]['_id'];//programSearch[0]['_id'];
		document.querySelector("#program_name").value = this.data.collection._docs['_map'][Router.current().params._id]['name'];//programSearch[0]['name'];
		document.querySelector("#program_description").value = this.data.collection._docs['_map'][Router.current().params._id]['description'];//programSearch[0]['description'];
		document.querySelector("#program_imgBase64").src = this.data.collection._docs['_map'][Router.current().params._id]['img'];//programSearch[0]['description'];
		Session.get('getup__form__imgBase64', this.data.collection._docs['_map'][Router.current().params._id]['img']);//programSearch[0]['img']);
	}

	$('select').material_select();
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
			toastr.warning("Preecha os campos obrigatórios.", '', {"progressBar": true});
		}else{
			Meteor.call('updateProgram', [222, form.target[0].value, form.target[2].value, form.target[3].value, form.target[4].value, Session.get('getup__form__imgBase64')]);
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