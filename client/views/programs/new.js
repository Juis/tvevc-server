// PROGRAM NEW PAGE
Template.programNew.rendered = function () {
	$('select').material_select();
};

Template.programNew.helpers({
	'imgBase64': function(){
		return Session.get('getup__form__imgBase64');
	}
});

Template.programNew.events({
	'submit #programForm': function(form){
		form.preventDefault();
		if(form.target[2].value === '' || form.target[3].value === '' || Session.get('getup__form__imgBase64') === 'undefined'){
			toast('Necessário preencher os campos obrigatórios!', 4000);
		}else{
			Meteor.call('insertProgram', [111, form.target[2].value, form.target[3].value, form.target[4].value, Session.get('getup__form__imgBase64')]);
			
			Router.go('programs', {success:"23"});


				//function(){
				//Session.set('getup__form__imgBase64', 'undefined');
				//toast('Programa inserido com sucesso.', 4000, 'rounded');
			//});
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