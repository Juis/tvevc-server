Template.programNew.rendered = function () {
	$('select').material_select();
};

Template.programNew.events({
	'click a[program]': function(form){
		//if(form.target.ownerDocument.all.program[1].value === '' || form.target.ownerDocument.all.program[2].value === '' || form.target.ownerDocument.all.program[4].value === ''){
		//	throwError('Preencha os campos obrigatórios.');
		//}else{
			Program.insert({
				permission:DataKey(), 
				status:1, 
				user_record:1, 
				user_change:1, 
				date_record:new Date(), 
				date_change:new Date(), 
				category_id:form.target.ownerDocument.all.program[1].value, 
				name:form.target.ownerDocument.all.program[2].value
			});
		//}
	}
});