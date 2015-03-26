Template.programNew.rendered = function () {
	$('select').material_select();
};

Template.programNew.events({
	'click a[program]': function(form){
		console.log(form.target.ownerDocument.all);
		console.log(Session.get('imgBase64'));
		if(form.target.ownerDocument.all.program[1].value === '' || form.target.ownerDocument.all.program[2].value === '' || Session.get('imgBase64') === 'undefined'){
			toast('Necessário preencher os campos obrigatórios!', 4000);
		}else{
			Meteor.call('insertProgram', [111, form.target.ownerDocument.all.program[1].value, form.target.ownerDocument.all.program[2].value, form.target.ownerDocument.all.program[3].value, Session.get('imgBase64')]);
			toast('Programa inserido com sucesso.', 4000, 'rounded', 
				function(){
					for(var i in form.target.ownerDocument.all.program){
						form.target.ownerDocument.all.program[i].value = '';
					}

					Session.set('imgBase64', 'undefined');
				}
			);
			
		}
	}
});

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