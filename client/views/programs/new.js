Router.onBeforeAction(function(){
	this.next();
	Session.set('getup__i', this.params.query.i);
});

// PROGRAM NEW PAGE
Template.programNew.rendered = function () {
	$('select').material_select();
	if(Session.get('getup__i') !== 'undefined'){
		var programSearch = Program.find({_id:Session.get('getup__i'), status:1}).fetch();
		if(programSearch !== ''){
			document.getElementById("program_id").value = programSearch[0]['_id'];
			document.getElementById("program_category").value = programSearch[0]['category'];
			document.getElementById("program_name").value = programSearch[0]['name'];
			document.getElementById("program_description").value = programSearch[0]['description'];
			document.getElementById("program_upload").value = programSearch[0]['logo'];
			document.getElementById("program_imgBase64").src = programSearch[0]['logo'];
		}
	}
};

Template.programNew.helpers({
	'title': function(){
		return (Session.get('getup__i'))? 'Alterar Programa' : 'Novo Programa';
	},
	'imgBase64': function(){
		return Session.get('imgBase64');
	}
});

Template.programNew.events({
	'click a[program]': function(form){
		if(form.target.ownerDocument.all.program[2].value === '' || form.target.ownerDocument.all.program[3].value === '' || Session.get('imgBase64') === 'undefined'){
			toast('Necessário preencher os campos obrigatórios!', 4000);
		}else{
			if(!Session.get('getup__i')){
				Meteor.call('insertProgram', [111, form.target.ownerDocument.all.program[2].value, form.target.ownerDocument.all.program[3].value, form.target.ownerDocument.all.program[4].value, Session.get('imgBase64')]);
				toast('Programa inserido com sucesso.', 4000, 'rounded', 
					function(){
						for(var i in form.target.ownerDocument.all.program){
							form.target.ownerDocument.all.program[i].value = '';
						}

						Session.set('imgBase64', 'undefined');
					}
				);
			}else{
				Meteor.call('updateProgram', [222, form.target.ownerDocument.all.program[0].value, form.target.ownerDocument.all.program[2].value, form.target.ownerDocument.all.program[3].value, form.target.ownerDocument.all.program[4].value, Session.get('imgBase64')]);
				toast('Programa atualizado com sucesso.', 4000, 'rounded');
			}
		}
	}
});

// SELECT
Template.programSelect.helpers({
  "options": function(){
  	return Category.find({status: 1});
  }
});

// FILE UPLOAD
Template.fileUpload.events({
  "change input[type='file']":function(event,template){
    var files=event.target.files;
    if(files.length===0){
      return;
    }
    var file=files[0];
    if(file.size > (3*100000)){
    	toast('A logomarca ultrapassou o limite de 3mb.', 4000);
    }else{
	    var fileReader=new FileReader();
	    fileReader.onload=function(event){
	      Session.set('imgBase64', event.target.result);
	    };
	    fileReader.readAsDataURL(file);
	}
	
  }
});

Template.fileUpload.helpers({
	'imgBase64': function(){
		return Session.get('imgBase64');
	}
});