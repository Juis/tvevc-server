Template.programNew.rendered = function () {
	$('select').material_select();
};

Template.programNew.events({
	'click a[program]': function(form){
		//if(form.target.ownerDocument.all.program[1].value === '' || form.target.ownerDocument.all.program[2].value === '' || form.target.ownerDocument.all.program[4].value === ''){
		//	throwError('Preencha os campos obrigatórios.');
		//}else{
			// lembrar pegar e validar a imagem pelo size, clientHeight, clientWidth
			Meteor.call('insertProgram', [111, form.target.ownerDocument.all.program[1].value, form.target.ownerDocument.all.program[2].value, form.target.ownerDocument.all.program[3].value, Session.get('imgBase64')]);
		//}
	}
});

Template.fileUpload.events({
  "change input[type='file']":function(event,template){
    var files=event.target.files;
    if(files.length===0){
      return;
    }
    var file=files[0];
    if(file.size > (300*1000)){
    	return;
    }else{
	    var fileReader=new FileReader();
	    fileReader.onload=function(event){
	      Session.set('imgBase64', event.target.result);
	    };
	    fileReader.readAsDataURL(file);
	}
  }
});