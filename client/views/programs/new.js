Template.programNew.rendered = function () {
	$('select').material_select();
};

Template.programNew.events({
	'click a[program]': function(form){
		//if(form.target.ownerDocument.all.program[1].value === '' || form.target.ownerDocument.all.program[2].value === '' || form.target.ownerDocument.all.program[4].value === ''){
		//	throwError('Preencha os campos obrigatórios.');
		//}else{
			Meteor.call('insertProgram', form.target.ownerDocument.all.program[1].value, form.target.ownerDocument.all.program[2].value);
		//}
	}
});